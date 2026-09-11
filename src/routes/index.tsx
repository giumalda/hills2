import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { KrustyPopup, PageShell } from "@/components/site";
import burgerBig from "@/assets/burger-big.png.asset.json";
import antonio from "@/assets/antonio.png.asset.json";
import burgerBattle from "@/assets/burger-battle.png.asset.json";
import { reviews, WHATSAPP, PHONE } from "@/data/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hill's Burger & Chips by Antonio — Mottola (TA)" },
      {
        name: "description",
        content:
          "Hamburgheria a tema Simpson a Mottola (TA): oltre 40 panini, fritti, birre e il panino sfida Big Simpson. Prenota su WhatsApp 333 296 8401.",
      },
      { property: "og:title", content: "Hill's Burger & Chips by Antonio — Mottola (TA)" },
      {
        property: "og:description",
        content:
          "Il vero gusto che fa sbavare Homer: oltre 40 panini, fritti e birre a Mottola. Prenotazione obbligatoria.",
      },
    ],
  }),
  component: Home,
});

function Chalkboard() {
  const line = "Non metterò il ketchup nel panino gourmet. Non chiederò una birra analcolica da Boe. ";
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setN((v) => (v + 1) % (line.length * 2)), 70);
    return () => window.clearInterval(id);
  }, []);
  const text = (line + line).slice(0, n);
  return (
    <div className="toon-box mx-auto max-w-xl rounded-lg bg-chalk p-5">
      <p className="min-h-20 text-left font-display text-xl leading-snug text-white/90">
        {text}
        <span className="opacity-60">|</span>
      </p>
    </div>
  );
}

const infoBase = [
  { icon: "📍", label: "Dove siamo", value: "Piazza Trieste, 35, 74017 Mottola (TA)" },
  { icon: "⏰", label: "Orari", value: "Lunedì e dal Mercoledì alla Domenica 19:00–00:00 (Martedì chiuso)" },
  { icon: "💸", label: "Fascia di prezzo", value: "10–20 € a persona" },
  { icon: "⚠️", label: "Attenzione", value: "Prenotazione obbligatoria!" },
  { icon: "📞", label: "Contatti", value: `Telefono e WhatsApp: ${PHONE}` },
];

const servizi = [
  "Consumazione sul posto, asporto e servizio al tavolo",
  "Tavoli all'aperto e ampia sala interna",
  "Toilette disponibile",
  "Vasta selezione di birre, alcolici, superalcolici, vino, caffè; assaggi e pasti serviti fino a tarda sera",
  "Locale adatto ai bambini: menu dedicati, seggioloni, ideale per feste di compleanno",
  "Accessibilità: tavoli accessibili in sedia a rotelle",
  "Animali ammessi: cani benvenuti!",
  "Parcheggio gratuito e comodo in strada",
  "Pagamenti: American Express, Diners Club, Discover, JCB, MasterCard, VISA, carte di debito, NFC",
];

