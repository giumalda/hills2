import { Link } from "@tanstack/react-router";
import { Gift, LogIn, LogOut, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import logo from "@/assets/logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { WHATSAPP, PHONE, allergeni } from "@/data/menu";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

const ALT_LOGO = "Logo verde e bianco Hill’s Burger & Chips a forma di panino con un morso.";

const navItems = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/menu", label: "Menù", icon: "🍔" },
  { to: "/crea-omero", label: "Crea il tuo hamburger", mobileLabel: "Crea", icon: "🛠️" },
  { to: "/fidelity", label: "Fidelity", icon: "⭐" },
] as const;

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-foreground bg-primary">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo.url} alt={ALT_LOGO} className="h-11 w-11 rounded-md" />
          <span className="font-display text-lg leading-none sm:text-2xl">
            Hill's Burger & Chips
          </span>
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="rounded-lg px-3 py-2 font-display text-xl transition-colors hover:bg-accent hover:text-accent-foreground"
                activeProps={{ className: "bg-night text-primary" }}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export function TabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-foreground bg-primary md:hidden">
      <ul className="grid grid-cols-4">
        {navItems.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="flex flex-col items-center gap-0.5 py-2 text-[11px] font-bold"
              activeProps={{ className: "bg-night text-primary" }}
            >
              <span className="text-lg">{item.icon}</span>
               {"mobileLabel" in item ? item.mobileLabel : item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      className="toon-btn fixed right-4 bottom-20 z-40 flex items-center gap-2 rounded-full bg-accent px-4 py-3 font-display text-lg text-accent-foreground md:bottom-6"
    >
      <span className="text-xl">📞</span>
      <span className="hidden sm:inline">Prenota ora</span>
      <span className="sm:hidden">WhatsApp</span>
    </a>
  );
}

