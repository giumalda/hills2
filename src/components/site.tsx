import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import logo from "@/assets/logo.png.asset.json";
import { WHATSAPP, PHONE, allergeni } from "@/data/menu";

const navItems = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/menu", label: "Menù", icon: "🍔" },
  { to: "/crea-omero", label: "Crea l'Omero", icon: "🛠️" },
  { to: "/fidelity", label: "Fidelity", icon: "⭐" },
] as const;

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-foreground bg-primary">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo.url} alt="Logo Hill's Burger & Chips" className="h-11 w-11 rounded-md" />
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
              {item.label}
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
  const [email, setEmail] = useState("");
  const [prize, setPrize] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem("krusty-wheel") === "done") return;
    const t = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    if (typeof window !== "undefined") window.localStorage.setItem("krusty-wheel", "done");
  };

  if (!open) return null;

  const prizes = [
    "Salse extra in regalo! 🧴",
    "10% di sconto sul primo ordine! 💸",
    "Una bibita in regalo! 🥤",
    "Un giro di patatine piccole! 🍟",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-night/70 p-4">
      <div className="toon-box w-full max-w-md rounded-2xl bg-card p-6 text-center">
        <div className="bounce-slow mx-auto mb-2 text-5xl">🎡</div>
        <h2 className="toon-sm text-3xl text-primary">Ehi, ehi, ragazzi!</h2>
        <h3 className="text-xl">Gira la ruota di Krusty!</h3>
        {prize ? (
          <p className="mt-4 font-bold">
            {prize}
            <br />
            <span className="text-sm font-normal text-muted-foreground">
              Mostra questo messaggio in cassa o scrivicelo su WhatsApp.
            </span>
          </p>
        ) : (
          <>
            <p className="mt-2 text-sm text-muted-foreground">
              Inserisci la tua email per girare la ruota e vincere premi mitici: salse extra, sconti
              sul primo ordine o una bibita in regalo!
            </p>
            <form
              className="mt-4 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                setPrize(prizes[Math.floor(Math.random() * prizes.length)] ?? prizes[0]!);
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Inserisci la tua email"
                className="w-full rounded-lg border-[3px] border-foreground px-3 py-2"
              />
              <button
                type="submit"
                className="toon-btn w-full rounded-lg bg-accent px-4 py-3 font-display text-2xl text-accent-foreground"
              >
                Gira la ruota!
              </button>
            </form>
          </>
        )}
        <button onClick={close} className="mt-4 text-xs underline text-muted-foreground">
          {prize ? "Chiudi, ho fame!" : "No grazie, ho già fame e non voglio regali"}
        </button>
      </div>
    </div>
  );
}

export function SiteFooter() {
  const [openAllergeni, setOpenAllergeni] = useState(false);
  const [doh, setDoh] = useState(false);

  return (
    <footer className="mt-16 border-t-[3px] border-foreground bg-night pb-24 text-white md:pb-10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="toon-sm text-3xl text-primary">Hill's Burger & Chips by Antonio e Pina</h2>
        <p className="mt-2 text-sm text-white/80">
          Piazza Trieste, 35 — 74017 Mottola (TA)
          <br />
          Telefono e WhatsApp:{" "}
          <a className="underline" href={WHATSAPP} target="_blank" rel="noreferrer">
            {PHONE}
          </a>
        </p>

        <div className="mt-8 rounded-xl border-2 border-white/25 p-4">
          <button
            onClick={() => setOpenAllergeni((v) => !v)}
            className="flex w-full items-center justify-between text-left font-bold"
            aria-expanded={openAllergeni}
          >
            Informativa Allergeni (Reg. UE n. 1169/2011)
            <span>{openAllergeni ? "−" : "+"}</span>
          </button>
          {openAllergeni && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-white/80">
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

        <div className="mt-8 flex items-center gap-3 text-xs text-white/60">
          <button onClick={() => setDoh(true)} aria-label="Logo Hill's">
            <img src={logo.url} alt="Logo Hill's Burger & Chips" className="h-9 w-9 rounded" />
          </button>
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
