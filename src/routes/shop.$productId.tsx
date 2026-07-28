import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { products, sizes } from "@/lib/area-data";
import { useCart, parsePrice } from "@/lib/cart";

export const Route = createFileRoute("/shop/$productId")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} — ÁREA Shop` : "Product — ÁREA Shop";
    const desc = p?.desc ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(p ? [{ property: "og:image", content: p.img }, { name: "twitter:image", content: p.img }] : []),
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <main className="bg-background text-ink">
      <SiteHeader transparentAtTop={false} />
      <div className="mx-auto max-w-3xl px-6 py-40 text-center">
        <h1 className="font-display text-4xl font-bold">Product not found</h1>
        <Link to="/shop" className="mt-6 inline-block text-accent underline">Back to shop</Link>
      </div>
      <SiteFooter />
    </main>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const { add, setOpen } = useCart();
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);

  const addToBag = () => {
    add(
      {
        slug: product.slug,
        name: product.name,
        img: product.img,
        price: parsePrice(product.price),
        size: product.sized ? size : undefined,
      },
      qty,
    );
    toast.success(`${qty} × ${product.name}${product.sized ? ` (${size})` : ""} added to bag`);
    setOpen(true);
  };


  return (
    <main className="bg-background text-ink">
      <SiteHeader transparentAtTop={false} />

      <section className="mx-auto max-w-6xl px-6 pt-32 pb-6 md:px-16">
        <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-ocean-deep hover:text-accent">
          <ArrowLeft className="h-3.5 w-3.5" /> BACK TO SHOP
        </Link>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 md:grid-cols-2 md:px-16">
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <img src={product.img} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-[0.25em] text-accent">{product.category.toUpperCase()}</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-2xl font-bold text-ink">{product.price}</p>
          <p className="mt-6 text-sm leading-relaxed text-muted">{product.desc}</p>

          {product.sized && (
            <label className="mt-8 block">
              <span className="text-[11px] font-bold tracking-widest text-muted">SIZE</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`h-10 w-10 rounded-full border text-xs font-bold ${
                      size === s ? "border-ocean-deep bg-ocean-deep text-white" : "border-ocean-deep/30 text-ocean-deep hover:border-ocean-deep"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </label>
          )}

          <div className="mt-8 flex items-center gap-6">
            <div className="flex items-center rounded-full border border-ocean-deep/30">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-2 text-lg" aria-label="Decrease">−</button>
              <span className="w-8 text-center text-sm font-bold">{qty}</span>
              <button onClick={() => setQty(Math.min(10, qty + 1))} className="px-4 py-2 text-lg" aria-label="Increase">+</button>
            </div>
            <button
              onClick={addToBag}
              className="flex-1 rounded-full bg-ocean-deep py-3.5 text-xs font-bold tracking-widest text-accent hover:bg-accent hover:text-ocean-deep"
            >
              ADD TO BAG
            </button>
          </div>

          <p className="mt-6 text-xs text-muted">
            Printed and packed in Agadir · Ships within 3 business days across Morocco and Europe.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24 md:px-16">
          <h2 className="font-display text-2xl font-bold text-ink">You might also like</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} to="/shop/$productId" params={{ productId: p.slug }} className="group overflow-hidden rounded-xl border border-ocean-deep/10 bg-white shadow-sm">
                <img src={p.img} alt={p.name} loading="lazy" className="h-56 w-full object-cover transition-transform group-hover:scale-105" />
                <div className="p-5">
                  <p className="text-[10px] font-bold tracking-[0.25em] text-accent">{p.category.toUpperCase()}</p>
                  <div className="mt-2 flex items-baseline justify-between gap-3">
                    <span className="font-display text-sm font-bold text-ink">{p.name}</span>
                    <span className="text-sm font-bold text-ink">{p.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}
