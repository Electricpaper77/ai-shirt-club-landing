import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Crown,
  Gem,
  Lock,
  PackageCheck,
  Sparkles,
  Star,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";
import "./styles.css";

const formUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLScmqVes2tnVy8L6Gq-v6hnhBbYTPfEH2JX4l1dNoLO_hvmzOw/viewform";

const collections = [
  {
    month: "Jan",
    name: "Token Black",
    palette: "from-cyan-300 to-blue-500",
    theme: "Model launch night",
  },
  {
    month: "Feb",
    name: "Gradient Descent",
    palette: "from-violet-300 to-fuchsia-500",
    theme: "Training run artifact",
  },
  {
    month: "Mar",
    name: "Inference Club",
    palette: "from-emerald-300 to-cyan-500",
    theme: "Low-latency edition",
  },
  {
    month: "Apr",
    name: "Founder Stack",
    palette: "from-slate-100 to-cyan-300",
    theme: "Builder uniform",
  },
];

const founderBenefits = [
  "Founder 100 member number",
  "Locked founding price",
  "Priority access to limited drops",
  "Annual collector badge",
  "Member-only design voting",
  "Early shipment window",
];

const pricing = [
  {
    name: "Founding Member",
    price: "$49",
    highlight: true,
    note: "First 100 members",
    perks: ["Monthly premium shirt", "Founder 100 status", "Locked founding rate"],
  },
  {
    name: "Standard",
    price: "$59",
    note: "Core membership",
    perks: ["Monthly premium shirt", "Exclusive collection access", "Member updates"],
  },
  {
    name: "Premium",
    price: "$99",
    note: "Collector tier",
    perks: ["Monthly premium shirt", "Premium packaging", "Priority collection access"],
  },
];