export function KrustyPopup() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [prize, setPrize] = useState<{
    prize_name: string;
    prize_description: string;
    redemption_code: string;
    status: string;
    expires_at: string;
  } | null>(null);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUser(data.user ?? null);
      setEmail(data.user?.email ?? "");
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setEmail(session?.user.email ?? "");
    });
    const t = window.setTimeout(() => setOpen(true), 1200);
    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setPrize(null);
      setConsent(false);
      return;
    }
    Promise.all([
      supabase
        .from("wheel_wins")
        .select("prize_name, prize_description, redemption_code, status, expires_at")
        .eq("campaign_key", "krusty-2026")
        .maybeSingle(),
      supabase
        .from("marketing_preferences")
        .select("promotions_consent")
        .maybeSingle(),
    ]).then(([winResult, preferenceResult]) => {
      setPrize(winResult.data);
      setConsent(preferenceResult.data?.promotions_consent ?? false);
    });
  }, [user]);

  const close = () => setOpen(false);

  const handleEmailAuth = async () => {
    setLoading(true);
    setMessage(null);
    const cleanEmail = email.trim().toLowerCase();
    const result = authMode === "signup"
      ? await supabase.auth.signUp({ email: cleanEmail, password })
      : await supabase.auth.signInWithPassword({ email: cleanEmail, password });
    setLoading(false);
    if (result.error) {
      setMessage(result.error.message);
      return;
    }
    if (authMode === "signup" && !result.data.session) {
      setMessage("Controlla la tua email e conferma l’account, poi torna qui per girare la ruota.");
      return;
    }
    setUser(result.data.user);
    setMessage("Accesso effettuato. Ora puoi girare la ruota!");
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setMessage(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
      extraParams: { prompt: "select_account" },
    });
    if (result.error) {
      setMessage(result.error.message);
      setLoading(false);
      return;
    }
    if (!result.redirected) {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null);
      setLoading(false);
    }
  };

  const drawPrize = async () => {
    setLoading(true);
    setMessage(null);
    const { data, error } = await supabase.rpc("draw_krusty_prize", {
      _promotions_consent: consent,
    });
    setLoading(false);
    if (error) {
      setMessage(error.message);
      return;
    }
    const win = data?.[0];
    if (!win) {
      setMessage("La ruota non ha restituito un premio. Riprova tra poco.");
      return;
    }
    setPrize(win);
    setMessage(win.already_drawn ? "Ecco il premio già associato al tuo account." : "D’oh sì! Premio assegnato e salvato.");
  };

  const saveConsent = async () => {
    if (!user?.email) return;
    setLoading(true);
    setMessage(null);
    const now = new Date().toISOString();
    const { error } = await supabase.from("marketing_preferences").upsert({
      user_id: user.id,
      email: user.email.toLowerCase(),
      promotions_consent: consent,
      consented_at: consent ? now : null,
      revoked_at: consent ? null : now,
    });
    setLoading(false);
    setMessage(error ? error.message : consent ? "Consenso promozionale salvato." : "Consenso promozionale revocato.");
  };

  if (!open) {
    return (
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="toon-btn fixed right-4 bottom-36 z-40 h-12 rounded-full bg-primary px-4 font-display text-lg text-primary-foreground md:bottom-20"
      >
        <Gift aria-hidden="true" /> Il mio premio
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-night/70 p-4" role="dialog" aria-modal="true" aria-labelledby="krusty-title">
      <div className="toon-box relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-lg bg-card p-6 text-center">
        <Button type="button" variant="ghost" size="icon" onClick={close} className="absolute right-2 top-2 z-10" aria-label="Chiudi">
          <X aria-hidden="true" />
        </Button>
        <div className="bounce-slow pointer-events-none mx-auto mb-2 text-5xl">🎡</div>
        <h2 className="toon-sm text-3xl text-primary">Ehi, ehi, ragazzi!</h2>
        <h3 id="krusty-title" className="text-xl">Gira la ruota di Krusty!</h3>
        {prize ? (
          <div className="mt-4">
            <p className="font-display text-3xl text-accent">{prize.prize_name}</p>
            <p className="mt-2 text-sm font-semibold">{prize.prize_description}</p>
            <div className="mt-4 rounded-md border-2 border-dashed border-foreground bg-primary p-3">
              <span className="text-xs font-bold uppercase">Codice premio</span>
              <p className="font-display text-3xl">{prize.redemption_code}</p>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Valido fino al {new Intl.DateTimeFormat("it-IT", { dateStyle: "long" }).format(new Date(prize.expires_at))}. Mostra il codice in cassa.
            </p>
            <label className="mt-4 flex items-start gap-3 rounded-md border border-border p-3 text-left text-sm" htmlFor="saved-krusty-consent">
              <Checkbox id="saved-krusty-consent" checked={consent} onCheckedChange={(checked) => setConsent(checked === true)} className="mt-0.5" />
              <span>Desidero ricevere via email promozioni e novità di Hill’s.</span>
            </label>
            <Button type="button" variant="outline" disabled={loading} onClick={() => void saveConsent()} className="mt-3 w-full">
              Salva preferenza email
            </Button>
          </div>
        ) : !user ? (
          <div className="mt-4 text-left">
            <p className="text-center text-sm text-muted-foreground">
              Crea un account per ricevere un premio vero e ritrovarlo anche da un altro dispositivo.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 rounded-md bg-muted p-1">
              <Button type="button" variant={authMode === "signup" ? "default" : "ghost"} onClick={() => setAuthMode("signup")}>Registrati</Button>
              <Button type="button" variant={authMode === "signin" ? "default" : "ghost"} onClick={() => setAuthMode("signin")}>Accedi</Button>
            </div>
            <form className="mt-4 space-y-3" onSubmit={(event) => { event.preventDefault(); void handleEmailAuth(); }}>
              <label className="block text-sm font-bold" htmlFor="krusty-email">Email</label>
              <Input id="krusty-email" type="email" required maxLength={255} autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              <label className="block text-sm font-bold" htmlFor="krusty-password">Password</label>
              <Input id="krusty-password" type="password" required minLength={8} maxLength={72} autoComplete={authMode === "signup" ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} />
              <Button type="submit" disabled={loading} className="toon-btn h-12 w-full bg-accent font-display text-xl text-accent-foreground">
                <LogIn aria-hidden="true" /> {loading ? "Un momento…" : authMode === "signup" ? "Crea account" : "Accedi"}
              </Button>
            </form>
            <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />oppure<span className="h-px flex-1 bg-border" /></div>
            <Button type="button" variant="outline" disabled={loading} onClick={() => void handleGoogleAuth()} className="h-11 w-full font-bold">Continua con Google</Button>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Account: <strong>{user.email}</strong></p>
            <label className="mt-4 flex items-start gap-3 rounded-md border border-border p-3 text-left text-sm" htmlFor="krusty-consent">
              <Checkbox id="krusty-consent" checked={consent} onCheckedChange={(checked) => setConsent(checked === true)} className="mt-0.5" />
              <span>Acconsento a ricevere via email promozioni e novità di Hill’s. Il consenso è facoltativo e revocabile.</span>
            </label>
            <Button type="button" disabled={loading} onClick={() => void drawPrize()} className="toon-btn mt-4 h-12 w-full bg-accent font-display text-2xl text-accent-foreground">
              {loading ? "La ruota gira…" : "Gira la ruota!"}
            </Button>
          </div>
        )}
        {message && <p className="mt-4 text-sm font-semibold" role="status">{message}</p>}
        {user && (
          <Button type="button" variant="ghost" onClick={() => void supabase.auth.signOut()} className="mt-3 text-xs text-muted-foreground">
            <LogOut aria-hidden="true" /> Esci dall’account
          </Button>
        )}
      </div>
    </div>
  );
}

