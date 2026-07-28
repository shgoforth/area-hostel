import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart, lineKey, formatPrice } from "@/lib/cart";

export function CartDrawer() {
  const { open, setOpen, lines, subtotal, setQty, remove, count } = useCart();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex justify-end">
      <button
        aria-label="Close cart"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-ocean-deep/60 backdrop-blur-sm"
      />
      <aside className="relative flex h-full w-full max-w-md flex-col bg-background shadow-2xl">
        <header className="flex items-center justify-between border-b border-ocean-deep/10 px-6 py-5">
          <h2 className="font-display text-lg font-bold tracking-wide text-ink">
            YOUR BAG {count > 0 && <span className="text-muted">({count})</span>}
          </h2>
          <button onClick={() => setOpen(false)} aria-label="Close cart" className="text-ink">
            <X className="h-5 w-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <ShoppingBag className="h-10 w-10 text-muted" />
            <p className="text-sm text-muted">Your bag is empty.</p>
            <Link
              to="/shop"
              onClick={() => setOpen(false)}
              className="rounded-full bg-ocean-deep px-6 py-3 text-xs font-bold tracking-widest text-accent"
            >
              BROWSE THE SHOP
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
              {lines.map((l) => {
                const key = lineKey(l);
                return (
                  <div key={key} className="flex gap-4">
                    <img src={l.img} alt={l.name} loading="lazy" className="h-24 w-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-display text-sm font-bold text-ink">{l.name}</p>
                        <button onClick={() => remove(key)} aria-label={`Remove ${l.name}`} className="text-muted hover:text-ink">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      {l.size && <p className="mt-1 text-[11px] tracking-widest text-muted">SIZE {l.size}</p>}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-ocean-deep/20">
                          <button onClick={() => setQty(key, l.qty - 1)} aria-label="Decrease" className="px-3 py-1.5">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold">{l.qty}</span>
                          <button onClick={() => setQty(key, l.qty + 1)} aria-label="Increase" className="px-3 py-1.5">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-ink">{formatPrice(l.price * l.qty)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <footer className="border-t border-ocean-deep/10 px-6 py-6">
              <div className="flex items-center justify-between text-sm">
                <span className="tracking-widest text-muted">SUBTOTAL</span>
                <span className="font-display text-lg font-bold text-ink">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-[11px] text-muted">Shipping calculated at checkout.</p>
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className="mt-5 block rounded-full bg-ocean-deep py-3.5 text-center text-xs font-bold tracking-widest text-accent hover:bg-accent hover:text-ocean-deep"
              >
                CHECKOUT
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
