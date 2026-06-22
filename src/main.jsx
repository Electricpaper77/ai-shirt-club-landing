import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CalendarDays,
  ChevronDown,
  CheckCircle2,
  ClipboardCheck,
  FileJson,
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
import { concepts } from "./data/concepts";
import "./styles.css";

const VALIDATION_SURVEY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScmqVes2tnVy8L6Gq-v6hnhBbYTPfEH2JX4l1dNoLO_hvmzOw/viewform";

// Google Forms stores prefilled values through entry.xxxxx field IDs.
// Plain query params are URL-only and may not appear in responses.
// Google Forms entry IDs are placeholder values and must be replaced before production deployment.
const GOOGLE_FORM_ENTRIES = {
  month: "entry.PASTE_REAL_MONTH_ID",
  collection: "entry.PASTE_REAL_COLLECTION_ID",
  category: "entry.PASTE_REAL_CATEGORY_ID",
  intent: "entry.PASTE_REAL_INTENT_ID",
  source: "entry.PASTE_REAL_SOURCE_ID",
};

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

const roadmapCollections = concepts.map((concept) => ({ ...concept, name: concept.collection }));

const voteStorageKey = "ai-shirt-club-roadmap-votes";
const collectionFilters = ["All", "AI Infrastructure", "Agents", "Cyber", "Founder"];
const conceptViewKeys = ["front", "back", "detail"];

function buildSurveyUrl(queryParams = {}) {
  const [urlWithoutHash, hash = ""] = VALIDATION_SURVEY_URL.split("#");
  const [baseUrl, existingQuery = ""] = urlWithoutHash.split("?");
  const searchParams = new URLSearchParams(existingQuery);

  Object.entries(queryParams).forEach(([key, value]) => {
    searchParams.set(key, value);
  });

  const queryString = searchParams.toString();
  const urlWithQuery = queryString ? `${baseUrl}?${queryString}` : baseUrl;

  return hash ? `${urlWithQuery}#${hash}` : urlWithQuery;
}

function buildConceptSurveyUrl(item) {
  const month = item.month.toLowerCase();
  const category = item.category.toLowerCase();

  return buildSurveyUrl({
    [GOOGLE_FORM_ENTRIES.month]: month,
    [GOOGLE_FORM_ENTRIES.collection]: item.slug,
    [GOOGLE_FORM_ENTRIES.category]: category,
    [GOOGLE_FORM_ENTRIES.intent]: "vote",
    [GOOGLE_FORM_ENTRIES.source]: "calendar",
    debug_month: month,
    debug_collection: item.slug,
    debug_category: category,
  });
}

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
  "Feedback before launch",
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

const cyberReliabilityChecks = [
  {
    title: "Prompt Injection Defense",
    copy: "Flags instructions that try to override system intent, policy, or trusted context before an agent acts.",
    icon: ShieldCheck,
  },
  {
    title: "PII Redaction",
    copy: "Detects sensitive personal data and routes responses through redact or escalate paths when needed.",
    icon: Users,
  },
  {
    title: "Unsafe Action Blocking",
    copy: "Stops risky tool use, permission jumps, and irreversible actions until a safer decision is available.",
    icon: XCircle,
  },
  {
    title: "Citation Grounding",
    copy: "Checks whether customer-facing answers cite the evidence they depend on instead of presenting guesses.",
    icon: ClipboardCheck,
  },
  {
    title: "Hallucination Risk Scoring",
    copy: "Scores answer risk so reviewers can see where uncertainty, missing evidence, or unsupported claims remain.",
    icon: AlertTriangle,
  },
  {
    title: "JSONL Audit Replay",
    copy: "Keeps replayable request, decision, and outcome records for reviewing eval failures and judging regressions.",
    icon: FileJson,
  },
];

const cyberDecisionFlow = [
  "User Request",
  "Agent Response",
  "Cyber Guardrails",
  "Reliability Score",
  "Allow / Block / Escalate",
];

