import { Link } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";
import areaLogo from "@/assets/area-hostel-logo.jpeg";

const COLUMNS = [
  {
    title: "SHOP",
    links: [
      { label: "Apparel", to: "/shop" },
      { label: "Wetsuits", to: "/shop" },
      { label: "Accessories", to: "/shop" },
      { label: "Checkout", to: "/checkout" },
    ],
  },
  {
    title: "SURF",
    links: [
      { label: "Lessons", to: "/surf" },
      { label: "Board rental", to: "/surf" },
      { label: "Surf spots", to: "/surf" },
    ],
  },
  {
    title: "STAY",
    links: [
      { label: "Rooms", to: "/hostel" },
      { label: "Facilities", to: "/hostel" },
      { label: "Book now", to: "/hostel" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-background px-4 pb-6 pt-16 md:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-ocean-deep text-white">
        <div className="grid gap-10 px-8 pb-10 pt-12 md:grid-cols-[repeat(3,minmax(0,0.6fr))_1.2fr] md:px-14">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-bold tracking-[0.25em] text-accent">{col.title}</h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-xs uppercase tracking-[0.15em] text-white/80 transition hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-[11px] font-bold tracking-[0.25em] text-accent">NEWSLETTER SIGNUP</h4>
            <form className="mt-5 flex overflow-hidden rounded-full bg-white/10" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Your email address"
                className="flex-1 bg-transparent px-5 py-3 text-xs text-white placeholder-white/50 outline-none"
              />
              <button className="rounded-full bg-accent px-5 text-[11px] font-bold tracking-widest text-ocean-deep">
                JOIN
              </button>
            </form>

            <div className="mt-6 flex gap-5 text-accent">
              <a href="https://www.instagram.com/area_shop_clothing/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition hover:opacity-80"><Instagram className="h-5 w-5" /></a>
              <a href="https://www.facebook.com/Area.clothing.shop/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition hover:opacity-80"><Facebook className="h-5 w-5" /></a>
            </div>

            <div className="mt-6 space-y-1 text-xs uppercase tracking-[0.15em] text-white/70">
              <p>Anza, Agadir · Morocco</p>
              <p>
                <a href="https://wa.me/212667281744" target="_blank" rel="noopener noreferrer" className="transition hover:text-accent">
                  06 67 28 17 44
                </a>
                <span className="mx-2">·</span>
                <a href="mailto:surf@areahostel.com" className="transition hover:text-accent">surf@areahostel.com</a>
              </p>
            </div>
          </div>
        </div>

        <p className="px-8 pb-8 text-center text-[11px] tracking-[0.2em] text-white/50 md:px-14">
          © ÁREA HOSTEL {new Date().getFullYear()}
        </p>

        <div className="relative flex items-end justify-center overflow-hidden px-4">
          <img
            src={areaLogo}
            alt="ÁREA Hostel"
            loading="lazy"
            className="w-full max-w-[640px] translate-y-[4%] select-none object-contain"
          />
        </div>
      </div>
    </footer>
  );
}
