CREATE POLICY "Signed-in users can view active wheel prizes"
ON public.wheel_prizes FOR SELECT TO authenticated
USING (active = true AND (stock_limit IS NULL OR awarded_count < stock_limit));

CREATE POLICY "Users can create their own wheel win"
ON public.wheel_wins FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.draw_krusty_prize(_promotions_consent boolean)
RETURNS TABLE (
  prize_name text,
  prize_description text,
  redemption_code text,
  status text,
  expires_at timestamptz,
  already_drawn boolean
)
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  _user_id uuid := auth.uid();
  _email text := auth.jwt() ->> 'email';
  _prize public.wheel_prizes%ROWTYPE;
  _existing public.wheel_wins%ROWTYPE;
  _code text;
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  IF _email IS NULL OR char_length(_email) NOT BETWEEN 3 AND 255 THEN
    RAISE EXCEPTION 'A valid account email is required';
  END IF;

  INSERT INTO public.marketing_preferences (
    user_id, email, promotions_consent, consented_at, revoked_at
  ) VALUES (
    _user_id,
    lower(_email),
    _promotions_consent,
    CASE WHEN _promotions_consent THEN now() ELSE NULL END,
    CASE WHEN _promotions_consent THEN NULL ELSE now() END
  )
  ON CONFLICT (user_id) DO UPDATE SET
    email = excluded.email,
    promotions_consent = excluded.promotions_consent,
    consented_at = CASE
      WHEN excluded.promotions_consent AND NOT marketing_preferences.promotions_consent THEN now()
      ELSE marketing_preferences.consented_at
    END,
    revoked_at = CASE WHEN NOT excluded.promotions_consent THEN now() ELSE NULL END,
    updated_at = now();

  SELECT * INTO _existing
  FROM public.wheel_wins
  WHERE user_id = _user_id AND campaign_key = 'krusty-2026';

  IF FOUND THEN
    RETURN QUERY SELECT _existing.prize_name, _existing.prize_description,
      _existing.redemption_code, _existing.status, _existing.expires_at, true;
    RETURN;
  END IF;

  SELECT * INTO _prize
  FROM public.wheel_prizes p
  WHERE p.campaign_key = 'krusty-2026'
    AND p.active
    AND (p.stock_limit IS NULL OR p.awarded_count < p.stock_limit)
  ORDER BY -ln(GREATEST(random(), 0.000001)) / p.weight
  LIMIT 1;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'No prizes are currently available';
  END IF;

  _code := 'KR-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10));

  INSERT INTO public.wheel_wins (
    user_id, email, campaign_key, prize_id, prize_name, prize_description,
    redemption_code, expires_at
  ) VALUES (
    _user_id, lower(_email), 'krusty-2026', _prize.id, _prize.name, _prize.description,
    _code, now() + make_interval(days => _prize.valid_days)
  ) RETURNING * INTO _existing;

  RETURN QUERY SELECT _existing.prize_name, _existing.prize_description,
    _existing.redemption_code, _existing.status, _existing.expires_at, false;
END;
$$;

REVOKE ALL ON FUNCTION public.draw_krusty_prize(boolean) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.draw_krusty_prize(boolean) TO authenticated;