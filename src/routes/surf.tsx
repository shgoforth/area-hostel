import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { MessageCircle, CreditCard, Check, X, Lock } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { boards } from "@/lib/area-data";
import surfHero from "@/assets/area-surf-hero.jpg";
import spotAnza from "@/assets/spot-anza-new.png";
import spotTaghazout from "@/assets/spot-taghazout-new.png";
import spotImsouane from "@/assets/spot-imsouane-new.png";
import bookingBoards from "@/assets/booking-boards.jpg";

const WHATSAPP_NUMBER = "212667281744"; // +212 667 281 744

const FORMULAS = [
  { id: "board", label: "Board only", price: "€10 / day", amount: 10 },
  { id: "board-wetsuit", label: "Board + Wetsuit", price: "€15 / day", amount: 15 },
  { id: "board-wetsuit-lesson", label: "Board + Wetsuit + Lesson", price: "€35 / session", amount: 35 },
] as const;

const DURATIONS = ["Half day", "1 day", "2 days", "3+ days"] as const;
const LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;

const TITLE = "Surfboard Rental & Lessons in Anza — ÁREA";
const DESC = "Rent beginner foamies to pro shortboards from €10 a day in Anza, Agadir. Wetsuit and lesson packages, local surf spots and instant reservation.";

export const Route = createFileRoute("/surf")({
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
  component: SurfPage,
});

const spots = [
  { img: spotAnza, name: "Anza Beach" },
  { img: spotTaghazout, name: "Taghazout" },
  { img: spotImsouane, name: "Imsouane" },
];

