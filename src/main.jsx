import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
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
  XCircle,
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

const roadmapCollections = [
  {
    id: "jan",
    month: "January",
    name: "Token Black",
    category: "Founder",
    color: "#62e8ff",
    front: "AI CLUB",
    back: "TOKEN 01",
    specs: ["260 GSM heavyweight cotton", "Oversized fit", "Premium screen print", "Limited release numbering", "Black base with cyan signal ink"],
  },
  {
    id: "feb",
    month: "February",
    name: "Gradient Descent",
    category: "AI Infrastructure",
    color: "#8b6fff",
    front: "GD",
    back: "LOSS CURVE",
    specs: ["260 GSM heavyweight cotton", "Oversized fit", "Premium screen print", "Limited release numbering", "Subtle violet graph print"],
  },
  {
    id: "mar",
    month: "March",
    name: "Inference Club",
    category: "AI Infrastructure",
    color: "#34d399",
    front: "RUN",
    back: "LOW LATENCY",
    specs: ["260 GSM heavyweight cotton", "Oversized fit", "Premium screen print", "Limited release numbering", "Back server trace graphic"],
  },
  {
    id: "apr",
    month: "April",
    name: "Founder Stack",
    category: "Founder",
    color: "#eaf4ff",
    front: "STACK",
    back: "BUILD LOG",
    specs: ["260 GSM heavyweight cotton", "Oversized fit", "Premium screen print", "Limited release numbering", "Founder vote edition marker"],
  },
  {
    id: "may",
    month: "May",
    name: "Model Merge",
    category: "AI Infrastructure",
    color: "#f0abfc",
    front: "MERGE",
    back: "BRANCH // MAIN",
    specs: ["260 GSM heavyweight cotton", "Oversized fit", "Premium screen print", "Limited release numbering", "Back branch map"],
  },
  {
    id: "jun",
    month: "June",
    name: "Prompt Ops",
    category: "Agents",
    color: "#facc15",
    front: "OPS",
    back: "SYSTEM MSG",
    specs: ["260 GSM heavyweight cotton", "Oversized fit", "Premium screen print", "Limited release numbering", "Back prompt block layout"],
  },
  {
    id: "jul",
    month: "July",
    name: "Vector Search",
    category: "AI Infrastructure",
    color: "#38bdf8",
    front: "KNN",
    back: "EMBEDDED",
    specs: ["260 GSM heavyweight cotton", "Oversized fit", "Premium screen print", "Limited release numbering", "Back coordinate field"],
  },
  {
    id: "aug",
    month: "August",
    name: "Agent Mode",
    category: "Agents",
    color: "#a78bfa",
    front: "AGENT",
    back: "TOOL CALL",
    specs: ["260 GSM heavyweight cotton", "Oversized fit", "Premium screen print", "Limited release numbering", "Back tool-call receipt"],
  },
  {
    id: "sep",
    month: "September",
    name: "Eval Night",
    category: "Cyber",
    color: "#fb7185",
    front: "EVAL",
    back: "PASS / FAIL",
    specs: ["260 GSM heavyweight cotton", "Oversized fit", "Premium screen print", "Limited release numbering", "Back benchmark table"],
  },
  {
    id: "oct",
    month: "October",
    name: "Synthetic Data",
    category: "AI Infrastructure",
    color: "#2dd4bf",
    front: "SYN",
    back: "DATASET 10",
    specs: ["260 GSM heavyweight cotton", "Oversized fit", "Premium screen print", "Limited release numbering", "Back dataset stamp"],
  },
  {
    id: "nov",
    month: "November",
    name: "Open Weights",
    category: "Founder",
    color: "#c084fc",
    front: "OPEN",
    back: "WEIGHTS",
    specs: ["260 GSM heavyweight cotton", "Oversized fit", "Premium screen print", "Limited release numbering", "Purple-white collector label"],
  },
  {
    id: "dec",
    month: "December",
    name: "Ship Week",
    category: "Cyber",
    color: "#ffffff",
    front: "SHIP",
    back: "DEPLOYED",
    specs: ["260 GSM heavyweight cotton", "Oversized fit", "Premium screen print", "Limited release numbering", "Back release checklist"],
  },
];