export function SiteFooter() {
  const [openAllergeni, setOpenAllergeni] = useState(false);
  const [doh, setDoh] = useState(false);

  return (
    <footer className="mt-16 border-t-[3px] border-foreground bg-night pb-24 text-primary-foreground md:pb-10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="toon-sm text-3xl text-primary">Hill's Burger & Chips by Antonio e Pina</h2>
        <p className="mt-2 text-sm text-primary-foreground/90">
          Piazza Trieste, 35 — 74017 Mottola (TA)
          <br />
          Telefono e WhatsApp:{" "}
          <a className="underline" href={WHATSAPP} target="_blank" rel="noreferrer">
            {PHONE}
          </a>
        </p>

        <div className="mt-8 rounded-lg border-2 border-primary-foreground/40 p-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setOpenAllergeni((v) => !v)}
            className="flex w-full items-center justify-between text-left font-bold"
            aria-expanded={openAllergeni}
          >
            Informativa Allergeni (Reg. UE n. 1169/2011)
            <span>{openAllergeni ? "−" : "+"}</span>
          </Button>
          {openAllergeni && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-primary-foreground/90">
              {allergeni.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
          <a
            className="underline"
            href="https://www.instagram.com/hill_s_burger"
            target="_blank"
            rel="noreferrer"
          >
            Seguici su Instagram @hill_s_burger
          </a>
          <a className="underline" href="https://www.facebook.com" target="_blank" rel="noreferrer">
            e su Facebook!
          </a>
        </div>

        <div className="mt-8 flex items-center gap-3 text-xs text-primary-foreground/75">
           <Button type="button" variant="ghost" size="icon" onClick={() => setDoh(true)} aria-label="Fai dire D'oh al logo Hill's">
             <img src={logo.url} alt={ALT_LOGO} className="h-9 w-9 rounded" />
           </Button>
          <p>
            {doh ? "D'oh! " : ""}Design e grafica puramente ispirati e a scopo di parodia. Nessuna
            affiliazione con i detentori dei diritti.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
      <WhatsAppFab />
      <TabBar />
    </>
  );
}
