CREATE TABLE public.wheel_prizes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_key text NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  weight integer NOT NULL CHECK (weight > 0),
  stock_limit integer CHECK (stock_limit IS NULL OR stock_limit >= 0),
  awarded_count integer NOT NULL DEFAULT 0 CHECK (awarded_count >= 0),
  valid_days integer NOT NULL DEFAULT 30 CHECK (valid_days BETWEEN 1 AND 365),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (campaign_key, name)
);
GRANT ALL ON public.wheel_prizes TO service_role;
ALTER TABLE public.wheel_prizes ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.wheel_wins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  campaign_key text NOT NULL,
  prize_id uuid NOT NULL REFERENCES public.wheel_prizes(id),
  prize_name text NOT NULL,
  prize_description text NOT NULL,
  redemption_code text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'redeemed', 'expired')),
  expires_at timestamptz NOT NULL,
  redeemed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, campaign_key)
);
GRANT SELECT ON public.wheel_wins TO authenticated;
GRANT ALL ON public.wheel_wins TO service_role;
ALTER TABLE public.wheel_wins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own wheel wins"
ON public.wheel_wins FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE TABLE public.marketing_preferences (
  user_id uuid PRIMARY KEY,
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  promotions_consent boolean NOT NULL DEFAULT false,
  consented_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.marketing_preferences TO authenticated;
GRANT ALL ON public.marketing_preferences TO service_role;
ALTER TABLE public.marketing_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own marketing preference"
ON public.marketing_preferences FOR SELECT TO authenticated
USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own marketing preference"
ON public.marketing_preferences FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own marketing preference"
ON public.marketing_preferences FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own marketing preference"
ON public.marketing_preferences FOR DELETE TO authenticated
USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER wheel_prizes_set_updated_at
BEFORE UPDATE ON public.wheel_prizes
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER wheel_wins_set_updated_at
BEFORE UPDATE ON public.wheel_wins
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER marketing_preferences_set_updated_at
BEFORE UPDATE ON public.marketing_preferences
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.wheel_prizes (campaign_key, name, description, weight, stock_limit, valid_days)
VALUES
  ('krusty-2026', 'Salsa extra in regalo', 'Una salsa extra gratuita sul prossimo ordine.', 40, 500, 30),
  ('krusty-2026', '10% di sconto', 'Dieci per cento di sconto sul prossimo ordine.', 15, 150, 30),
  ('krusty-2026', 'Bibita in regalo', 'Una bibita gratuita sul prossimo ordine.', 20, 250, 30),
  ('krusty-2026', 'Patatine piccole in regalo', 'Una porzione piccola di patatine sul prossimo ordine.', 25, 300, 30);

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
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  _user_id uuid := auth.uid();
  _email text;
  _prize public.wheel_prizes%ROWTYPE;
  _existing public.wheel_wins%ROWTYPE;
  _code text;
BEGIN
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  SELECT email INTO _email FROM auth.users WHERE id = _user_id;
  IF _email IS NULL OR char_length(_email) > 255 THEN
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
    revoked_at = CASE
      WHEN NOT excluded.promotions_consent THEN now()
      ELSE NULL
    END,
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
  LIMIT 1
  FOR UPDATE;

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

  UPDATE public.wheel_prizes
  SET awarded_count = awarded_count + 1
  WHERE id = _prize.id;

  RETURN QUERY SELECT _existing.prize_name, _existing.prize_description,
    _existing.redemption_code, _existing.status, _existing.expires_at, false;
END;
$$;

REVOKE ALL ON FUNCTION public.draw_krusty_prize(boolean) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.draw_krusty_prize(boolean) TO authenticated;