const voteStorageKey = "ai-shirt-club-roadmap-votes";
const collectionFilters = ["All", "AI Infrastructure", "Agents", "Cyber", "Founder"];

const apparelSpecs = [
  "260 GSM heavyweight cotton",
  "Oversized fit",
  "Premium screen print",
  "Limited release numbering",
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

const validationQuestions = [
  {
    question: "Frequency preference",
    prompt: "Would you rather buy one-time drops, quarterly collections, or a monthly membership?",
    why: "Tests subscription risk and whether the buying cadence should be drop-based.",
    icon: CalendarDays,
  },
  {
    question: "Budget preference",
    prompt: "What would you realistically pay for one premium AI Shirt Club release?",
    why: "Tests willingness to pay before manufacturing or subscription promises.",
    icon: WalletCards,
  },
  {
    question: "Collection ranking",
    prompt: "Rank Token Black, Gradient Descent, Inference Club, and Founder Stack.",
    why: "Reveals which creative direction deserves the first production test.",
    icon: Layers,
  },
  {
    question: "Why would you subscribe?",
    prompt: "Tell us what would make this worth joining repeatedly.",
    why: "Identifies retention hooks: identity, quality, exclusivity, voting, or community.",
    icon: Star,
  },
  {
    question: "Why would you cancel?",
    prompt: "Tell us what would make you stop buying or avoid subscribing.",
    why: "Finds churn drivers before they become operational problems.",
    icon: XCircle,
  },
];

const dashboardMetrics = [
  ["Email conversion rate", "Form submits / unique landing page visitors", "Primary demand signal"],
  ["Qualified founder interest", "% who select founder access or early membership", "Founder collection signal"],
  ["Willingness to pay", "% choosing $59+ and $75+", "Pricing power"],
  ["Frequency preference", "Drop vs quarterly vs monthly split", "Subscription risk"],
  ["Top collection score", "Weighted rank by collection theme", "First drop direction"],
  ["Cancellation themes", "Top coded reasons from free-text answers", "Retention risk"],
];

const goNoGoThresholds = [
  ["Go", "100+ email responses, 35%+ choose $59+, 25%+ choose founder access, one collection wins by 15+ points."],
  ["Narrow test", "50-99 responses or mixed pricing signal. Run a one-time preorder, not subscription."],
  ["No-Go", "Under 50 responses, under 20% at $59+, no clear collection winner, or cancellation reasons cluster around price/frequency."],
];

const breakEvenAssumptions = [
  ["One-time founder drop", "$75 price, $27-31 variable cost, $2,000 fixed creative/sample budget, break-even around 45 units."],
  ["Premium one-time drop", "$59 price, $25-29 variable cost, $1,500 fixed budget, break-even around 50 units."],
  ["Subscription", "$49 monthly, $20-28 contribution depending on supplier, break-even requires 75+ active subscribers plus low CAC."],
];

const retentionAssumptions = [
  ["One-time drops", "Expect 30-45% of buyers to express interest in the next drop."],
  ["Quarterly membership", "Expect 8-12% monthly-equivalent churn if collection quality is strong."],
  ["Monthly subscription", "Expect 15-25% monthly churn until retention hooks are proven."],
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

function CTA({ children = "Answer Validation Survey", variant = "primary", className = "" }) {
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

function loadRoadmapVotes() {
  const emptyVotes = roadmapCollections.reduce((acc, item) => {
    acc[item.id] = { wear: 0, buy: 0 };
    return acc;
  }, {});

  if (typeof window === "undefined") {
    return emptyVotes;
  }

  try {
    const savedVotes = JSON.parse(window.localStorage.getItem(voteStorageKey) || "{}");
    return roadmapCollections.reduce((acc, item) => {
      acc[item.id] = {
        wear: Number(savedVotes[item.id]?.wear || 0),
        buy: Number(savedVotes[item.id]?.buy || 0),
      };
      return acc;
    }, {});
  } catch {
    return emptyVotes;
  }
}

function RoadmapMockup({ item }) {
  return (
    <div className="roadmap-mockups" style={{ "--accent": item.color }}>
      <div className="roadmap-shirt front">
        <span>Front</span>
        <strong>{item.front}</strong>
      </div>
      <div className="roadmap-shirt back">
        <span>Back</span>
        <strong>{item.back}</strong>
      </div>
    </div>
  );
}

function CollectionRoadmap() {
  const [activeId, setActiveId] = useState(roadmapCollections[0].id);
  const [activeFilter, setActiveFilter] = useState("All");
  const [votes, setVotes] = useState(loadRoadmapVotes);

  const activeCollection = roadmapCollections.find((item) => item.id === activeId);
  const filteredCollections =
    activeFilter === "All"
      ? roadmapCollections
      : roadmapCollections.filter((item) => item.category === activeFilter);
  const leaderboard = useMemo(
    () =>
      [...roadmapCollections].sort((a, b) => {
        const bScore = (votes[b.id]?.wear || 0) + (votes[b.id]?.buy || 0) * 2;
        const aScore = (votes[a.id]?.wear || 0) + (votes[a.id]?.buy || 0) * 2;
        return bScore - aScore;
      }),
    [votes],
  );
  const topCollection = leaderboard[0];
  const totalWearVotes = roadmapCollections.reduce((sum, item) => sum + (votes[item.id]?.wear || 0), 0);
  const totalBuyVotes = roadmapCollections.reduce((sum, item) => sum + (votes[item.id]?.buy || 0), 0);
  const mostWantedScore = (votes[topCollection.id]?.wear || 0) + (votes[topCollection.id]?.buy || 0) * 2;
  const categoryScores = collectionFilters
    .filter((filter) => filter !== "All")
    .map((category) => ({
      category,
      score: roadmapCollections
        .filter((item) => item.category === category)
        .reduce((sum, item) => sum + (votes[item.id]?.wear || 0) + (votes[item.id]?.buy || 0) * 2, 0),
    }))
    .sort((a, b) => b.score - a.score);

  function handleVote(collectionId, voteType) {
    setActiveId(collectionId);
    setVotes((currentVotes) => {
      const nextVotes = {
        ...currentVotes,
        [collectionId]: {
          wear: Number(currentVotes[collectionId]?.wear || 0),
          buy: Number(currentVotes[collectionId]?.buy || 0),
          [voteType]: Number(currentVotes[collectionId]?.[voteType] || 0) + 1,
        },
      };
      window.localStorage.setItem(voteStorageKey, JSON.stringify(nextVotes));
      return nextVotes;
    });
  }

  return (
    <section className="border-y border-white/10 bg-white/[0.025] py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-2 text-sm font-semibold text-cyan">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Help Decide What Ships First
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              2027 Collection Roadmap
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Vote on concept collections before production exists. Demo votes stay in this
              browser so the page can show what a live validation loop could feel like.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-ink p-5 lg:min-w-80">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
              Most Wanted Collection
            </p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-2xl font-semibold text-white">{topCollection.name}</p>
                <p className="mt-1 text-sm text-slate-400">{topCollection.month}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-semibold text-white">
                  {(votes[topCollection.id]?.wear || 0) + (votes[topCollection.id]?.buy || 0) * 2}
                </p>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">score</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {collectionFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeFilter === filter
                  ? "border-cyan bg-cyan text-night"
                  : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan/50 hover:text-white"
              }`}
              onClick={() => {
                setActiveFilter(filter);
                const nextCollection =
                  filter === "All"
                    ? roadmapCollections[0]
                    : roadmapCollections.find((item) => item.category === filter);
                if (nextCollection) {
                  setActiveId(nextCollection.id);
                }
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-12 overflow-x-auto pb-5">
          <div className="flex min-w-max gap-4">
            {filteredCollections.map((item) => {
              const isActive = item.id === activeId;
              return (
                <article
                  key={item.id}
                  className={`w-80 shrink-0 cursor-pointer rounded-3xl border p-4 transition duration-300 ${
                    isActive
                      ? "border-cyan/60 bg-cyan/[0.08] shadow-glow"
                      : "border-white/10 bg-ink hover:border-cyan/35"
                  }`}
                  onClick={() => setActiveId(item.id)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                        {item.month}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold text-white">{item.name}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
                        {item.category}
                      </p>
                    </div>
                    <span
                      className="h-6 w-6 rounded-full border border-white/20"
                      style={{ backgroundColor: item.color }}
                      aria-label={`${item.name} color swatch`}
                    />
                  </div>
                  <RoadmapMockup item={item} />
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-white transition hover:border-cyan/50 hover:bg-cyan/10"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleVote(item.id, "wear");
                      }}
                    >
                      Would Wear {votes[item.id]?.wear || 0}
                    </button>
                    <button
                      type="button"
                      className="rounded-full bg-cyan px-3 py-2 text-sm font-semibold text-night transition hover:bg-white"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleVote(item.id, "buy");
                      }}
                    >
                      Would Buy {votes[item.id]?.buy || 0}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-ink p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
              Expanded Technical Specs
            </p>
            <h3 className="mt-3 text-3xl font-semibold text-white">{activeCollection.name}</h3>
            <p className="mt-2 text-slate-400">{activeCollection.month} concept direction</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan">
              {activeCollection.category}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {activeCollection.specs.map((spec) => (
                <div key={spec} className="flex gap-3 rounded-2xl bg-white/[0.04] p-4">
                  <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-cyan" aria-hidden="true" />
                  <p className="text-sm leading-6 text-slate-300">{spec}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-ink p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
              Collection Leaderboard
            </p>
            <div className="mt-5 grid gap-3">
              {leaderboard.slice(0, 5).map((item, index) => (
                <div key={item.id} className="flex items-center justify-between gap-4 rounded-2xl bg-white/[0.04] p-4">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {index + 1}. {item.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{item.month}</p>
                  </div>
                  <p className="text-sm font-semibold text-cyan">
                    W {votes[item.id]?.wear || 0} / B {votes[item.id]?.buy || 0}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-white/10 bg-ink p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
              Collection Vote Analytics
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["Would Wear", totalWearVotes],
                ["Would Buy", totalBuyVotes],
                ["Most Wanted Score", mostWantedScore],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-white/[0.04] p-4">
                  <p className="text-3xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-400">
              Top category: <span className="font-semibold text-white">{categoryScores[0]?.category}</span>
              {" "}with {categoryScores[0]?.score || 0} weighted points.
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink">
            <div className="border-b border-white/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
                Collection Comparison Table
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Roadmap Concepts</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.16em] text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Month</th>
                    <th className="px-5 py-4">Collection</th>
                    <th className="px-5 py-4">Category</th>
                    <th className="px-5 py-4">Front</th>
                    <th className="px-5 py-4">Back</th>
                    <th className="px-5 py-4">Votes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-slate-300">
                  {roadmapCollections.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.03]">
                      <td className="px-5 py-4">{item.month}</td>
                      <td className="px-5 py-4 font-semibold text-white">{item.name}</td>
                      <td className="px-5 py-4">{item.category}</td>
                      <td className="px-5 py-4">{item.front}</td>
                      <td className="px-5 py-4">{item.back}</td>
                      <td className="px-5 py-4">
                        W {votes[item.id]?.wear || 0} / B {votes[item.id]?.buy || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApparelSpecs() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader kicker="Premium Apparel Specs" title="The baseline every concept has to earn.">
          These are target specs for the concept showcase. Final production still depends on
          sample testing, supplier quality, and validation demand.
        </SectionHeader>
        <div className="mt-12 grid gap-5 md:grid-cols-4">
          {apparelSpecs.map((spec) => (
            <div key={spec} className="rounded-3xl border border-white/10 bg-ink p-6 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-cyan/30 bg-cyan/10">
                <BadgeCheck className="h-6 w-6 text-cyan" aria-hidden="true" />
              </div>
              <p className="mt-5 text-lg font-semibold text-white">{spec}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
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

function ValidationQuestions() {
  return (
    <section className="border-y border-white/10 bg-white/[0.025] py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader kicker="Validation Questions" title="Five answers matter more than a waitlist number.">
          The Google Form should capture these questions so each response teaches something
          about cadence, price, creative direction, retention, and churn.
        </SectionHeader>
        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          {validationQuestions.map(({ question, prompt, why, icon: Icon }) => (
            <article key={question} className="rounded-3xl border border-white/10 bg-ink p-5">
              <Icon className="h-6 w-6 text-cyan" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold text-white">{question}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{prompt}</p>
              <p className="mt-5 border-t border-white/10 pt-4 text-xs uppercase leading-5 tracking-[0.14em] text-slate-500">
                {why}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <CTA>Answer The 5 Questions</CTA>
        </div>
      </div>
    </section>
  );
}

function DashboardRecommendations() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader kicker="Google Sheets Dashboard" title="Run the company from response quality, not vanity signups.">
          Connect the Google Form to Google Sheets, add a coded-analysis tab, and review the
          dashboard weekly before changing product, pricing, or cadence.
        </SectionHeader>
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-ink p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-cyan" aria-hidden="true" />
              <h3 className="text-2xl font-semibold text-white">Most Important Metrics</h3>
            </div>
            <div className="mt-6 grid gap-3">
              {dashboardMetrics.map(([metric, formula, reason]) => (
                <div key={metric} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-semibold text-white">{metric}</p>
                  <p className="mt-2 text-sm text-slate-400">{formula}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-cyan">{reason}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5">
            <div className="rounded-3xl border border-white/10 bg-ink p-6">
              <h3 className="text-2xl font-semibold text-white">Go / No-Go Thresholds</h3>
              <div className="mt-5 grid gap-3">
                {goNoGoThresholds.map(([status, rule]) => (
                  <div key={status} className="rounded-2xl bg-white/[0.04] p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan">{status}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{rule}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-ink p-6">
              <h3 className="text-2xl font-semibold text-white">Sheet Setup</h3>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
                <li>Responses tab: raw Google Form answers.</li>
                <li>Coding tab: normalize budget, frequency, collection rank, subscribe reason, cancel reason.</li>
                <li>Dashboard tab: pivot tables, charts, and decision thresholds.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AssumptionsSection() {
  return (
    <section className="border-y border-white/10 bg-white/[0.025] py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader kicker="Operating Assumptions" title="The numbers to beat before launch." />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-ink p-6">
            <h3 className="text-2xl font-semibold text-white">Break-Even Assumptions</h3>
            <div className="mt-6 grid gap-3">
              {breakEvenAssumptions.map(([model, assumption]) => (
                <div key={model} className="rounded-2xl bg-white/[0.04] p-4">
                  <p className="font-semibold text-white">{model}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{assumption}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-ink p-6">
            <h3 className="text-2xl font-semibold text-white">Retention Assumptions</h3>
            <div className="mt-6 grid gap-3">
              {retentionAssumptions.map(([model, assumption]) => (
                <div key={model} className="rounded-2xl bg-white/[0.04] p-4">
                  <p className="font-semibold text-white">{model}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{assumption}</p>
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
            AI Shirt Club Concept Showcase
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-200 sm:text-2xl">
            Twelve premium AI-culture collections. One roadmap to validate what should ship first.
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
      <ValidationQuestions />
      <CollectionRoadmap />
      <ApparelSpecs />

      <section className="py-20">
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

      <DashboardRecommendations />

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

      <AssumptionsSection />

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
          <CTA className="mt-8">Answer Validation Survey</CTA>
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
          <CTA className="min-h-11 shrink-0 px-4 sm:px-6">Answer Survey</CTA>
        </div>
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