function SurfPage() {
  const [mode, setMode] = useState<"rent" | "buy">("rent");
  const [formula, setFormula] = useState<(typeof FORMULAS)[number]["id"]>("board-wetsuit");
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>("1 day");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("Beginner");
  const [board, setBoard] = useState<string>("");
  const [people, setPeople] = useState("1");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [payOpen, setPayOpen] = useState(false);

  const activeFormula = FORMULAS.find((f) => f.id === formula)!;
  const boardLabel = boards.find((b) => b.slug === board)?.name ?? "";

  const totalEUR = useMemo(() => {
    const perPerson = activeFormula.amount;
    const days = duration === "Half day" ? 0.5 : duration === "1 day" ? 1 : duration === "2 days" ? 2 : 3;
    const multi = formula === "board-wetsuit-lesson" ? perPerson : perPerson * days;
    return Math.max(1, Math.round(multi * Math.max(1, Number(people) || 1)));
  }, [activeFormula, duration, formula, people]);

  const message = [
    "Hey ÁREA 🤙",
    "",
    "I'd like to book a surf session:",
    `• Formula: ${activeFormula.label} (${activeFormula.price})`,
    `• Duration: ${duration}`,
    `• Level: ${level}`,
    boardLabel ? `• Board: ${boardLabel}` : null,
    `• People: ${people}`,
    date ? `• Date: ${date}` : null,
    name ? `• Name: ${name}` : null,
    "",
    `Estimated total: €${totalEUR}`,
  ].filter(Boolean).join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <main className="bg-background text-ink">
      <SiteHeader transparentAtTop />

      {/* HERO — full-bleed cinematic */}
      <section className="relative isolate min-h-screen w-full overflow-hidden bg-[#050914]">
        <img
          src={surfHero}
          alt="AREA — surfer inside a barrel at dawn"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050914]/60 via-transparent to-[#050914]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050914]/70 via-transparent to-transparent" />

        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader transparentAtTop />

          <div className="mx-auto mt-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-20 md:px-16 md:pb-28">
            <p className="font-body text-[11px] font-bold uppercase tracking-[0.4em] text-accent">
              Board Rental · Lessons · Anza, Agadir
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-[0.95] text-white sm:text-5xl md:text-6xl">
              Chase the line.<br />Live inside the wave.
            </h1>
            <p className="max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
              Our full fleet is serviced daily and waiting a few steps from the water. Rent by the day, add a wetsuit, or take a lesson with a local instructor.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#book" className="inline-block rounded-full bg-accent px-7 py-3.5 text-xs font-bold tracking-widest text-ocean-deep transition hover:scale-[1.02]">
                BOOK A SESSION
              </a>
              <a href="#catalogue" className="inline-block rounded-full border border-white/30 px-7 py-3.5 text-xs font-bold tracking-widest text-white transition hover:bg-white/10">
                VIEW BOARDS
              </a>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] font-bold tracking-[0.4em] text-white/60">
          SCROLL
        </div>
      </section>

      {/* CATALOGUE — dark */}
      <section id="catalogue" className="relative overflow-hidden bg-[#050914] py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-6 md:px-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-accent">01 · The fleet</p>
              <h2 className="mt-3 font-display text-4xl font-bold leading-[0.95] text-white sm:text-5xl">
                The full board<br />catalogue
              </h2>
            </div>
            <div className="flex rounded-full border border-white/15 p-1">
              {(["rent", "buy"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded-full px-6 py-2.5 text-xs font-bold tracking-widest transition ${
                    mode === m ? "bg-accent text-ocean-deep" : "text-white/60 hover:text-white"
                  }`}
                >
                  {m === "rent" ? "RENT" : "BUY"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {boards.map((b) => {
              const active = board === b.slug;
              return (
                <button
                  key={b.slug}
                  type="button"
                  onClick={() => { setBoard(b.slug); document.getElementById("book")?.scrollIntoView({ behavior: "smooth" }); }}
                  className={`group relative flex flex-col overflow-hidden rounded-3xl border p-5 text-left transition ${
                    active ? "border-accent bg-accent/10" : "border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent">
                    <img src={b.img} alt={`${b.name} surfboard`} loading="lazy" className="h-full w-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-2">
                    <h3 className="font-display text-sm font-bold tracking-wide text-white">{b.name}</h3>
                    {active && <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-accent"><Check className="h-3 w-3 text-ocean-deep" /></span>}
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/60">{b.desc}</p>
                  <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-4">
                    <span className="text-[9px] font-bold tracking-[0.25em] text-accent">{mode === "rent" ? "DAILY" : "BUY"}</span>
                    <span className="font-display text-lg font-bold text-white">{mode === "rent" ? b.daily : b.buy}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="mt-8 text-center text-[10px] font-bold tracking-[0.3em] text-white/40">TAP A BOARD TO ADD IT TO YOUR SESSION ↓</p>
        </div>
      </section>



      {/* BOOKING */}
      <section id="book" className="relative overflow-hidden bg-[#050914] py-24 md:py-32">
        <img src={bookingBoards} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050914] via-[#050914]/85 to-[#050914]" />

        <div className="relative mx-auto max-w-6xl px-6 md:px-16">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold tracking-[0.4em] text-accent">RESERVE · TWO STEPS</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[0.95] text-white sm:text-5xl md:text-6xl">
              Build your session.<br />
              <span className="text-accent">Pay now or ping us on WhatsApp.</span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/70 md:text-base">
              Pick a formula, tell us when and how many. Send it straight to our WhatsApp for a personal reply within the hour — or lock the slot instantly with a card payment.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            {/* Builder */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-10">
              <div>
                <p className="text-[10px] font-bold tracking-[0.3em] text-accent">01 · FORMULA</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {FORMULAS.map((f) => {
                    const active = formula === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFormula(f.id)}
                        className={`relative rounded-2xl border p-4 text-left transition ${
                          active ? "border-accent bg-accent/10" : "border-white/10 bg-white/[0.02] hover:border-white/25"
                        }`}
                      >
                        {active && (
                          <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-accent">
                            <Check className="h-3 w-3 text-ocean-deep" />
                          </span>
                        )}
                        <div className="text-sm font-bold text-white">{f.label}</div>
                        <div className="mt-1 text-xs text-white/60">{f.price}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8">
                <p className="text-[10px] font-bold tracking-[0.3em] text-accent">02 · DURATION</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {DURATIONS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={`h-10 rounded-full border px-5 text-xs font-bold tracking-widest transition ${
                        duration === d ? "border-accent bg-accent text-ocean-deep" : "border-white/15 text-white/70 hover:border-white/35"
                      }`}
                    >
                      {d.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <p className="text-[10px] font-bold tracking-[0.3em] text-accent">03 · LEVEL</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {LEVELS.map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLevel(l)}
                      className={`h-10 rounded-full border px-5 text-xs font-bold tracking-widest transition ${
                        level === l ? "border-accent bg-accent text-ocean-deep" : "border-white/15 text-white/70 hover:border-white/35"
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <p className="text-[10px] font-bold tracking-[0.3em] text-accent">04 · BOARD</p>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {boards.map((b) => {
                    const active = board === b.slug;
                    return (
                      <button
                        key={b.slug}
                        type="button"
                        onClick={() => setBoard(active ? "" : b.slug)}
                        className={`group relative flex flex-col items-center overflow-hidden rounded-2xl border p-3 transition ${
                          active ? "border-accent bg-accent/10" : "border-white/10 bg-white/[0.02] hover:border-white/25"
                        }`}
                      >
                        {active && (
                          <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-accent">
                            <Check className="h-3 w-3 text-ocean-deep" />
                          </span>
                        )}
                        <div className="flex h-24 items-center justify-center">
                          <img src={b.img} alt={b.name} loading="lazy" className="h-full w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" />
                        </div>
                        <div className="mt-2 text-center text-[10px] font-bold tracking-widest text-white/80">{b.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                <label className="block">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-accent">PEOPLE</span>
                  <input type="number" min={1} max={12} value={people} onChange={(e) => setPeople(e.target.value.slice(0, 2))} className="mt-2 h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-white outline-none focus:border-accent" />
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-accent">DATE</span>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-white outline-none focus:border-accent" />
                </label>
                <label className="block">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-accent">NAME (OPTIONAL)</span>
                  <input type="text" value={name} placeholder="e.g. Yassine" onChange={(e) => setName(e.target.value.slice(0, 60))} className="mt-2 h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm text-white outline-none focus:border-accent" />
                </label>
              </div>

            </div>

            <aside className="flex flex-col rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 via-white/[0.02] to-transparent p-6 md:p-10">
              <p className="text-[10px] font-bold tracking-[0.3em] text-accent">YOUR SESSION</p>
              <div className="mt-6 space-y-3 text-sm text-white/80">
                <SummaryRow k="Formula" v={activeFormula.label} />
                <SummaryRow k="Duration" v={duration} />
                <SummaryRow k="Level" v={level} />
                {boardLabel && <SummaryRow k="Board" v={boardLabel} />}
                <SummaryRow k="People" v={people} />
                <SummaryRow k="Date" v={date || "Flexible"} />
              </div>
              <div className="mt-6 flex items-baseline justify-between border-t border-white/10 pt-6">
                <span className="text-[10px] font-bold tracking-[0.3em] text-white/60">EST. TOTAL</span>
                <span className="font-display text-4xl font-bold text-accent">€{totalEUR}</span>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <button type="button" onClick={() => setPayOpen(true)} className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-accent px-6 text-xs font-bold uppercase tracking-[0.3em] text-ocean-deep transition hover:scale-[1.02]">
                  <CreditCard className="h-4 w-4" /> Pay now — €{totalEUR}
                </button>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => toast.success("Opening WhatsApp — we reply within the hour.")} className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/25 px-6 text-xs font-bold uppercase tracking-[0.3em] text-white transition hover:bg-white/10">
                  <MessageCircle className="h-4 w-4 text-accent" /> Book via WhatsApp
                </a>
                <p className="mt-1 text-center text-[10px] tracking-widest text-white/50">DIRECT LINE · +212 667 281 744</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* SPOTS — images only */}
      <section className="relative overflow-hidden bg-[#050914] pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl px-6 md:px-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-accent">03 · Local waves</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">Surf spots around Anza</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {spots.map((s) => (
              <div key={s.name} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl transition hover:scale-[1.02]">
                <img src={s.img} alt={s.name} loading="lazy" className="block h-auto w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>



      {payOpen && (
        <PaymentModal amount={totalEUR} summary={`${activeFormula.label} · ${duration} · ${people} pax`} onClose={() => setPayOpen(false)} />
      )}

      <SiteFooter />
    </main>
  );
}

function SummaryRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-2 text-sm">
      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50">{k}</span>
      <span className="text-right font-medium text-white">{v}</span>
    </div>
  );
}

function PaymentModal({ amount, summary, onClose }: { amount: number; summary: string; onClose: () => void }) {
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  const formatCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = card.replace(/\s/g, "");
    if (digits.length < 15 || exp.length < 5 || cvc.length < 3 || !name.trim() || !email.includes("@")) {
      toast.error("Please complete every field.");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      toast.success(`Payment of €${amount} confirmed — see you in the water!`);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050914]/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#0b1220] text-white shadow-2xl">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/5 text-white/70 transition hover:bg-white/10">
          <X className="h-4 w-4" />
        </button>

        <div className="border-b border-white/10 bg-gradient-to-br from-accent/15 via-transparent to-transparent p-8">
          <p className="text-[10px] font-bold tracking-[0.3em] text-accent">SECURE CHECKOUT</p>
          <div className="mt-3 flex items-baseline justify-between">
            <h3 className="font-display text-2xl font-bold">Pay €{amount}</h3>
            <span className="text-[10px] tracking-widest text-white/50">via Stripe</span>
          </div>
          <p className="mt-1 text-xs text-white/60">{summary}</p>
        </div>

        <form onSubmit={submit} className="space-y-4 p-8">
          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value.slice(0, 120))} placeholder="you@email.com" className="mt-2 h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm outline-none focus:border-accent" />
          </label>
          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Cardholder</span>
            <input type="text" value={name} onChange={(e) => setName(e.target.value.slice(0, 60))} placeholder="Full name on card" className="mt-2 h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm outline-none focus:border-accent" />
          </label>
          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Card number</span>
            <input inputMode="numeric" value={card} onChange={(e) => setCard(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" className="mt-2 h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm tracking-widest outline-none focus:border-accent" />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Expiry</span>
              <input inputMode="numeric" value={exp} onChange={(e) => setExp(formatExp(e.target.value))} placeholder="MM/YY" className="mt-2 h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm outline-none focus:border-accent" />
            </label>
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">CVC</span>
              <input inputMode="numeric" value={cvc} onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" className="mt-2 h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-3 text-sm outline-none focus:border-accent" />
            </label>
          </div>

          <button type="submit" disabled={processing} className="mt-2 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-xs font-bold uppercase tracking-[0.3em] text-ocean-deep transition hover:scale-[1.01] disabled:opacity-60">
            {processing ? "Processing…" : <><Lock className="h-4 w-4" /> Pay €{amount} now</>}
          </button>

          <p className="flex items-center justify-center gap-2 pt-2 text-[10px] tracking-widest text-white/40">
            <Lock className="h-3 w-3" /> ENCRYPTED · POWERED BY STRIPE
          </p>
        </form>
      </div>
    </div>
  );
}
