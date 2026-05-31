import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  HelpCircle,
  Layers,
  Mail,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Users,
  WalletCards,
} from "lucide-react";
import "./styles.css";

const formUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLScmqVes2tnVy8L6Gq-v6hnhBbYTPfEH2JX4l1dNoLO_hvmzOw/viewform";

const collections = [
  {
    month: "Drop 01",
    name: "Token Black",
    palette: "from-cyan-300 to-blue-500",
    theme: "Launch-night graphics for AI builders.",
  },
  {
    month: "Drop 02",
    name: "Gradient Descent",
    palette: "from-violet-300 to-fuchsia-500",
    theme: "Training-run energy with restrained technical detail.",
  },
  {
    month: "Drop 03",
    name: "Inference Club",
    palette: "from-emerald-300 to-cyan-500",
    theme: "Low-latency marks and crisp collector identity.",
  },
  {
    month: "Drop 04",
    name: "Founder Stack",
    palette: "from-slate-100 to-cyan-300",
    theme: "The default uniform for people building the next layer.",
  },
];

const validationGoals = [
  {
    title: "Collect Emails",
    copy: "Build the first audience before ordering inventory.",
    icon: Mail,
  },
  {
    title: "Measure Willingness To Pay",
    copy: "Ask what price point feels real before promising a subscription.",
    icon: WalletCards,
  },
  {
    title: "Measure Collection Interest",
    copy: "Learn which design directions people actually want first.",
    icon: Layers,
  },
  {
    title: "Measure Founder Interest",
    copy: "Find out whether early members want founder status, voting, or simple access.",
    icon: Star,
  },
];

const founderBenefits = [
  "Early access before public launch",
  "Vote on first collection direction",
  "First look at pricing and shipping plan",
  "Optional founder number if the club launches",
  "No payment collected today",
  "Clear launch updates by email",
];

const validationRisks = [
  ["Subscription risk", "Monthly apparel may be too frequent. Validate whether buyers want monthly, quarterly, or drop-based releases."],
  ["Churn risk", "People may love the first shirt but not stay subscribed. Test if collection themes create repeat anticipation."],
  ["Manufacturing risk", "Quality, sizing, minimums, and delivery timelines can break trust. Do not sell until supplier confidence is high."],
  ["Pricing risk", "Premium shirts need enough margin after production, packaging, shipping, and returns. Measure real willingness to pay first."],
  ["Customer acquisition risk", "AI audiences are niche and expensive to reach. Validate organic founder demand before paid acquisition."],
  ["Retention risk", "The club needs identity and community, not just shirts. Test founder voting, collection reveals, and member status."],
];

const faqs = [
  {
    question: "What is AI Shirt Club?",
    answer:
      "AI Shirt Club is a proposed premium collectible apparel membership for AI engineers, builders, founders, and tech professionals. This page is validating demand before the first production run.",
  },
  {
    question: "Who is it for?",
    answer:
      "It is for people building, funding, operating, or obsessing over AI products who want apparel that feels more like a collectible signal than generic startup merch.",
  },
  {
    question: "How much will it cost?",
    answer:
      "Pricing is not final. The waitlist form is being used to learn what people would actually pay for a premium shirt membership before any subscription is launched.",
  },
  {
    question: "When do collections launch?",
    answer:
      "Collections launch only after demand, pricing, and manufacturing assumptions are validated. Waitlist members will get transparent updates before anything is sold.",
  },
];

