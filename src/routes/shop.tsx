import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { products, categories, sizes } from "@/lib/area-data";
import { useCart, parsePrice } from "@/lib/cart";
import shopHero from "@/assets/shop-hero-new.png.asset.json";

const TITLE = "ÁREA Clothing Shop — Apparel, Wetsuits & Accessories";
const DESC = "Shop the ÁREA line from Anza, Agadir: tees, hoodies and boardshorts, wetsuits and everyday accessories made for surfers.";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: shopHero.url },
      { name: "twitter:image", content: shopHero.url },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const [sel, setSel] = useState<Record<string, string>>({});
  const { add, setOpen: setCartOpen } = useCart();

  const visible = useMemo(
    () => (active === "All" ? products : products.filter((p) => p.category === active)),
    [active],
  );

  return (
    <main className="bg-background text-ink">
      <SiteHeader transparentAtTop />

      {/* HERO */}
      <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden bg-[#050914]">
        <img src={shopHero.url} alt="ÁREA typographic surf hero" className="absolute inset-0 h-full w-full object-cover object-center opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050914]/40 via-transparent to-[#050914]" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-20 md:px-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-accent">Made in Anza · Worn in the water</p>
          <h1 className="mt-3 font-display text-6xl font-bold text-white md:text-8xl">SHOP</h1>
          <p className="mt-4 max-w-lg text-sm text-white/85 md:text-base">
            Our own clothing line — screen-printed locally, tested on the beach every day. Apparel, wetsuits and the small things you always forget.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 md:px-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">The collection</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={`rounded-full px-5 py-2.5 text-xs font-bold tracking-widest transition ${
                  active === c ? "bg-ocean-deep text-white" : "bg-white text-ocean-deep hover:bg-ocean-deep/10"
                }`}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <article key={p.slug} className="group overflow-hidden rounded-xl border border-ocean-deep/10 bg-white shadow-sm">
              <Link to="/shop/$productId" params={{ productId: p.slug }} className="block overflow-hidden">
                <img src={p.img} alt={p.name} loading="lazy" className="h-64 w-full object-cover transition-transform group-hover:scale-105" />
              </Link>
              <div className="p-6">
                <p className="text-[10px] font-bold tracking-[0.25em] text-accent">{p.category.toUpperCase()}</p>
                <div className="mt-2 flex items-baseline justify-between gap-3">
                  <Link to="/shop/$productId" params={{ productId: p.slug }} className="font-display text-base font-bold text-ink hover:underline">
                    {p.name}
                  </Link>
                  <p className="text-sm font-bold text-ink">{p.price}</p>
                </div>
                {p.sized && (
                  <label className="mt-4 block">
                    <span className="text-[11px] font-bold tracking-widest text-muted">Size</span>
                    <select
                      value={sel[p.slug] ?? "M"}
                      onChange={(e) => setSel({ ...sel, [p.slug]: e.target.value })}
                      className="mt-2 w-full border-b border-ocean-deep/30 bg-transparent pb-2 text-sm outline-none focus:border-accent"
                    >
                      {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const size = p.sized ? (sel[p.slug] ?? "M") : undefined;
                    add({ slug: p.slug, name: p.name, img: p.img, price: parsePrice(p.price), size });
                    toast.success(`${p.name}${size ? ` (${size})` : ""} added to bag`);
                    setCartOpen(true);
                  }}

                  className="mt-6 w-full rounded-full bg-ocean-deep py-3 text-xs font-bold tracking-widest text-accent hover:bg-accent hover:text-ocean-deep"
                >
                  ADD TO BAG
                </button>
              </div>
            </article>
          ))}
        </div>
        {visible.length === 0 && <p className="mt-16 text-center text-sm text-muted">No products in this category yet.</p>}
      </section>

      <SiteFooter />
    </main>
  );
}