function CTA({ children, variant = "primary", className = "" }) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan/70 focus:ring-offset-2 focus:ring-offset-night";
  const styles =
    variant === "primary"
      ? "bg-cyan text-night shadow-glow hover:-translate-y-0.5 hover:bg-white"
      : "border border-white/15 bg-white/5 text-white hover:border-cyan/60 hover:bg-cyan/10";

  return (
    <a href={formUrl} target="_blank" rel="noreferrer" className={`${base} ${styles} ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

function ProductMockup() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute inset-8 rounded-full bg-cyan/20 blur-3xl" />
      <div className="absolute inset-x-8 bottom-0 h-24 rounded-full bg-violet/20 blur-3xl" />
      <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur">
        <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] p-5">
          <div className="grid gap-4 sm:grid-cols-[1fr_0.8fr]">
            <div className="shirt-card group">
              <div className="shirt-neck" />
              <div className="shirt-sleeve left" />
              <div className="shirt-sleeve right" />
              <div className="relative z-10 flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
                <div className="rounded-full border border-cyan/35 bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
                  01 / Founder
                </div>
                <div className="shirt-mark">
                  <span>AI</span>
                  <span>CLUB</span>
                </div>
                <div className="h-px w-28 bg-gradient-to-r from-transparent via-cyan to-transparent" />
                <p className="max-w-40 text-xs uppercase leading-relaxed tracking-[0.2em] text-slate-300">
                  Premium heavyweight tee
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {collections.slice(0, 3).map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-white/10 bg-night/60 p-4"
                >
                  <div className={`mb-3 h-2 rounded-full bg-gradient-to-r ${item.palette}`} />
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    {item.month}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-white">{item.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{item.theme}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ kicker, title, children }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan">{kicker}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
        {title}
      </h2>
      {children && <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{children}</p>}
    </div>
  );
}

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-night text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_15%,rgba(98,232,255,0.18),transparent_32%),radial-gradient(circle_at_78%_20%,rgba(139,111,255,0.16),transparent_30%),linear-gradient(180deg,#05070d_0%,#090d18_46%,#05070d_100%)]" />
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-cyan/40 bg-cyan/10 text-sm font-black text-cyan">
            AI
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.26em] text-white">
            Shirt Club
          </span>
        </a>
        <CTA className="hidden sm:inline-flex">Join Waitlist</CTA>
      </nav>

      <section id="top" className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-5 pb-20 pt-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-200">
            <Sparkles className="h-4 w-4 text-cyan" aria-hidden="true" />
            Founder 100 waitlist now open
          </div>
          <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            AI Shirt Club
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-200 sm:text-2xl">
            One premium shirt. One exclusive collection. Every month.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            A collectible apparel membership built for AI engineers, builders, founders,
            and tech professionals who want their uniform to feel as intentional as their work.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CTA>Claim Founder Access</CTA>
            <CTA variant="secondary">View Monthly Drops</CTA>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
            {[
              ["100", "Founder spots"],
              ["12", "Annual drops"],
              ["0", "Generic merch"],
            ].map(([metric, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-2xl font-semibold text-white">{metric}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <ProductMockup />
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader kicker="Collection Preview" title="Designed like artifacts, made to be worn.">
            Each monthly release is a limited concept drop inspired by the culture of AI builders:
            launches, training runs, late nights, and clean systems.
          </SectionHeader>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {collections.map((item) => (
              <article key={item.name} className="group rounded-3xl border border-white/10 bg-ink p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan/45">
                <div className={`h-32 rounded-2xl bg-gradient-to-br ${item.palette} p-px shadow-glow`}>
                  <div className="flex h-full items-end rounded-2xl bg-night/80 p-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">
                        {item.month}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold">{item.name}</h3>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-400">{item.theme}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader kicker="Monthly Calendar" title="A fresh collection cadence for the whole year.">
            The membership is simple: one premium shirt each month, one cohesive design world,
            and first access for the people who joined early.
          </SectionHeader>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {[
              ["Month 1", "Founder Drop", "The first numbered release for early members.", Crown],
              ["Month 2", "Systems Drop", "Clean technical graphics with restrained luxury detailing.", Zap],
              ["Month 3", "Signal Drop", "A limited run built around high-contrast club marks.", CalendarDays],
            ].map(([month, title, copy, Icon]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <Icon className="h-6 w-6 text-cyan" aria-hidden="true" />
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                  {month}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white/[0.04] to-transparent py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan">
                Founder 100
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                The first hundred members get the best version of the club.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Founder members are treated like collectors from day one, with numbered status,
                locked pricing, and early influence on the drops that follow.
              </p>
              <CTA className="mt-8">Join Founder 100</CTA>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {founderBenefits.map((benefit, index) => {
                const icons = [Trophy, Lock, Timer, BadgeCheck, Star, PackageCheck];
                const Icon = icons[index];
                return (
                  <div key={benefit} className="rounded-3xl border border-white/10 bg-ink p-5">
                    <Icon className="h-5 w-5 text-cyan" aria-hidden="true" />
                    <p className="mt-5 text-base font-semibold text-white">{benefit}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader kicker="Pricing" title="Choose your monthly collector tier.">
            No checkout today, no account setup, no payment processing. Join the waitlist and
            we will invite members as the first collection opens.
          </SectionHeader>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {pricing.map((tier) => (
              <article
                key={tier.name}
                className={`relative rounded-3xl border p-6 ${
                  tier.highlight
                    ? "border-cyan/50 bg-cyan/[0.08] shadow-glow"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                {tier.highlight && (
                  <div className="absolute right-5 top-5 rounded-full bg-cyan px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-night">
                    Best entry
                  </div>
                )}
                <Gem className="h-6 w-6 text-cyan" aria-hidden="true" />
                <h3 className="mt-6 text-2xl font-semibold text-white">{tier.name}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-400">{tier.note}</p>
                <div className="mt-6 flex items-end gap-1">
                  <span className="text-5xl font-semibold tracking-tight text-white">{tier.price}</span>
                  <span className="pb-2 text-slate-400">/month</span>
                </div>
                <ul className="mt-7 space-y-3">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex gap-3 text-slate-300">
                      <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-cyan" aria-hidden="true" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <CTA className="mt-8 w-full" variant={tier.highlight ? "primary" : "secondary"}>
                  Join Waitlist
                </CTA>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-8 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(98,232,255,0.14),rgba(139,111,255,0.13)_45%,rgba(255,255,255,0.05))] p-8 text-center shadow-violet sm:p-14">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan">Final CTA</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Get on the list before the Founder 100 closes.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            Be first in line for premium monthly AI culture apparel, exclusive collection drops,
            and the earliest member benefits.
          </p>
          <CTA className="mt-8">Open Waitlist Form</CTA>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>AI Shirt Club</p>
        <p>Premium collectible apparel for AI builders.</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
