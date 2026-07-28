import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Instagram, Facebook, Twitter, Menu, X, ShoppingBag } from "lucide-react";
import areaLogo from "@/assets/area-hostel-logo.jpeg";
import { useCart } from "@/lib/cart";

const NAV = [
  { label: "Home", to: "/" },
  { label: "Surf", to: "/surf" },
  { label: "Hostel", to: "/hostel" },
  { label: "Shop", to: "/shop" },
];

export function SiteHeader({ transparentAtTop = true }: { transparentAtTop?: boolean }) {
  const [scrolled, setScrolled] = useState(!transparentAtTop);
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    if (!transparentAtTop) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentAtTop]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-ocean-deep/85 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-12">
          <Link to="/" className="flex items-center" aria-label="ÁREA Hostel home">
            <img src={areaLogo} alt="ÁREA Hostel logo" className="h-8 w-auto md:h-10" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <ul className="flex gap-7 text-[13px] font-medium tracking-[0.15em] text-white uppercase">
              {NAV.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="story-link">{l.label}</Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 text-accent">
              <a href="#" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
              <a href="#" aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
            </div>
            <CartButton count={count} onClick={() => setCartOpen(true)} />
            <Link
              to="/hostel"
              hash="book"
              className="rounded-full bg-accent px-5 py-2.5 text-[11px] font-bold tracking-widest text-ocean-deep transition-transform hover:scale-105"
            >
              BOOK NOW
            </Link>
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <CartButton count={count} onClick={() => setCartOpen(true)} />
            <button onClick={() => setOpen(true)} className="text-white" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <style>{`
        .story-link { position: relative; display: inline-block; padding-bottom: 4px; }
        .story-link::after {
          content: ""; position: absolute; left: 50%; bottom: 0;
          width: 0; height: 1.5px; background: var(--accent);
          transition: all 200ms ease; transform: translateX(-50%);
        }
        .story-link:hover::after { width: 100%; }
      `}</style>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-ocean-deep text-white animate-fade-in md:hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <img src={areaLogo} alt="ÁREA Hostel logo" className="h-8 w-auto" />
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <ul className="flex flex-1 flex-col items-center justify-center gap-8 text-2xl font-display tracking-[0.2em] uppercase">
            {NAV.map((l) => (
              <li key={l.label}>
                <Link to={l.to} onClick={() => setOpen(false)}>{l.label}</Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setOpen(false);
                  setCartOpen(true);
                }}
                className="uppercase tracking-[0.2em]"
              >
                Bag ({count})
              </button>
            </li>
          </ul>
          <div className="flex flex-col items-center gap-6 pb-12">
            <div className="flex gap-6 text-accent">
              <Instagram className="h-5 w-5" />
              <Facebook className="h-5 w-5" />
              <Twitter className="h-5 w-5" />
            </div>
            <Link
              to="/hostel"
              hash="book"
              onClick={() => setOpen(false)}
              className="rounded-full bg-accent px-8 py-3 text-xs font-bold tracking-widest text-ocean-deep"
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function CartButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button onClick={onClick} aria-label={`Open bag, ${count} items`} className="relative text-white">
      <ShoppingBag className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-ocean-deep">
          {count}
        </span>
      )}
    </button>
  );
}
