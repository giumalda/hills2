import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageShell } from "@/components/site";
import { WHATSAPP } from "@/data/menu";

export const Route = createFileRoute("/fidelity")({
  head: () => ({
    meta: [
      { title: "Fidelity: Spilla del Commissario Winchester | Hill's Burger" },
      {
        name: "description",
        content:
          "Entra nel corpo di polizia di Springfield: accumula punti a ogni morso e ricevi un donut in regalo ogni 5 panini da Hill's Burger & Chips a Mottola.",
      },
      { property: "og:title", content: "Fidelity: Spilla del Commissario Winchester" },
      {
        property: "og:description",
        content: "Un donut in regalo ogni 5 panini: il programma fedeltà di Hill's Burger & Chips.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Fidelity,
});

function Fidelity() {
  const [nome, setNome] = useState("");
  const [inviato, setInviato] = useState(false);

  return (
    <PageShell>
      <section className="bg-night py-12 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="bounce-slow text-6xl">🥇</div>
          <h1 className="mt-4 font-display text-4xl text-primary toon-sm sm:text-6xl">
            Spilla del Commissario Winchester
          </h1>
          <p className="mt-4 font-semibold">
            Entra nel corpo di polizia di Springfield. Accumula punti a ogni morso e sblocca sconti
            esclusivi: un donut in regalo ogni 5 panini!
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { n: "1", t: "Richiedi il distintivo", d: "Lascia il tuo nome: ti registriamo in cassa." },
            { n: "2", t: "Timbra a ogni panino", d: "Ogni morso vale un punto sulla tua spilla." },
            { n: "3", t: "Ritira il premio", d: "Ogni 5 panini un donut in regalo. D'oh sì!" },
          ].map((s) => (
            <div key={s.n} className="toon-box rounded-2xl bg-card p-5">
              <p className="font-display text-4xl text-accent">{s.n}</p>
              <h2 className="text-xl">{s.t}</h2>
              <p className="mt-1 text-sm">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="toon-box mt-8 rounded-2xl bg-primary p-6">
          <h2 className="text-3xl">Richiedi il distintivo</h2>
          {inviato ? (
            <p className="mt-3 font-semibold">
              Perfetto {nome}! Mostra questa schermata in cassa oppure scrivici su WhatsApp per
              attivare la tua spilla.
            </p>
          ) : (
            <form
              className="mt-4 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setInviato(true);
              }}
            >
              <input
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Il tuo nome da agente"
                className="flex-1 rounded-lg border-[3px] border-foreground px-3 py-2"
              />
              <button
                type="submit"
                className="toon-btn rounded-lg bg-accent px-5 py-2 font-display text-xl text-accent-foreground"
              >
                Arruolami!
              </button>
            </form>
          )}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm font-bold underline"
          >
            Oppure scrivici su WhatsApp
          </a>
        </div>
      </div>
    </PageShell>
  );
}