function CTA({ children = "Reserve Founder Spot", variant = "primary", className = "" }) {
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
            <div className="shirt-card">
              <div className="shirt-neck" />
              <div className="shirt-sleeve left" />
              <div className="shirt-sleeve right" />
              <div className="relative z-10 flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
                <div className="rounded-full border border-cyan/35 bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
                  Validation Prototype
                </div>
                <div className="shirt-mark">
                  <span>AI</span>
                  <span>CLUB</span>
                </div>
                <div className="h-px w-28 bg-gradient-to-r from-transparent via-cyan to-transparent" />
                <p className="max-w-44 text-xs uppercase leading-relaxed tracking-[0.2em] text-slate-300">
                  Premium heavyweight concept
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {collections.slice(0, 3).map((item) => (
                <div key={item.name} className="rounded-2xl border border-white/10 bg-night/60 p-4">
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
      <div className={`mini-shirt ${item.name.includes("Gradient") ? "violet" : item.name.includes("Inference") ? "emerald" : "cyan"}`}>
        <div className="mini-shirt-neck" />
        <div className="mini-shirt-mark">
          <span>{item.month}</span>
          <strong>{item.name}</strong>
        </div>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{item.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{item.theme}</p>
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

function ValidationOffer() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 rounded-[2rem] border border-cyan/25 bg-[linear-gradient(135deg,rgba(98,232,255,0.12),rgba(255,255,255,0.04)_42%,rgba(139,111,255,0.1))] p-6 shadow-glow sm:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan">
              Founder Validation
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Help decide whether AI Shirt Club should exist.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              The form asks for your email, preferred collection direction, founder interest,
              and willingness to pay. That is the product right now: validated demand before
              inventory, subscriptions, or hype.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["No", "Payment today"],
                ["No", "Fake countdown"],
                ["Yes", "Founder feedback"],
              ].map(([metric, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-night/50 p-4">
                  <p className="text-3xl font-semibold text-white">{metric}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <CTA className="mt-8 w-full sm:w-auto" />
          </div>
          <div className="rounded-3xl border border-white/10 bg-night/70 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
              What We Need To Learn
            </p>
            <div className="mt-5 grid gap-3">
              {validationGoals.map(({ title, copy, icon: Icon }) => (
                <div key={title} className="flex gap-3 rounded-2xl bg-white/[0.04] p-4">
                  <Icon className="mt-1 h-5 w-5 flex-none text-cyan" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-400">{copy}</p>
                  </div>
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
        <CTA className="hidden sm:inline-flex" />
      </nav>

      <section id="top" className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-5 pb-16 pt-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-200">
            <Sparkles className="h-4 w-4 text-cyan" aria-hidden="true" />
            Validation page, not a checkout
          </div>
          <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Should AI Shirt Club exist?
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-200 sm:text-2xl">
            One premium AI-culture shirt. One collectible collection. Possibly every month.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            We are validating whether AI engineers, builders, founders, and tech professionals
            actually want a premium apparel membership before taking orders or manufacturing inventory.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <CTA />
            <CTA variant="secondary">Share Product Feedback</CTA>
          </div>
          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              ["Email", "Reserve interest"],
              ["Price", "Tell us WTP"],
              ["Drops", "Pick collections"],
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
        <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:px-8 md:grid-cols-3">
          {[
            ["Founding Members Joined", "Not published yet", Users],
            ["Waitlist Count", "Being measured", ClipboardCheck],
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
      </section>

      <ValidationOffer />

      <section className="border-y border-white/10 bg-white/[0.025] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader kicker="Collection Interest" title="Which collection would you actually want?">
            The first signal we need is not applause. It is which designs, themes, and drop cadence
            people would put money behind.
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
          <div className="mt-10 text-center">
            <CTA>Vote On Collections</CTA>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader kicker="Mockup Gallery" title="Enough fidelity to judge. Not a sales promise.">
            These are concept directions for validation. Final blanks, fit, artwork, and packaging
            depend on supplier testing and customer feedback.
          </SectionHeader>
          <div className="mt-12 grid gap-5 lg:grid-cols-4">
            {collections.map((item) => (
              <MiniShirt key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white/[0.04] to-transparent py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan">
                Founder Story
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                A club should earn trust before it asks for a subscription.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                AI Shirt Club started from a simple observation: AI builders have a distinct
                culture, but most tech apparel feels generic. The right version might be a premium
                collectible membership. The wrong version would be overbuilt inventory and forced subscriptions.
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                This page is here to validate demand honestly: who wants it, what they would pay,
                which collections resonate, and whether founder access matters.
              </p>
              <CTA className="mt-8" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {founderBenefits.map((benefit, index) => {
                const icons = [BadgeCheck, CalendarDays, WalletCards, Star, ShieldCheck, PackageCheck];
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
          <SectionHeader kicker="YC-Style Risk Check" title="The hard questions we need answered." />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {validationRisks.map(([title, copy]) => (
              <article key={title} className="rounded-3xl border border-white/10 bg-ink p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan">{title}</p>
                <p className="mt-4 leading-7 text-slate-300">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/[0.025] py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <SectionHeader kicker="FAQ" title="Clear answers before you share interest." />
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
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan">Validation CTA</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Tell us if this should become a real membership.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            Reserve interest, pick collection directions, share willingness to pay, and tell us
            whether founder access matters to you.
          </p>
          <CTA className="mt-8" />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:grid-cols-3 sm:px-8">
        {[
          ["No payment today", ShieldCheck],
          ["No fake scarcity", BadgeCheck],
          ["Transparent validation", Truck],
        ].map(([label, Icon]) => (
          <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <Icon className="h-5 w-5 text-cyan" aria-hidden="true" />
            <p className="text-sm font-semibold text-slate-200">{label}</p>
          </div>
        ))}
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>AI Shirt Club</p>
        <p>Validating premium collectible apparel for AI builders.</p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-night/90 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Help validate AI Shirt Club</p>
            <p className="truncate text-xs text-slate-400">Email, WTP, collection interest, founder interest</p>
          </div>
          <CTA className="min-h-11 shrink-0 px-4 sm:px-6" />
        </div>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