const cyberReliabilityMetrics = [
  ["145+", "passing tests"],
  ["87%", "eval pass rate"],
  ["18% to 6%", "hallucination risk reduction"],
  ["p95", "eval latency tracked"],
  ["JSONL", "audit logs generated"],
];

const cyberScenarioCards = [
  {
    title: "Prompt injection attempt",
    outcome: "BLOCK",
    copy: "The guardrail rejects hidden instructions that ask the agent to ignore trusted policy or reveal private context.",
    icon: XCircle,
    tone: "text-rose-300",
  },
  {
    title: "PII leakage attempt",
    outcome: "REDACT / ESCALATE",
    copy: "Sensitive fields are removed from the draft answer, then routed for review when confidence is not high enough.",
    icon: AlertTriangle,
    tone: "text-amber-200",
  },
  {
    title: "Grounded customer answer with citation",
    outcome: "ALLOW",
    copy: "The response is supported by cited source material and clears the reliability threshold for customer use.",
    icon: CheckCircle2,
    tone: "text-emerald-300",
  },
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
    <a href={VALIDATION_SURVEY_URL} target="_blank" rel="noreferrer" className={`${base} ${styles} ${className}`}>
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

function ConceptPattern({ category }) {
  if (category === "Founder") {
    return (
      <div className="concept-pattern founder-pattern" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  }

  if (category === "Agents") {
    return (
      <div className="concept-pattern agents-pattern" aria-hidden="true">
        <span>system</span>
        <span>tool.call</span>
        <span>observe</span>
      </div>
    );
  }

  if (category === "Cyber") {
    return (
      <div className="concept-pattern cyber-pattern" aria-hidden="true">
        {["PASS", "FAIL", "SCORE", "DEPLOY"].map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    );
  }

  return (
    <div className="concept-pattern infra-pattern" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

function ConceptPlaceholder({ item, viewKey, view }) {
  const viewClass = "concept-shirt-" + viewKey;
  const patternClass = "pattern-" + view.fallbackPattern;

  return (
    <div
      className={"concept-shirt " + viewClass + " " + patternClass}
      data-fallback="css-concept-preview"
    >
      <div className="concept-neck" />
      <ConceptPattern category={item.category} />
      {viewKey === "front" && (
        <div className="concept-front-mark">
          <span>{view.label}</span>
          <strong>{item.front}</strong>
        </div>
      )}
      {viewKey === "back" && (
        <div className="concept-back-print">
          <span>Back print direction</span>
          <strong>{item.back}</strong>
          <em>{item.month} collector mark</em>
        </div>
      )}
      {viewKey === "detail" && (
        <div className="concept-detail-study">
          {["Prompt marks", "Collector badge", "Typography system", "Pattern study"].map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      )}
    </div>
  );
}

const conceptTrustLabels = [
  "AI concept preview — final production artwork may vary.",
  "No live inventory claims.",
  "No checkout or payment is active.",
  "Monthly concepts are roadmap previews for validation.",
];

function ConceptTrustLabels({ className = "" }) {
  return (
    <div className={"concept-trust-labels " + className} aria-label="Concept preview trust notes">
      {conceptTrustLabels.map((label) => (
        <span key={label}>{label}</span>
      ))}
    </div>
  );
}

function ConceptPreview({ item, activeViewKey, loading = "lazy", fetchPriority }) {
  const activeView = item.views[activeViewKey];
  const [imageFailed, setImageFailed] = useState(false);
  const categoryClass = item.category.toLowerCase().replace(/\s+/g, "-");
  const shouldRenderImage = Boolean(activeView.imagePath && !imageFailed);
  const showFallback = !shouldRenderImage;

  useEffect(() => {
    setImageFailed(false);
  }, [activeView.imagePath, activeViewKey]);

  return (
    <div
      className={"concept-preview " + categoryClass}
      style={{ "--accent": item.color }}
      data-has-image-fallback="true"
    >
      <div className={"concept-visual-frame " + (shouldRenderImage ? "has-image" : "")} data-active-view={activeViewKey}>
        {showFallback && <ConceptPlaceholder item={item} view={activeView} viewKey={activeViewKey} />}
        {shouldRenderImage && (
          <img
            src={activeView.imagePath}
            alt={activeView.alt}
            className="concept-preview-image is-loaded"
            loading={loading}
            decoding="async"
            fetchPriority={fetchPriority}
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
      <p className="concept-view-caption">{activeView.caption}</p>
      <p className="mt-2 text-[11px] leading-5 text-slate-500">
        AI concept preview &mdash; final production artwork may vary.
      </p>
    </div>
  );
}

function ConceptPosterPreview({ item, priority = false }) {
  const [imageFailed, setImageFailed] = useState(false);
  const posterView = {
    ...item.views.front,
    imagePath: item.posterPath,
    alt: "AI concept poster preview for " + item.month + " — " + item.name,
    caption: "Poster concept — Founding Drop #001 visual system",
  };
  const categoryClass = item.category.toLowerCase().replace(/\s+/g, "-");
  const shouldRenderImage = Boolean(item.posterPath && !imageFailed);

  useEffect(() => {
    setImageFailed(false);
  }, [item.posterPath]);

  return (
    <div
      className={"concept-preview founding-poster-preview " + categoryClass}
      style={{ "--accent": item.color }}
      data-has-image-fallback="true"
    >
      <div className={"concept-visual-frame " + (shouldRenderImage ? "has-image" : "")} data-active-view="poster">
        {!shouldRenderImage && <ConceptPlaceholder item={item} view={item.views.front} viewKey="front" />}
        {shouldRenderImage && (
          <img
            src={item.posterPath}
            alt={posterView.alt}
            className="concept-preview-image is-loaded"
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : undefined}
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
      <p className="concept-view-caption">{posterView.caption}</p>
      <p className="mt-2 text-[11px] leading-5 text-slate-500">
        AI concept preview &mdash; final production artwork may vary.
      </p>
    </div>
  );
}

function FoundingDropShowcase({ item, onOpen360, onConceptVote }) {
  const [activeViewKey, setActiveViewKey] = useState("front");
  const surveyUrl = buildConceptSurveyUrl(item);
  const showcaseViews = [
    ...conceptViewKeys.map((viewKey) => ({ key: viewKey, label: item.views[viewKey].label })),
    { key: "poster", label: "Poster" },
  ];

  return (
    <section className="founding-showcase" aria-labelledby="founding-drop-title">
      <div className="founding-showcase-poster">
        <p className="founding-showcase-kicker">Founding Drop concept</p>
        <ConceptPosterPreview item={item} priority />
      </div>

      <div className="founding-showcase-panel">
        <p className="founding-showcase-kicker">360 Visual Concept</p>
        <h3 id="founding-drop-title">Founding Drop #001 &mdash; Token Black</h3>
        <p className="founding-showcase-subtitle">
          A 360 visual concept for a premium AI-designed collector shirt.
        </p>
        <p className="founding-showcase-trust">
          AI concept preview &mdash; final production artwork may vary.
        </p>

        <div className="founding-showcase-tabs" role="group" aria-label="Token Black showcase views">
          {showcaseViews.map((view) => (
            <button
              key={view.key}
              type="button"
              className={"concept-view-toggle " + (activeViewKey === view.key ? "is-active" : "")}
              data-cta="founding-drop-view-toggle"
              data-month={item.month.toLowerCase()}
              data-collection={item.slug}
              data-view={view.key}
              aria-pressed={activeViewKey === view.key}
              onClick={() => setActiveViewKey(view.key)}
            >
              {view.label}
            </button>
          ))}
        </div>

        <div className="founding-showcase-preview">
          {activeViewKey === "poster" ? (
            <ConceptPosterPreview item={item} />
          ) : (
            <ConceptPreview item={item} activeViewKey={activeViewKey} />
          )}
        </div>

        <div className="founding-showcase-notes">
          {[
            "Built around radial token geometry, cyan micro-grid marks, and founder-edition typography.",
            "Visual system uses polar-grid symmetry, modular construction lines, and collector badge motifs.",
            "Designed as a human-curated AI concept preview before production validation.",
          ].map((note) => (
            <p key={note}>{note}</p>
          ))}
        </div>

        <ConceptTrustLabels />

        <div className="founding-showcase-actions">
          <button
            type="button"
            className="concept-360-button"
            data-cta="open-360-concept"
            data-month={item.month.toLowerCase()}
            data-collection={item.slug}
            onClick={() => onOpen360(item)}
          >
            View 360 Concept
          </button>
          <a
            href={surveyUrl}
            target="_blank"
            rel="noreferrer"
            className="founding-vote-link"
            data-cta="founding-drop-vote"
            data-month={item.month.toLowerCase()}
            data-collection={item.slug}
            data-category={item.category.toLowerCase()}
            onClick={() => onConceptVote(item.id)}
          >
            Vote for Token Black
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          {/* True 3D should be lazy-loaded only when a real .glb asset exists. */}
          {item.modelPath && (
            <a
              href={item.modelPath}
              target="_blank"
              rel="noreferrer"
              className="founding-model-link"
              data-cta="view-spatial-concept"
              data-month={item.month.toLowerCase()}
              data-collection={item.slug}
            >
              View Spatial Concept
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function Concept360Modal({ item, onClose, onConceptVote }) {
  const [activeViewKey, setActiveViewKey] = useState("front");
  const closeButtonRef = useRef(null);
  const surveyUrl = buildConceptSurveyUrl(item);

  useEffect(() => {
    setActiveViewKey("front");
  }, [item.id]);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="concept-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="concept-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`concept-modal-title-${item.id}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="concept-modal-header">
          <div>
            <p className="concept-modal-kicker">360 Visual Concept</p>
            <h3 id={`concept-modal-title-${item.id}`} className="concept-modal-title">
              {item.month} — {item.name}
            </h3>
            <p className="concept-modal-subtitle">
              AI concept preview — final production artwork may vary.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="concept-modal-close"
            aria-label="Close 360 concept modal"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="concept-modal-meta">
          <span>{item.category}</span>
          <span>Status: {item.status}</span>
        </div>

        <div className="concept-modal-grid">
          <div>
            <div className="concept-modal-tabs" role="group" aria-label={`${item.name} modal views`}>
              {conceptViewKeys.map((viewKey) => {
                const view = item.views[viewKey];
                const isActive = activeViewKey === viewKey;

                return (
                  <button
                    key={viewKey}
                    type="button"
                    className={"concept-view-toggle " + (isActive ? "is-active" : "")}
                    data-cta="concept-modal-view-toggle"
                    data-month={item.month.toLowerCase()}
                    data-collection={item.slug}
                    data-view={viewKey}
                    aria-pressed={isActive}
                    onClick={() => setActiveViewKey(viewKey)}
                  >
                    {view.label}
                  </button>
                );
              })}
            </div>
            <div className="concept-modal-visual">
              <ConceptPreview item={item} activeViewKey={activeViewKey} />
            </div>
          </div>

          <div className="concept-modal-details">
            <div className="concept-modal-stat-grid">
              <p>
                <span>Front text</span>
                <strong>{item.front}</strong>
              </p>
              <p>
                <span>Back text</span>
                <strong>{item.back}</strong>
              </p>
            </div>
            <div>
              <span className="concept-modal-label">Theme</span>
              <p>{item.theme}</p>
            </div>
            <div>
              <span className="concept-modal-label">Design logic</span>
              <p>{item.designLogic}</p>
            </div>
            <a
              href={surveyUrl}
              target="_blank"
              rel="noreferrer"
              className="concept-modal-vote"
              data-cta="calendar-concept-vote"
              data-month={item.month.toLowerCase()}
              data-collection={item.slug}
              data-category={item.category.toLowerCase()}
              onClick={() => onConceptVote(item.id)}
            >
              Vote for This Concept
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function ConceptCard({ item, onConceptVote, onOpen360 }) {
  const [activeViewKey, setActiveViewKey] = useState("front");
  const surveyUrl = buildConceptSurveyUrl(item);

  return (
    <article className="group flex flex-col rounded-3xl border border-white/10 bg-ink p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            {item.month}
          </p>
          <h4 className="mt-1 text-2xl font-semibold text-white">{item.name}</h4>
        </div>
        <span className="rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan">
          {item.category}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2" role="group" aria-label={item.name + " preview views"}>
        {conceptViewKeys.map((viewKey) => {
          const view = item.views[viewKey];
          const isActive = activeViewKey === viewKey;

          return (
            <button
              key={viewKey}
              type="button"
              className={"concept-view-toggle " + (isActive ? "is-active" : "")}
              data-cta="concept-view-toggle"
              data-month={item.month.toLowerCase()}
              data-collection={item.slug}
              data-view={viewKey}
              aria-pressed={isActive}
              aria-label={"Show " + view.label.toLowerCase() + " view for " + item.name}
              onClick={() => setActiveViewKey(viewKey)}
            >
              {view.label}
            </button>
          );
        })}
      </div>

      <ConceptPreview item={item} activeViewKey={activeViewKey} />

      <div className="mt-5 grid gap-3 text-sm leading-6 text-slate-300">
        <div className="grid grid-cols-2 gap-3">
          <p className="rounded-2xl bg-white/[0.04] p-3">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Front Text
            </span>
            <span className="mt-1 block font-semibold text-white">{item.front}</span>
          </p>
          <p className="rounded-2xl bg-white/[0.04] p-3">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Back Text
            </span>
            <span className="mt-1 block font-semibold text-white">{item.back}</span>
          </p>
        </div>
        <p>{item.theme}</p>
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-slate-400">
          <span className="font-semibold uppercase tracking-[0.16em] text-cyan">Design logic:</span>{" "}
          {item.designLogic}
        </p>
      </div>

      <details className="group mt-4 border-t border-white/10 pt-4">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 transition hover:text-cyan">
          View Design Log
          <ChevronDown className="h-4 w-4 transition group-open:rotate-180" aria-hidden="true" />
        </summary>
        <dl className="mt-3 grid gap-3 text-sm leading-6 text-slate-400">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
              Prompt direction
            </dt>
            <dd className="mt-1">{item.promptDirection}</dd>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Front text
              </dt>
              <dd className="mt-1 font-semibold text-white">{item.front}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Back text
              </dt>
              <dd className="mt-1 font-semibold text-white">{item.back}</dd>
            </div>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
              Design logic
            </dt>
            <dd className="mt-1">{item.designLogic}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
              Status
            </dt>
            <dd className="mt-1">{item.status}</dd>
          </div>
        </dl>
      </details>

      <button
        type="button"
        className="concept-360-button"
        data-cta="open-360-concept"
        data-month={item.month.toLowerCase()}
        data-collection={item.slug}
        onClick={() => onOpen360(item)}
      >
        View 360 Concept
      </button>

      <a
        href={surveyUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan px-5 text-sm font-semibold text-night transition duration-300 hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan/70 focus:ring-offset-2 focus:ring-offset-night"
        data-cta="calendar-concept-vote"
        data-month={item.month.toLowerCase()}
        data-collection={item.slug}
        data-category={item.category.toLowerCase()}
        onClick={() => onConceptVote(item.id)}
      >
        Vote for This Concept
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </article>
  );
}

function ConceptCalendar({ onConceptVote }) {
  const [activeModalConcept, setActiveModalConcept] = useState(null);
  const foundingDrop = roadmapCollections[0];

  return (
    <>
      <div className="mt-14 rounded-[2rem] border border-white/10 bg-night/45 p-5 sm:p-6 lg:p-8">
        <FoundingDropShowcase
          item={foundingDrop}
          onOpen360={setActiveModalConcept}
          onConceptVote={onConceptVote}
        />

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan">
              Product Preview Calendar
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              12-Month Concept Calendar
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
              AI-generated visual previews for each monthly AI Shirt Club drop.
            </p>
          </div>
          <ConceptTrustLabels className="lg:max-w-md" />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {roadmapCollections.map((item) => (
            <ConceptCard
              key={item.id}
              item={item}
              onConceptVote={onConceptVote}
              onOpen360={setActiveModalConcept}
            />
          ))}
        </div>
      </div>

      {activeModalConcept && (
        <Concept360Modal
          item={activeModalConcept}
          onClose={() => setActiveModalConcept(null)}
          onConceptVote={onConceptVote}
        />
      )}
    </>
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

  // Local vote counts are demo-only until connected to persistent storage.
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

  function handleConceptCalendarVote(collectionId) {
    handleVote(collectionId, "wear");
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

        <ConceptCalendar onConceptVote={handleConceptCalendarVote} />

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
              <h3 className="mt-2 text-2xl font-semibold text-white">
                Concept Specs / Collector Roadmap
              </h3>
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

function AgenticCyberReliabilityLayer() {
  return (
    <section className="border-y border-white/10 bg-white/[0.025] py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          kicker="Agentic Cyber Reliability Layer"
          title="Guardrails, evals, and replayable evidence for agent behavior."
        >
          A recruiter-facing and judge-facing snapshot of how an AI workflow can be screened
          before an answer is allowed, blocked, or escalated.
        </SectionHeader>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {cyberReliabilityChecks.map(({ title, copy, icon: Icon }) => (
            <article key={title} className="rounded-3xl border border-white/10 bg-ink p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 flex-none place-items-center rounded-2xl border border-cyan/30 bg-cyan/10">
                  <Icon className="h-5 w-5 text-cyan" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">{copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-ink p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
                Visual Decision Flow
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                From request to allow, block, or escalation.
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              The layer is presented as an eval pattern and audit trail, not a production
              security certification.
            </p>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-5">
            {cyberDecisionFlow.map((step, index) => (
              <div key={step} className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Step {index + 1}
                </p>
                <p className="mt-3 min-h-12 text-base font-semibold leading-6 text-white">{step}</p>
                {index < cyberDecisionFlow.length - 1 && (
                  <ArrowRight
                    className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 rounded-full border border-cyan/30 bg-night p-1 text-cyan md:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-white/10 bg-ink p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
              Sample Metrics
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Eval snapshot for review.</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {cyberReliabilityMetrics.map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-3xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {cyberScenarioCards.map(({ title, outcome, copy, icon: Icon, tone }) => (
              <article key={title} className="rounded-3xl border border-white/10 bg-ink p-6">
                <Icon className={`h-6 w-6 ${tone}`} aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
                <p className={`mt-4 text-xs font-semibold uppercase tracking-[0.18em] ${tone}`}>
                  {outcome}
                </p>
                <p className="mt-4 text-sm leading-6 text-slate-400">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
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
                ["No", "Sales pitch"],
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
            Validation page, not a storefront
          </div>
          <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            AI Shirt Club Concept Showcase
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-200 sm:text-2xl">
            Twelve premium AI-culture collections. One roadmap to validate what should ship first.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            We are validating whether AI engineers, builders, founders, and tech professionals
            actually want a premium apparel membership before selling or manufacturing inventory.
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

      <AgenticCyberReliabilityLayer />
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
          ["Feedback only", ShieldCheck],
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