function Home() {
  const [slide, setSlide] = useState(0);

  return (
    <PageShell>
      <KrustyPopup />

      {/* HERO */}
      <section className="relative overflow-hidden bg-sky">
        <div className="clouds pointer-events-none absolute inset-0 opacity-90" />
        <div className="relative mx-auto max-w-5xl px-4 py-14 text-center">
          <p className="font-display text-3xl text-primary toon sm:text-5xl">
            Hill's Burger & Chips by Antonio
          </p>
          <div className="mt-8">
            <Chalkboard />
          </div>
          <h1 className="mt-8 font-display text-4xl leading-tight sm:text-6xl">
            Mitico! Il vero gusto che fa sbavare Homer.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-semibold">
            Da Antonio e Pina, la migliore Hamburgheria, Fast Food e Paninoteca. Preparati a
            un'esperienza spaziale!
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/menu"
              className="toon-btn rounded-full bg-primary px-6 py-3 font-display text-2xl"
            >
              🍔 Sfoglia il Menù
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="toon-btn rounded-full bg-accent px-6 py-3 font-display text-2xl text-accent-foreground"
            >
              🛵 Ordina Asporto/Delivery
            </a>
          </div>
          <img
            src={burgerBig.url}
            alt="Panino gigante Hill's servito al tavolo"
            className="toon-box mx-auto mt-10 w-full max-w-xl rounded-2xl object-cover"
          />
        </div>
      </section>

      {/* INFO E SERVIZI */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-4xl">Tutto quello che devi sapere</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="toon-box rounded-2xl bg-card p-6">
            <h3 className="text-2xl">Info base</h3>
            <ul className="mt-4 space-y-3">
              {infoBase.map((i) => (
                <li key={i.label} className="flex gap-3">
                  <span className="text-xl">{i.icon}</span>
                  <span>
                    <strong>{i.label}:</strong> {i.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="toon-box rounded-2xl bg-primary p-6">
            <h3 className="text-2xl">Servizi e comodità</h3>
            <ul className="mt-4 space-y-2 text-sm font-semibold">
              {servizi.map((s) => (
                <li key={s} className="flex gap-2">
                  <span>✔️</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BANNER INTERATTIVI */}
      <section className="mx-auto max-w-6xl space-y-6 px-4 pb-14">
        <div className="toon-box grid items-center gap-6 rounded-2xl bg-accent p-6 text-accent-foreground md:grid-cols-[1fr_auto]">
          <div>
            <h3 className="text-3xl">Crea l'Omero!</h3>
            <p className="mt-2 font-semibold">
              Scegli il pane, la carne, le salse e costruisci la tua torre di puro sapore. Assembla
              gli ingredienti e, se superi il livello "Espansione Cintura", sblocchi il badge segreto
              "La Costina"!
            </p>
          </div>
          <Link
            to="/crea-omero"
            className="toon-btn rounded-full bg-primary px-6 py-3 font-display text-2xl text-primary-foreground"
          >
            Inizia a Costruire
          </Link>
        </div>

        <div className="toon-box grid items-center gap-6 rounded-2xl bg-night p-6 text-white md:grid-cols-[auto_1fr]">
          <span className="text-6xl">☎️</span>
          <div>
            <h3 className="text-3xl text-primary">Scontrini e scherzi da Boe</h3>
            <p className="mt-2 font-semibold">
              Fai uno scherzo a Boe! Nelle note dell'ordine inserisci un nome per la chiamata da fare
              al bancone (es. "Signorino Cioè"). Al ritiro, lo chiameremo a voce alta per far ridere
              tutta la sala!
            </p>
          </div>
        </div>

        <div className="toon-box grid items-center gap-6 rounded-2xl bg-primary p-6 md:grid-cols-[1fr_auto]">
          <div>
            <h3 className="text-3xl">Spilla del Commissario Winchester</h3>
            <p className="mt-2 font-semibold">
              Programma fedeltà: entra nel corpo di polizia di Springfield. Accumula punti a ogni
              morso e sblocca sconti esclusivi — un donut in regalo ogni 5 panini!
            </p>
          </div>
          <Link
            to="/fidelity"
            className="toon-btn rounded-full bg-accent px-6 py-3 font-display text-2xl text-accent-foreground"
          >
            Richiedi il Distintivo
          </Link>
        </div>
      </section>

      {/* GALLERIA + SFIDA */}
      <section className="bg-night py-14">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          <img
            src={antonio.url}
            alt="Antonio, titolare di Hill's Burger & Chips, con un hamburger"
            className="toon-box h-full w-full rounded-2xl object-cover"
          />
          <div className="text-white">
            <h2 className="text-4xl text-primary">Big Simpson: la sfida</h2>
            <p className="mt-3 font-semibold">
              3 burger di bovino, porchetta di ariccia, bombette, maxi uccelletto, cheddar, bacon,
              insalata, pomodoro e contorno di patatine. Se lo mangi in 20 minuti non lo paghi!
            </p>
            <img
              src={burgerBattle.url}
              alt="Panino Hill's del Burger Battle su sfondo giallo"
              className="toon-box mt-5 w-full max-w-xs rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* RECENSIONI */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-center text-4xl">Cosa dicono i cittadini di Springfield</h2>
        <p className="mt-2 text-center font-bold">
          ⭐️⭐️⭐️⭐️⭐️ 4,6 / 5 — basato su 493 recensioni Google
        </p>
        <div className="toon-box mx-auto mt-8 max-w-2xl rounded-2xl bg-card p-6">
          <p className="text-lg">"{reviews[slide].text}"</p>
          <p className="mt-4 font-display text-2xl">
            {reviews[slide].name} — {"⭐".repeat(reviews[slide].stars)}
          </p>
          <div className="mt-5 flex justify-between gap-3">
            <button
              onClick={() => setSlide((s) => (s - 1 + reviews.length) % reviews.length)}
              className="toon-btn rounded-full bg-primary px-4 py-2 font-display text-xl"
            >
              ← Indietro
            </button>
            <button
              onClick={() => setSlide((s) => (s + 1) % reviews.length)}
              className="toon-btn rounded-full bg-primary px-4 py-2 font-display text-xl"
            >
              Avanti →
            </button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
