import { createFileRoute, Link } from "@tanstack/react-router";
const themeHero = "/__l5e/assets-v1/c25e71f8-1436-43bc-9747-0e14bf303ea9/surf-hero.jpg";
import spotAnzaCard from "@/assets/spot-anza.png";
import spotTaghazoutCard from "@/assets/spot-taghazout.png";
import spotImsouaneCard from "@/assets/spot-imsouane.png";
import areaStore from "@/assets/area-store.png.asset.json";
import board1 from "@/assets/board-1.png";
import board2 from "@/assets/board-2.png";
import board3 from "@/assets/board-3.png";
import { boards, products } from "@/lib/area-data";
import { ShoppingCart } from "lucide-react";
import darkOcean from "@/assets/dark-ocean.jpg";
import hostel from "@/assets/hostel.jpg";
import { useRef } from "react";
import { ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ÁREA Surf Hostel — Anza, Agadir, Morocco" },
      { name: "description", content: "Surf, stay, and ride the Atlantic at ÁREA — surf hostel & school in Anza, Agadir. Lessons, boards, and unforgettable waves." },
      { property: "og:title", content: "ÁREA Surf Hostel — Anza, Agadir, Morocco" },
      { property: "og:description", content: "Surf, stay, and ride the Atlantic at ÁREA — surf hostel & school in Anza, Agadir. Lessons, boards, and unforgettable waves." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <SiteHeader transparentAtTop />


      {/* HERO */}
      <section className="relative h-screen min-h-[720px] w-full overflow-hidden">
        <img src={themeHero} alt="Surf hero image" className="fixed inset-0 h-full w-full object-cover" width={1920} height={1200} />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/50 via-transparent to-ocean-deep/60" />

        <div className="relative z-10 flex h-full items-center px-8 md:px-32">
          <div className="text-white max-w-lg">
            <h1 className="font-display text-6xl font-bold leading-[0.95] md:text-7xl">
              Let's Ride<br />A Wave
            </h1>
            <p className="mt-4 text-base opacity-90">Best beaches on<br />the Atlantic coast</p>
            <div className="mt-8 flex items-center gap-4">
              <a href="#surf" className="rounded-full bg-accent px-6 py-3 text-xs font-bold tracking-widest text-ocean-deep">
                GET STARTED
              </a>
              <a href="#surf" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 text-white">
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SURFING SPOTS */}
      <SurfingSpots
        spots={[
          { label: "ANZA", img: spotAnzaCard },
          { label: "TAGHAZOUT", img: spotTaghazoutCard },
          { label: "IMSOUANE", img: spotImsouaneCard },
        ]}
      />


      {/* SURFBOARDS */}
      <section id="boards" className="relative overflow-hidden py-24 text-white bg-ocean-deep">
        <img src={darkOcean} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" loading="lazy" />
        <div className="pointer-events-none absolute inset-x-0 top-4 select-none text-center font-display text-[9rem] font-bold uppercase text-accent/10 leading-none">
          Surfboards
        </div>
        <div className="relative mx-auto max-w-6xl px-8 md:px-16">
          <h2 className="text-center font-display text-4xl font-bold">SURFBOARDS</h2>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { n: "01", img: board1, label: "SHORTBOARD" },
              { n: "02", img: board2, label: "FUNBOARD" },
              { n: "03", img: board3, label: "LONGBOARD" },
            ].map((b) => (
              <div key={b.n} className="flex flex-col items-center">
                <div className="font-display text-2xl font-bold text-accent">{b.n}</div>
                <div className="mt-6 flex h-72 items-end justify-center">
                  <img src={b.img} alt={b.label} className="h-full w-auto object-contain" loading="lazy" />
                </div>
                <div className="mt-6 text-xs font-bold tracking-widest uppercase">{b.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center">
            <div className="h-px w-40 bg-white/60" />
            <a href="/surf" className="mt-6 text-xs font-bold tracking-widest text-accent hover:opacity-80">
              SHOW ALL
            </a>
          </div>
        </div>
      </section>

      {/* FROM THE SHOP */}
      <section id="shop-preview" className="relative overflow-hidden bg-[#0a0a0a] py-24 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-8 select-none text-center font-display text-[8rem] font-bold uppercase text-white/5 leading-none">
          The Shop
        </div>
        <div className="relative mx-auto max-w-6xl px-6 md:px-16">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-body text-xs uppercase tracking-[0.5em] text-accent">Wear the brand</p>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">FROM THE SHOP</h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                A quick look at the men's line — streetwear staples, basics and outerwear built for everyday.
              </p>
            </div>
            <Link
              to="/shop"
              className="rounded-md border border-white/40 px-6 py-2 text-[11px] font-bold tracking-widest text-white transition hover:bg-white hover:text-black"
            >
              SHOP ALL
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {products.slice(0, 4).map((p) => (
              <Link
                key={p.slug}
                to="/shop/$productId"
                params={{ productId: p.slug }}
                className="group flex flex-col overflow-hidden rounded-xl bg-white/[0.03] ring-1 ring-white/10 transition hover:ring-white/30"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-black">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-sm bg-black/70 px-2 py-1 text-[10px] font-bold tracking-widest text-white backdrop-blur">
                    {p.category.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4">
                  <h3 className="font-display text-sm font-bold tracking-wide">{p.name}</h3>
                  <span className="text-sm font-bold text-accent">{p.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* HOSTEL BOOKING */}
      <section id="hostel" className="relative overflow-hidden">
        <img
          src={hostel}
          alt="Beach hostel room"
          width={1600}
          height={1000}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep via-ocean-deep/80 to-transparent" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:px-16">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.5em] text-accent">
              Stay with us
            </p>
            <h2 className="mt-4 font-display text-5xl font-bold leading-[0.95] text-white md:text-7xl">
              Book<br />the hostel
            </h2>
            <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-white/80">
              Sleep steps from the break. Dorm beds, private cabins, hot showers, board storage and a shared kitchen open all summer long.
            </p>

            <form
              className="mt-8 space-y-4 rounded-2xl bg-white/85 p-6 shadow-xl backdrop-blur"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = "/hostel";
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1 block font-body text-[10px] uppercase tracking-[0.3em] text-ocean-deep">Check in</span>
                  <input type="date" name="checkin" className="w-full border-b border-ocean-deep/40 bg-transparent py-2 font-body text-sm text-ink outline-none focus:border-accent" />
                </label>
                <label className="block">
                  <span className="mb-1 block font-body text-[10px] uppercase tracking-[0.3em] text-ocean-deep">Check out</span>
                  <input type="date" name="checkout" className="w-full border-b border-ocean-deep/40 bg-transparent py-2 font-body text-sm text-ink outline-none focus:border-accent" />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1 block font-body text-[10px] uppercase tracking-[0.3em] text-ocean-deep">Guests</span>
                  <select name="guests" className="w-full border-b border-ocean-deep/40 bg-transparent py-2 font-body text-sm text-ink outline-none">
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4+ guests</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block font-body text-[10px] uppercase tracking-[0.3em] text-ocean-deep">Room</span>
                  <select name="room" className="w-full border-b border-ocean-deep/40 bg-transparent py-2 font-body text-sm text-ink outline-none">
                    <option>Dorm bed · €28</option>
                    <option>Private double · €78</option>
                    <option>Surf cabin · €120</option>
                  </select>
                </label>
              </div>
              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-ocean-deep py-3 font-body text-xs uppercase tracking-[0.4em] text-accent transition hover:bg-accent hover:text-ocean-deep"
              >
                Reserve →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className="relative overflow-hidden bg-background py-28">
        <div className="pointer-events-none absolute inset-x-0 top-4 select-none text-center font-display text-[9rem] font-bold uppercase text-accent/10 leading-none">
          About Us
        </div>

        <div className="relative mx-auto max-w-6xl px-6 md:px-16">
          <div className="max-w-2xl">
            <p className="font-body text-xs uppercase tracking-[0.5em] text-accent">Our story</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-ink md:text-5xl">ABOUT ÁREA</h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Born from urban craft and Atlantic salt, ÁREA is a surf collective and streetwear label based in Anza, Agadir. We run the hostel, the surf school and our own clothing line under one roof — a home base for surfers looking for good waves, honest gear and a real community.
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-2 md:items-center">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-ocean-deep/10">
                <img
                  src={areaStore.url}
                  alt="Inside the ÁREA Clothing store in Agadir"
                  className="h-full w-full object-cover"
                  width={1200}
                  height={800}
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-ocean-deep px-6 py-5 text-white shadow-lg md:block">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-accent">Est. 2018</p>
                <p className="mt-1 font-display text-lg font-bold">Anza · Agadir</p>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-xl border border-ocean-deep/10 bg-white p-6 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-accent">01 — Equipment</p>
                <h3 className="mt-2 font-display text-lg font-bold text-ink">Boards, wetsuits, everything</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">A full quiver of boards and serviced wetsuits, ready every morning — whether you rent by the day or join a lesson.</p>
              </div>
              <div className="rounded-xl border border-ocean-deep/10 bg-white p-6 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-accent">02 — Hostel</p>
                <h3 className="mt-2 font-display text-lg font-bold text-ink">A home by the beach</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">Cozy dorms and private cabins steps from the break, shared kitchen, rooftop and a proper Moroccan breakfast every day.</p>
              </div>
              <div className="rounded-xl border border-ocean-deep/10 bg-white p-6 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-accent">03 — Clothing</p>
                <h3 className="mt-2 font-display text-lg font-bold text-ink">Made in Anza, worn in the water</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">Our own streetwear line — screen-printed locally, tested on the beach and built to last well beyond one season.</p>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 rounded-2xl bg-ocean-deep px-8 py-10 text-white sm:grid-cols-3 md:px-12">
            <div>
              <p className="font-display text-4xl font-bold text-accent">2018</p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/60">Established</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-accent">3</p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/60">Surf spots on the doorstep</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-accent">100%</p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/60">Locally sourced apparel</p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function SurfingSpots({ spots }: { spots: { label: string; img: string }[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="surf" className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl px-6 md:px-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-accent">Atlantic coast</p>
            <h2 className="mt-2 font-display text-4xl font-bold text-ink md:text-5xl">SURFING SPOTS</h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button onClick={() => scrollBy(-1)} aria-label="Previous spot" className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 bg-white text-ink transition hover:border-accent hover:text-accent">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button onClick={() => scrollBy(1)} aria-label="Next spot" className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 bg-white text-ink transition hover:border-accent hover:text-accent">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {spots.map((c) => (
            <div
              key={c.label}
              data-card
              className="relative w-[85vw] max-w-sm flex-none snap-center overflow-hidden rounded-2xl shadow-2xl md:w-[340px]"
            >
              <img src={c.img} alt={c.label} className="block h-auto w-full" loading="lazy" />
            </div>
          ))}
        </div>

        <div className="mt-2 flex justify-center gap-2 md:hidden">
          <button onClick={() => scrollBy(-1)} aria-label="Previous spot" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 bg-white">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button onClick={() => scrollBy(1)} aria-label="Next spot" className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 bg-white">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
