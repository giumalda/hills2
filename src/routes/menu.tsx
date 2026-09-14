import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site";
import { menu } from "@/data/menu";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menù completo — Hill's Burger & Chips Mottola" },
      {
        name: "description",
        content:
          "Oltre 40 panini a tema Simpson, special burger, piatti di carne, piadine, insalate, fritture e patatine. Prezzi aggiornati di Hill's Burger & Chips a Mottola.",
      },
      { property: "og:title", content: "Menù completo — Hill's Burger & Chips Mottola" },
      {
        property: "og:description",
        content: "Panini, special burger, fritti e patatine: tutto il menù di Hill's Burger & Chips.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <PageShell>
      <section className="bg-sky py-10">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="font-display text-4xl toon text-primary sm:text-6xl">Il Menù Completo</h1>
          <p className="mt-4 font-semibold">
            Panini gourmet, croccante pollo in stile K giapponese e una selezione di birre per ogni gusto, inclusa l'analcolica della Taverna di Boe.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4">
        <div className="toon-box mt-8 rounded-2xl bg-primary p-5">
          <h2 className="text-2xl">⚠️ Note del locale</h2>
          <ul className="mt-3 space-y-1 text-sm font-semibold">
            <li>Coperto: € 2,00</li>
            <li>I prodotti contrassegnati con ❄️ (*) sono surgelati a temperatura −20°.</li>
            <li>Aggiunte e varianti vengono calcolate a parte.</li>
            <li>Piatti vegetariani disponibili (cerca l'etichetta "Vegetariano").</li>
          </ul>
        </div>

        <nav className="mt-6 flex flex-wrap gap-2">
          {menu.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="toon-btn rounded-full bg-card px-3 py-1.5 text-sm font-bold"
            >
              {s.emoji} {s.title}
            </a>
          ))}
        </nav>

        {menu.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24 pt-10">
            <h2 className="text-3xl">
              {section.emoji} {section.title}
            </h2>
            {section.note && (
              <p className="text-base font-semibold text-foreground/80">{section.note}</p>
            )}
            <ul className="mt-4 space-y-3">
              {section.items.map((item) => (
                <li
                  key={item.name}
                   className={`toon-box rounded-lg p-4 sm:p-5 ${
                    item.challenge ? "bg-accent text-accent-foreground" : "bg-card"
                  }`}
                >
                   <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl leading-tight">
                      {item.name}
                      {item.frozen && (
                        <span title="Surgelato a −20°" className="ml-2 text-base">
                          ❄️
                        </span>
                      )}
                      {item.veg && (
                        <span className="ml-2 rounded-full bg-chalk px-2 py-0.5 align-middle font-sans text-[10px] font-bold text-white">
                          Vegetariano
                        </span>
                      )}
                    </h3>
                    <span className="shrink-0 font-display text-xl">€ {item.price}</span>
                  </div>
                   {item.desc && <p className="mt-2 text-[0.95rem] leading-relaxed text-foreground/85">{item.desc}</p>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
