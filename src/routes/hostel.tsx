import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Wifi, CookingPot, Sun, Waves, ShowerHead } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { rooms } from "@/lib/area-data";
const themeHero = "/__l5e/assets-v1/c25e71f8-1436-43bc-9747-0e14bf303ea9/surf-hero.jpg";

const TITLE = "Surf Hostel in Anza, Agadir — ÁREA";
const DESC = "Dorm beds, private doubles and surf cabins steps from Anza beach. Free wifi, shared kitchen, rooftop terrace and secure board storage.";

export const Route = createFileRoute("/hostel")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: themeHero },
      { name: "twitter:image", content: themeHero },
    ],
  }),
  component: HostelPage,
});

const amenities = [
  { icon: Wifi, label: "Fast wifi" },
  { icon: CookingPot, label: "Shared kitchen" },
  { icon: Sun, label: "Rooftop terrace" },
  { icon: Waves, label: "Board storage" },
  { icon: ShowerHead, label: "Hot showers" },
];

function HostelPage() {
  const [form, setForm] = useState({ name: "", email: "", checkin: "", checkout: "", guests: 2, room: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Valid email required";
    if (!form.checkin) errs.checkin = "Required";
    if (!form.checkout) errs.checkout = "Required";
    else if (form.checkin && form.checkout <= form.checkin) errs.checkout = "Must be after check-in";
    if (!form.guests || form.guests < 1) errs.guests = "At least 1";
    if (!form.room) errs.room = "Choose a room";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSent(true);
  };

  return (
    <main className="bg-background text-ink">
      <SiteHeader transparentAtTop />

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
        <img src={themeHero} alt="ÁREA surf hostel exterior" className="fixed inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/70 via-ocean-deep/30 to-ocean-deep/70" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-16 md:px-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-accent">Beds · Breakfast · Board storage</p>
          <h1 className="mt-3 font-display text-6xl font-bold text-white md:text-7xl">HOSTEL</h1>
          <p className="mt-4 max-w-lg text-sm text-white/85">
            Sleep two minutes from the sand in a house built by surfers. Shared kitchen, rooftop dinners and a board rack by the door.
          </p>
        </div>
      </section>

      {/* ROOMS */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-16">
        <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">Rooms</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {rooms.map((r) => (
            <article key={r.slug} className="overflow-hidden rounded-xl border border-ocean-deep/10 bg-white shadow-sm">
              <img src={r.img} alt={`${r.name} at ÁREA hostel`} loading="lazy" className="h-52 w-full object-cover" />
              <div className="p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-bold text-ink">{r.name}</h3>
                  <p className="text-sm font-bold text-accent">{r.price}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{r.desc}</p>
                <button
                  onClick={() => {
                    setForm((f) => ({ ...f, room: r.name }));
                    document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-6 w-full rounded-full border border-ocean-deep py-2.5 text-[11px] font-bold tracking-widest text-ocean-deep hover:bg-ocean-deep hover:text-white"
                >
                  RESERVE THIS ROOM
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* AMENITIES */}
      <section className="border-y border-ocean-deep/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-8 px-6 py-10 md:px-16">
          {amenities.map((a) => (
            <div key={a.label} className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ocean-deep text-accent">
                <a.icon className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold tracking-widest text-ink">{a.label.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </section>

      {/* RESERVATION */}
      <section id="book" className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:px-16">
        <div>
          <p className="text-xs font-bold tracking-[0.3em] text-muted">RESERVE YOUR BED</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Book your stay in Anza
          </h2>
          <p className="mt-8 text-sm font-bold text-ink">Check-in from 14:00 · check-out by 11:00.</p>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Tell us your dates and we'll hold the room for 24 hours. Board rental and lessons can be added at check-in.
          </p>
        </div>

        {sent ? (
          <div className="rounded-2xl border border-accent/40 bg-white p-10 text-center shadow-sm">
            <h3 className="font-display text-2xl font-bold text-ink">Request received</h3>
            <p className="mt-4 text-sm text-muted">
              Thanks {form.name.split(" ")[0]} — we'll confirm your <b>{form.room}</b> for {form.checkin} → {form.checkout} by email at <b>{form.email}</b> shortly.
            </p>
            <button
              onClick={() => { setSent(false); setForm({ name: "", email: "", checkin: "", checkout: "", guests: 2, room: "" }); }}
              className="mt-6 rounded-full border border-ocean-deep px-5 py-2 text-[11px] font-bold tracking-widest text-ocean-deep"
            >
              MAKE ANOTHER RESERVATION
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="rounded-2xl border border-ocean-deep/10 bg-white p-8 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v.slice(0,100) })} error={errors.name} />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v.slice(0,255) })} error={errors.email} />
              <Field label="Check-in" type="date" value={form.checkin} onChange={(v) => setForm({ ...form, checkin: v })} error={errors.checkin} />
              <Field label="Check-out" type="date" value={form.checkout} onChange={(v) => setForm({ ...form, checkout: v })} error={errors.checkout} />
              <Field label="Guests" type="number" value={String(form.guests)} onChange={(v) => setForm({ ...form, guests: Number(v) || 1 })} error={errors.guests} />
              <label className="block">
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.3em] text-ocean-deep">Room type</span>
                <select value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} className="w-full border-b border-ocean-deep/30 bg-transparent py-2 text-sm text-ink outline-none">
                  <option value="">Select a room</option>
                  {rooms.map((r) => <option key={r.slug}>{r.name}</option>)}
                </select>
                {errors.room && <span className="text-xs text-red-600">{errors.room}</span>}
              </label>
            </div>
            <button type="submit" className="mt-8 w-full rounded-full bg-ocean-deep py-3.5 text-xs font-bold tracking-widest text-accent hover:bg-accent hover:text-ocean-deep">
              REQUEST BOOKING
            </button>
          </form>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}

function Field({ label, value, onChange, error, type = "text" }: { label: string; value: string; onChange: (v: string) => void; error?: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.3em] text-ocean-deep">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full border-b border-ocean-deep/30 bg-transparent py-2 text-sm text-ink outline-none focus:border-accent" />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
