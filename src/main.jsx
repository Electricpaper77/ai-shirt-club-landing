import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ChevronDown,
  Crown,
  HelpCircle,
  Layers,
  Lock,
  PackageCheck,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  Trophy,
  Truck,
  Users,
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

const socialProof = [
  "AI engineers",
  "Startup founders",
  "ML platform teams",
  "Indie builders",
  "DevTool operators",
];

const gallery = [
  {
    name: "Token Black",
    label: "Founder 01",
    detail: "Heavyweight black base with luminous club mark.",
    tone: "cyan",
  },
  {
    name: "Gradient Descent",
    label: "Training 02",
    detail: "Subtle violet signal print for late build nights.",
    tone: "violet",
  },
  {
    name: "Inference Club",
    label: "Latency 03",
    detail: "Crisp cyan linework with premium collection trim.",
    tone: "emerald",
  },
];

const founderBenefits = [
  "Founding 100 member number",
  "Locked founding price",
  "Priority access to limited drops",
  "Annual collector badge",
  "Member-only design voting",
  "Early shipment window",
];

const testimonials = [
  {
    quote:
      "Finally, founder merch that feels intentional enough to wear outside a conference hall.",
    name: "AI founder",
    role: "Founding 100 preview",
  },
  {
    quote:
      "The monthly collection idea makes it feel more like a club artifact than another startup tee.",
    name: "ML engineer",
    role: "Waitlist member",
  },
  {
    quote:
      "Clean, technical, limited. Exactly the kind of uniform I want for demo days and build weeks.",
    name: "DevTools builder",
    role: "Early supporter",
  },
];

