import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Instagram, Facebook, Waves, BedDouble, ShoppingBag, MapPin } from "lucide-react";
import heroWave from "@/assets/hero-wave.jpg";

const TITLE = "ÁREA — Links";
const DESC = "All ÁREA links in one place: surf school, hostel, shop and socials.";

export const Route = createFileRoute("/links")({
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
  component: LinksPage,
});

type LinkItem = {
  label: string;
  sub?: string;
  href: string;
  external?: boolean;
  icon: ReactNode;
};

const primaryLinks: LinkItem[] = [
  {
    label: "Surf School & Lessons",
    sub: "Book a session on the Atlantic",
    href: "/surf",
    icon: <Waves className="h-5 w-5" />,
  },
  {
    label: "Hostel Reservation",
    sub: "Sleep steps from the break",
    href: "/hostel",
    icon: <BedDouble className="h-5 w-5" />,
  },
  {
    label: "Shop the Collection",
    sub: "Streetwear & essentials",
    href: "/shop",
    icon: <ShoppingBag className="h-5 w-5" />,
  },
];

const socialLinks: LinkItem[] = [
  {
    label: "@area.clothing",
    sub: "Instagram",
    href: "https://instagram.com/area.clothing",
    external: true,
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    label: "@areasurfschool",
    sub: "Instagram",
    href: "https://instagram.com/areasurfschool",
    external: true,
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    label: "@areasurfhostel",
    sub: "Instagram",
    href: "https://instagram.com/areasurfhostel",
    external: true,
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    label: "@area.clothing.shop",
    sub: "Facebook",
    href: "https://facebook.com/area.clothing.shop",
    external: true,
    icon: <Facebook className="h-5 w-5" />,
  },
];

function LinkRow({ item }: { item: LinkItem }) {
  const cls =
    "group flex w-full items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-left backdrop-blur-md transition hover:border-accent hover:bg-white hover:text-ocean-deep";

  const inner = (
    <>
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white/15 text-white transition group-hover:bg-ocean-deep group-hover:text-accent">
        {item.icon}
      </span>
      <span className="flex-1">
        <span className="block font-display text-sm font-bold tracking-wider uppercase">{item.label}</span>
        {item.sub && <span className="mt-0.5 block text-[11px] uppercase tracking-[0.25em] opacity-70">{item.sub}</span>}
      </span>
      <span className="text-lg opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100">→</span>
    </>
  );

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <Link to={item.href} className={cls}>
      {inner}
    </Link>
  );
}

function LinksPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ocean-deep text-white">
      <img src={heroWave} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/70 via-ocean-deep/85 to-ocean-deep" />

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center px-6 py-14">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-accent bg-ocean-deep shadow-xl">
          <img src="/favicon.png" alt="ÁREA logo" className="h-14 w-14 object-contain" />
        </div>

        <h1 className="mt-5 font-display text-2xl font-bold tracking-wide">ÁREA Surf & Clothing</h1>
        <p className="mt-2 text-center text-xs uppercase tracking-[0.35em] text-accent">Anza · Agadir · Morocco</p>
        <p className="mt-3 max-w-xs text-center text-sm text-white/70">
          Surf school, hostel and homegrown clothing line on the Atlantic coast.
        </p>

        <div className="mt-10 w-full space-y-3">
          {primaryLinks.map((link) => (
            <LinkRow key={link.label} item={link} />
          ))}
        </div>

        <div className="mt-10 w-full">
          <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.4em] text-accent">Follow us</p>
          <div className="space-y-3">
            {socialLinks.map((link) => (
              <LinkRow key={link.label} item={link} />
            ))}
          </div>
        </div>

        <Link
          to="/shop"
          className="mt-12 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 font-display text-sm font-bold uppercase tracking-[0.35em] text-ocean-deep shadow-lg transition hover:bg-white"
        >
          <ShoppingBag className="h-4 w-4" />
          Shop Now
        </Link>

        <a
          href="https://maps.app.goo.gl/wPZtL6rufovGvGR58?g_st=ic"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 font-display text-sm font-bold uppercase tracking-[0.35em] text-white shadow-lg transition hover:border-accent hover:bg-white/20"
        >
          <MapPin className="h-4 w-4" />
          Open Google Maps
        </a>
      </div>
    </main>
  );
}