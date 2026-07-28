import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Lock, ArrowLeft, Check } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useCart, lineKey, formatPrice } from "@/lib/cart";

const TITLE = "Checkout — ÁREA Surf Shop";
const DESC = "Review your ÁREA surf shop order, enter your shipping details and place your order. Shipping across Morocco and Europe.";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { lines, subtotal, setQty, remove, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const shipping = lines.length === 0 || subtotal >= 120 ? 0 : 9;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <main className="bg-background text-ink">
        <SiteHeader transparentAtTop={false} />
        <section className="mx-auto max-w-2xl px-6 py-40 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent">
            <Check className="h-6 w-6 text-ocean-deep" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold">Order confirmed</h1>
          <p className="mt-4 text-sm text-muted">
            Thanks for supporting ÁREA. We've sent a confirmation email — your order leaves Agadir within 3 business days.
          </p>
          <Link to="/shop" className="mt-8 inline-block rounded-full bg-ocean-deep px-8 py-3.5 text-xs font-bold tracking-widest text-accent">
            KEEP SHOPPING
          </Link>
        </section>
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="bg-background text-ink">
      <SiteHeader transparentAtTop={false} />

      <section className="mx-auto max-w-6xl px-6 pt-32 pb-6 md:px-16">
        <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-ocean-deep hover:text-accent">
          <ArrowLeft className="h-3.5 w-3.5" /> CONTINUE SHOPPING
        </Link>
        <h1 className="mt-6 font-display text-4xl font-bold md:text-5xl">Checkout</h1>
      </section>

      {lines.length === 0 ? (
        <section className="mx-auto max-w-6xl px-6 pb-32 md:px-16">
          <p className="text-sm text-muted">Your bag is empty — pick something from the shop first.</p>
          <Link to="/shop" className="mt-6 inline-block rounded-full bg-ocean-deep px-8 py-3.5 text-xs font-bold tracking-widest text-accent">
            GO TO SHOP
          </Link>
        </section>
      ) : (
        <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-28 md:grid-cols-[1.15fr_0.85fr] md:px-16">
          <form
            className="space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              clear();
              setPlaced(true);
              toast.success("Order placed — check your inbox for the confirmation.");
            }}
          >
            <fieldset className="space-y-4">
              <legend className="text-[11px] font-bold tracking-[0.25em] text-accent">CONTACT</legend>
              <Field label="Full name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Phone" name="phone" type="tel" />
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="text-[11px] font-bold tracking-[0.25em] text-accent">SHIPPING ADDRESS</legend>
              <Field label="Street address" name="address" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="City" name="city" />
                <Field label="Postal code" name="zip" />
              </div>
              <Field label="Country" name="country" defaultValue="Morocco" />
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-[11px] font-bold tracking-[0.25em] text-accent">PAYMENT</legend>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-ocean-deep/20 p-4 text-sm">
                <input type="radio" name="payment" defaultChecked className="accent-current" />
                Cash on delivery / pay at the hostel
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-ocean-deep/20 p-4 text-sm">
                <input type="radio" name="payment" className="accent-current" />
                Bank transfer (details sent by email)
              </label>
            </fieldset>

            <button
              type="submit"
              className="w-full rounded-full bg-ocean-deep py-4 text-xs font-bold tracking-widest text-accent hover:bg-accent hover:text-ocean-deep"
            >
              PLACE ORDER · {formatPrice(total)}
            </button>
            <p className="flex items-center gap-2 text-[11px] text-muted">
              <Lock className="h-3.5 w-3.5" /> Your details are only used to ship this order.
            </p>
          </form>

          <aside className="h-fit rounded-2xl border border-ocean-deep/10 bg-white p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold">Order summary</h2>
            <div className="mt-6 space-y-5">
              {lines.map((l) => {
                const key = lineKey(l);
                return (
                  <div key={key} className="flex gap-4">
                    <img src={l.img} alt={l.name} loading="lazy" className="h-20 w-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="font-display text-sm font-bold">{l.name}</p>
                      {l.size && <p className="text-[11px] tracking-widest text-muted">SIZE {l.size}</p>}
                      <div className="mt-2 flex items-center gap-3 text-xs text-muted">
                        <button type="button" onClick={() => setQty(key, l.qty - 1)} aria-label="Decrease">−</button>
                        <span className="font-bold text-ink">{l.qty}</span>
                        <button type="button" onClick={() => setQty(key, l.qty + 1)} aria-label="Increase">+</button>
                        <button type="button" onClick={() => remove(key)} className="ml-auto underline">remove</button>
                      </div>
                    </div>
                    <span className="text-sm font-bold">{formatPrice(l.price * l.qty)}</span>
                  </div>
                );
              })}
            </div>

            <dl className="mt-8 space-y-2 border-t border-ocean-deep/10 pt-5 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
              <div className="flex justify-between pt-3 font-display text-lg font-bold">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>
          </aside>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted">
      <dt>{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}

function Field({ label, name, type = "text", defaultValue }: { label: string; name: string; type?: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="text-[11px] font-bold tracking-widest text-muted">{label.toUpperCase()}</span>
      <input
        required
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-xl border border-ocean-deep/20 bg-white px-4 py-3 text-sm outline-none focus:border-ocean-deep"
      />
    </label>
  );
}