const faqs = [
  {
    question: "What is AI Shirt Club?",
    answer:
      "AI Shirt Club is a premium collectible apparel membership for AI engineers, builders, founders, and tech professionals. Each month centers on one premium shirt and one exclusive AI-culture collection.",
  },
  {
    question: "Who is it for?",
    answer:
      "It is for AI engineers, startup founders, indie builders, ML platform teams, DevTool operators, and tech professionals who want sharper apparel than generic conference merch.",
  },
  {
    question: "How much will it cost?",
    answer:
      "The Founding 100 waitlist reserves interest in limited founder access. Final membership pricing will be shared before launch, and this page does not process payment or start a subscription.",
  },
  {
    question: "When do collections launch?",
    answer:
      "Collections launch after the Founder100 validation list is built. Waitlist members will receive launch status, first-drop timing, and collection details by email.",
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

function ScarcityCounter({ compact = false }) {
  return (
    <div
      className={`rounded-3xl border border-cyan/25 bg-cyan/[0.07] ${
        compact ? "p-4" : "p-5"
      } shadow-glow`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
            1 of 100 Founder Spots Claimed
          </p>
          <p className="mt-2 text-sm text-slate-300">Limited founder access now open</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-semibold text-white">1/100</p>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500">claimed</p>
        </div>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[1%] min-w-2 rounded-full bg-gradient-to-r from-cyan to-violet" />
      </div>
    </div>
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

function MiniShirt({ item }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan/40">
      <div className={`mini-shirt ${item.tone}`}>
        <div className="mini-shirt-neck" />
        <div className="mini-shirt-mark">
          <span>{item.label}</span>
          <strong>{item.name}</strong>
        </div>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{item.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
    </article>
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

function FounderOffer() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 rounded-[2rem] border border-cyan/25 bg-[linear-gradient(135deg,rgba(98,232,255,0.12),rgba(255,255,255,0.04)_42%,rgba(139,111,255,0.1))] p-6 shadow-glow sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan">
            Founding 100
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Limited founder access for the first 100 validation members.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
              Reserve a Founder100 spot to signal demand, get first access to the first
              collection, and help shape the premium monthly apparel membership before public
              launch.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
                ["100", "Founder spots"],
                ["1", "Spot claimed"],
                ["0", "Payment today"],
            ].map(([metric, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-night/50 p-4">
                  <p className="text-3xl font-semibold text-white">{metric}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">
                    {label}
                  </p>
                </div>
            ))}
          </div>
            <CTA className="mt-8 w-full sm:w-auto">Reserve Founder Spot</CTA>
        </div>
        <div className="rounded-3xl border border-white/10 bg-night/70 p-5">
          <ScarcityCounter />
          <div className="mt-5 grid gap-3">
            {[
                "First access to the launch collection",
                "Founding 100 member number",
                "Priority invite before public membership",
                "Early input on future drops",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/[0.04] p-4">
                  <BadgeCheck className="h-5 w-5 flex-none text-cyan" aria-hidden="true" />
                  <p className="text-sm font-semibold text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-night pb-24 text-white sm:pb-20">
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
        <CTA className="hidden sm:inline-flex">Reserve Founder Spot</CTA>
      </nav>

      <section id="top" className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-200">
            <Sparkles className="h-4 w-4 text-cyan" aria-hidden="true" />
            1 of 100 Founder Spots Claimed
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
            <CTA>Reserve Founder Spot</CTA>
          </div>
          <div className="mt-8 max-w-2xl">
            <ScarcityCounter />
          </div>
          <div className="mt-5 grid max-w-2xl grid-cols-3 gap-3">
            {[
              ["100", "Founder spots"],
              ["1", "Spot claimed"],
              ["Open", "Launch status"],
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

      <section className="border-y border-white/10 bg-white/[0.025] py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Founding Members Joined", "1", Users],
              ["Waitlist Count", "Building now", BadgeCheck],
              ["Collection Launch Status", "Validation open", CalendarDays],
            ].map(([label, value, Icon]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <Icon className="h-5 w-5 text-cyan" aria-hidden="true" />
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                  {label}
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {socialProof.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
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
          <SectionHeader kicker="Collection Gallery" title="A collectible shirt system, not generic merch.">
            Every drop is designed as a premium object: restrained graphics, technical marks,
            and collection details that reward early members.
          </SectionHeader>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {gallery.map((item) => (
              <MiniShirt key={item.name} item={item} />
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
                Founding 100
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                The first hundred members get the best version of the club.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Founder members are treated like collectors from day one, with numbered status,
                limited founder access, and early influence on the drops that follow.
              </p>
              <CTA className="mt-8">Reserve Founder Spot</CTA>
              <div className="mt-6">
                <ScarcityCounter compact />
              </div>
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
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="rounded-[2rem] border border-white/10 bg-ink p-6 sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan/30 bg-cyan/10">
                <Sparkles className="h-6 w-6 text-cyan" aria-hidden="true" />
              </div>
              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.28em] text-cyan">
                Founder Story
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Built for people who live inside the next wave.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-slate-300">
              <p>
                AI Shirt Club started from a simple observation: the builders shaping AI culture
                deserve apparel that feels more collectible than conference swag.
              </p>
              <p>
                The club is designed around monthly artifacts: premium shirts with restrained
                technical graphics, launch-era references, and limited collection identity.
              </p>
              <p>
                Founder100 is the first circle. The goal is to build the membership with the
                people who understand why a great shirt can feel like a signal.
              </p>
              <CTA className="mt-3 w-full sm:w-auto">Reserve Founder Spot</CTA>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader kicker="Early Member Signals" title="The club already sounds like its people.">
            Placeholder testimonials for launch messaging, written for the builders the membership
            is designed to attract.
          </SectionHeader>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="rounded-3xl border border-white/10 bg-ink p-6"
              >
                <Quote className="h-6 w-6 text-cyan" aria-hidden="true" />
                <p className="mt-6 text-lg leading-8 text-slate-200">"{testimonial.quote}"</p>
                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{testimonial.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FounderOffer />

      <section className="bg-white/[0.025] py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <SectionHeader kicker="FAQ" title="Questions before you reserve a founder spot." />
          <div className="mt-12 divide-y divide-white/10 rounded-3xl border border-white/10 bg-ink">
            {faqs.map((faq) => (
              <details key={faq.question} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-left">
                  <span className="flex items-center gap-3 text-lg font-semibold text-white">
                    <HelpCircle className="h-5 w-5 flex-none text-cyan" aria-hidden="true" />
                    {faq.question}
                  </span>
                  <ChevronDown className="h-5 w-5 flex-none text-slate-500 transition group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-5 leading-8 text-slate-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-8 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(98,232,255,0.14),rgba(139,111,255,0.13)_45%,rgba(255,255,255,0.05))] p-8 text-center shadow-violet sm:p-14">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan">Final CTA</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Reserve your Founder100 spot before the first collection opens.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            Be first in line for premium monthly AI culture apparel, exclusive collection drops,
            and the earliest member benefits.
          </p>
          <CTA className="mt-8">Reserve Founder Spot</CTA>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:grid-cols-3 sm:px-8">
        {[
          ["No payment today", ShieldCheck],
          ["Premium monthly drop", Layers],
          ["Founder priority window", Truck],
        ].map(([label, Icon]) => (
          <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <Icon className="h-5 w-5 text-cyan" aria-hidden="true" />
            <p className="text-sm font-semibold text-slate-200">{label}</p>
          </div>
        ))}
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>AI Shirt Club</p>
        <p>Premium collectible apparel for AI builders.</p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-night/90 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">1 of 100 Founder Spots Claimed</p>
            <p className="truncate text-xs text-slate-400">Limited founder access is open</p>
          </div>
          <CTA className="min-h-11 shrink-0 px-4 sm:px-6">Reserve Founder Spot</CTA>
        </div>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
