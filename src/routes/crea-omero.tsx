import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageShell } from "@/components/site";
import { WHATSAPP } from "@/data/menu";

export const Route = createFileRoute("/crea-omero")({
  head: () => ({
    meta: [
      { title: "Crea l'Omero — costruisci il tuo panino | Hill's Burger" },
      {
        name: "description",
        content:
          "Scegli pane, carne, formaggi, extra e salse e costruisci la tua torre di sapore. Supera il livello Espansione Cintura e sblocca il badge La Costina.",
      },
      { property: "og:title", content: "Crea l'Omero — costruisci il tuo panino" },
      {
        property: "og:description",
        content: "Il costruttore di panini di Hill's Burger & Chips a Mottola.",
      },
    ],
  }),
  component: CreaOmero,
});

type Step = { key: string; title: string; multi?: boolean; options: { name: string; kcal: number }[] };

const steps: Step[] = [
  {
    key: "pane",
    title: "1. Il pane",
    options: [
      { name: "Bun classico", kcal: 200 },
      { name: "Bun al sesamo", kcal: 230 },
      { name: "Bun nero al carbone", kcal: 240 },
      { name: "Piadina", kcal: 260 },
    ],
  },
  {
    key: "carne",
    title: "2. La carne",
    options: [
      { name: "Burger di bovino 100gr", kcal: 250 },
      { name: "Burger di scottona 200gr", kcal: 450 },
      { name: "Burger di angus 200gr", kcal: 470 },
      { name: "Pulled pork", kcal: 380 },
      { name: "Burger di verdure (vegetariano)", kcal: 180 },
    ],
  },
  {
    key: "formaggi",
    title: "3. Formaggi",
    multi: true,
    options: [
      { name: "Cheddar fuso", kcal: 120 },
      { name: "Provola affumicata", kcal: 140 },
      { name: "Mozzarella di bufala", kcal: 150 },
      { name: "Gorgonzola", kcal: 160 },
      { name: "Grana a scaglie", kcal: 110 },
    ],
  },
  {
    key: "extra",
    title: "4. Gli extra",
    multi: true,
    options: [
      { name: "Bacon croccante", kcal: 180 },
      { name: "Uovo occhio di bue", kcal: 90 },
      { name: "Cipolla caramellata", kcal: 70 },
      { name: "Patatine dentro al panino", kcal: 250 },
      { name: "Cavolo rosso", kcal: 30 },
      { name: "Melanzane grigliate", kcal: 60 },
    ],
  },
  {
    key: "salse",
    title: "5. Le salse",
    multi: true,
    options: [
      { name: "Salsa hill's", kcal: 90 },
      { name: "BBQ", kcal: 80 },
      { name: "Maionese", kcal: 100 },
      { name: "N'duja di Spilinga", kcal: 110 },
      { name: "Crema di pistacchio", kcal: 130 },
    ],
  },
];

function level(kcal: number) {
  if (kcal < 600) return { name: "Dieta di Marge", emoji: "🥗" };
  if (kcal < 1000) return { name: "Merenda di Bart", emoji: "🛹" };
  if (kcal < 1400) return { name: "Doppio turno alla Centrale", emoji: "☢️" };
  if (kcal < 1800) return { name: "Espansione Cintura", emoji: "🍩" };
  return { name: "La Costina — badge segreto sbloccato!", emoji: "🏅" };
}

function CreaOmero() {
  const [sel, setSel] = useState<Record<string, string[]>>({});

  const toggle = (step: Step, name: string) => {
    setSel((prev) => {
      const cur = prev[step.key] ?? [];
      if (!step.multi) return { ...prev, [step.key]: cur[0] === name ? [] : [name] };
      return {
        ...prev,
        [step.key]: cur.includes(name) ? cur.filter((n) => n !== name) : [...cur, name],
      };
    });
  };

  const chosen = steps.flatMap((s) =>
    (sel[s.key] ?? []).flatMap((n) => { const o = s.options.find((x) => x.name === n); return o ? [o] : []; }),
  );
  const kcal = chosen.reduce((sum, o) => sum + o.kcal, 0);
  const lv = level(kcal);
  const testo = steps
    .map((s) => (sel[s.key]?.length ? `${s.title.replace(/^\d+\.\s/, "")}: ${(sel[s.key] ?? []).join(", ")}` : null))
    .filter(Boolean)
    .join(" | ");

  return (
    <PageShell>
      <section className="bg-accent py-10 text-accent-foreground">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="font-display text-4xl toon-sm sm:text-6xl">Crea l'Omero</h1>
          <p className="mt-3 font-semibold">
            Scegli il pane, la carne, le salse e costruisci la tua torre di puro sapore.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-10 md:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.key} className="toon-box rounded-2xl bg-card p-5">
              <h2 className="text-2xl">{step.title}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {step.options.map((o) => {
                  const active = (sel[step.key] ?? []).includes(o.name);
                  return (
                    <button
                      key={o.name}
                      onClick={() => toggle(step, o.name)}
                      className={`toon-btn rounded-full px-3 py-2 text-sm font-bold ${
                        active ? "bg-accent text-accent-foreground" : "bg-secondary"
                      }`}
                    >
                      {o.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <aside className="toon-box h-fit rounded-2xl bg-primary p-5 md:sticky md:top-24">
          <h2 className="text-2xl">Il tuo panino</h2>
          <p className="mt-2 text-sm font-semibold">
            {chosen.length ? testo : "Ancora niente… Homer sta piangendo."}
          </p>
          <p className="mt-4 font-display text-3xl">{kcal} kcal circa</p>
          <p className="font-bold">
            Livello: {lv.emoji} {lv.name}
          </p>
          <a
            href={`${WHATSAPP}?text=${encodeURIComponent(`Ciao Hill's! Voglio il mio Omero: ${testo || "(da definire)"}`)}`}
            target="_blank"
            rel="noreferrer"
            className="toon-btn mt-5 block rounded-full bg-accent px-4 py-3 text-center font-display text-xl text-accent-foreground"
          >
            Ordinalo su WhatsApp
          </a>
        </aside>
      </div>
    </PageShell>
  );
}
