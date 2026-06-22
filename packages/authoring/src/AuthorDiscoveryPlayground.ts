import { authorOrchestrationPaths } from "./AuthorOrchestrationPaths.js";
import { pedagogicalUseCatalog } from "./PedagogicalUseCatalog.js";
import { representationPaths } from "./RepresentationPaths.js";
import type { AuthorOrchestrationPath } from "./AuthorOrchestrationPath.js";
import type { PedagogicalUse } from "./PedagogicalUse.js";
import type { RepresentationPath } from "./RepresentationPath.js";

export interface AuthorDiscoveryIntent {
  id: string;
  label: string;
  description: string;
  pedagogicalUseIds: readonly string[];
}

export interface AuthorDiscoveryExample {
  id: string;
  title: string;
  source: string;
  intentId: string;
  pedagogicalUseId: string;
  summary: string;
  representationReading: string;
}

export interface AuthorDiscoveryUseView {
  use: PedagogicalUse;
  path?: RepresentationPath;
  orchestrationPath?: AuthorOrchestrationPath;
  examples: readonly AuthorDiscoveryExample[];
  confidence: RepresentationConfidence;
}

export type RepresentationConfidenceLevel =
  | "ready"
  | "plausible"
  | "missing-bridge";

export interface RepresentationConfidence {
  level: RepresentationConfidenceLevel;
  label: "READY" | "PLAUSIBLE" | "MISSING BRIDGE";
  badge: string;
  reasons: readonly string[];
}

export interface AuthorCoverageStats {
  ready: number;
  plausible: number;
  missingBridge: number;
}

export const authorDiscoveryIntents = [
  {
    id: "notice",
    label: "Help learners notice something",
    description:
      "Start here when learners need to observe, recognize, or become aware of something before being corrected.",
    pedagogicalUseIds: [
      "reflect-through-selection",
      "diagnose-through-selection",
      "reflect-through-typing"
    ]
  },
  {
    id: "reflect",
    label: "Help learners reflect",
    description:
      "Start here when the response is meaningful because it reveals a learner's thinking, habit, strategy, or position.",
    pedagogicalUseIds: ["reflect-through-selection", "reflect-through-typing"]
  },
  {
    id: "recall",
    label: "Help learners recall",
    description:
      "Start here when learners should retrieve something before seeing the answer or choosing from options.",
    pedagogicalUseIds: ["recall-through-typing"]
  },
  {
    id: "apply",
    label: "Help learners apply",
    description:
      "Start here when learners should use knowledge in a situation where the response has to work in context.",
    pedagogicalUseIds: ["apply-through-situated-task"]
  },
  {
    id: "classify",
    label: "Help learners classify",
    description:
      "Start here when learners need to sort, group, or distinguish examples. V0 points to nearby uses, but a dedicated path is still missing.",
    pedagogicalUseIds: [
      "diagnose-through-selection",
      "practice-through-controlled-interaction",
      "explore-before-rule"
    ]
  },
  {
    id: "produce",
    label: "Help learners produce",
    description:
      "Start here when learners need to generate language, recall a target, or express a response.",
    pedagogicalUseIds: [
      "recall-through-typing",
      "reflect-through-typing",
      "apply-through-situated-task"
    ]
  },
  {
    id: "compare",
    label: "Help learners compare",
    description:
      "Start here when learners need to select, contrast, or explain differences between examples or habits.",
    pedagogicalUseIds: [
      "reflect-through-selection",
      "diagnose-through-selection",
      "explore-before-rule"
    ]
  }
] as const satisfies readonly AuthorDiscoveryIntent[];

export const authorDiscoveryExamples = [
  {
    id: "thinking-in-english-reflect-selection",
    title: "Thinking in English",
    source: "Boost'English corpus",
    intentId: "reflect",
    pedagogicalUseId: "reflect-through-selection",
    summary:
      "Learners select statements about whether they translate mentally before speaking.",
    representationReading:
      "Intent: help learners reflect. Pedagogical Use: Reflect Through Selection. RepresentationPath: selection -> non-evaluative -> completed."
  },
  {
    id: "memorising-vocabulary-recall-typing",
    title: "Memorising Vocabulary",
    source: "Boost'English corpus",
    intentId: "recall",
    pedagogicalUseId: "recall-through-typing",
    summary:
      "Learners retrieve a vocabulary item from a cue before comparing with an expected target.",
    representationReading:
      "Intent: help learners recall. Pedagogical Use: Recall Through Typing. RepresentationPath: typing -> existing evaluator -> success / partial / failed."
  },
  {
    id: "wayfinding-apply-situated-task",
    title: "Wayfinding",
    source: "Boost'English corpus",
    intentId: "apply",
    pedagogicalUseId: "apply-through-situated-task",
    summary:
      "Learners use language to give directions that should function in a concrete navigation situation.",
    representationReading:
      "Intent: help learners apply. Pedagogical Use: Apply Through Situated Task. RepresentationPath: situated response -> context-dependent evaluation."
  },
  {
    id: "countable-uncountable-explore-before-rule",
    title: "Countable / Uncountable — I Learn",
    source: "Boost'English corpus",
    intentId: "notice",
    pedagogicalUseId: "explore-before-rule",
    summary:
      "Learners observe concrete noun examples, compare them, infer a distinction, then stabilize the countable / uncountable rule before practice.",
    representationReading:
      "Intent: help learners discover before explanation. Pedagogical Use: Explore Before The Rule. Author Orchestration Path: observe -> compare -> infer -> stabilize -> practice."
  }
] as const satisfies readonly AuthorDiscoveryExample[];

const pathByUseId = new Map<string, RepresentationPath>(
  representationPaths.map((path) => [path.pedagogicalUseId, path])
);

const orchestrationPathByUseId = new Map<string, AuthorOrchestrationPath>(
  authorOrchestrationPaths.map((path) => [path.pedagogicalUseId, path])
);

const useById = new Map<string, PedagogicalUse>(
  pedagogicalUseCatalog.map((use) => [use.id, use])
);

const representationConfidenceByUseId: Record<string, RepresentationConfidence> = {
  "reflect-through-selection": {
    level: "ready",
    label: "READY",
    badge: "READY",
    reasons: [
      "RepresentationPath documented",
      "Real corpus example available",
      "BHE concepts identified"
    ]
  },
  "diagnose-through-selection": {
    level: "plausible",
    label: "PLAUSIBLE",
    badge: "PLAUSIBLE",
    reasons: [
      "RepresentationPath documented",
      "Evaluation depends on activity use",
      "No dedicated playground example yet"
    ]
  },
  "recall-through-typing": {
    level: "ready",
    label: "READY",
    badge: "READY",
    reasons: [
      "RepresentationPath documented",
      "Existing evaluator identified",
      "Real corpus example available"
    ]
  },
  "reflect-through-typing": {
    level: "plausible",
    label: "PLAUSIBLE",
    badge: "PLAUSIBLE",
    reasons: [
      "RepresentationPath documented",
      "Non-evaluative result identified",
      "Carrier vocabulary remains imperfect"
    ]
  },
  "apply-through-situated-task": {
    level: "ready",
    label: "READY",
    badge: "READY",
    reasons: [
      "RepresentationPath documented",
      "Real corpus example available",
      "Context-dependent evaluation made explicit"
    ]
  },
  "practice-through-controlled-interaction": {
    level: "plausible",
    label: "PLAUSIBLE",
    badge: "PLAUSIBLE",
    reasons: [
      "Interaction shapes exist",
      "Several BHE pipelines already cover practice cases",
      "No single documented RepresentationPath yet"
    ]
  },
  "explore-before-rule": {
    level: "plausible",
    label: "PLAUSIBLE",
    badge: "PLAUSIBLE",
    reasons: [
      "AuthorOrchestrationPath documented",
      "Several steps map to existing BHE concepts",
      "Stabilize remains authoring-only"
    ]
  }
};

export function getRepresentationConfidenceForUse(
  pedagogicalUseId: string
): RepresentationConfidence {
  return (
    representationConfidenceByUseId[pedagogicalUseId] ?? {
      level: "missing-bridge",
      label: "MISSING BRIDGE",
      badge: "MISSING BRIDGE",
      reasons: ["Author need identified", "No documented path found"]
    }
  );
}

export function getAuthorCoverageStats(): AuthorCoverageStats {
  return pedagogicalUseCatalog.reduce<AuthorCoverageStats>(
    (stats, use) => {
      const confidence = getRepresentationConfidenceForUse(use.id);

      if (confidence.level === "ready") {
        return { ...stats, ready: stats.ready + 1 };
      }

      if (confidence.level === "plausible") {
        return { ...stats, plausible: stats.plausible + 1 };
      }

      return { ...stats, missingBridge: stats.missingBridge + 1 };
    },
    { ready: 0, plausible: 0, missingBridge: 0 }
  );
}

export function getAuthorDiscoveryUsesForIntent(
  intentId: string
): readonly AuthorDiscoveryUseView[] {
  const intent = authorDiscoveryIntents.find((item) => item.id === intentId);

  if (!intent) {
    return [];
  }

  return intent.pedagogicalUseIds.flatMap((pedagogicalUseId) => {
    const use = useById.get(pedagogicalUseId);

    if (!use) {
      return [];
    }

    const path = pathByUseId.get(pedagogicalUseId);
    const orchestrationPath = orchestrationPathByUseId.get(pedagogicalUseId);
    const view = {
      use,
      examples: authorDiscoveryExamples.filter(
        (example) => example.pedagogicalUseId === pedagogicalUseId
      ),
      confidence: getRepresentationConfidenceForUse(pedagogicalUseId),
      ...(orchestrationPath ? { orchestrationPath } : {}),
      ...(path ? { path } : {})
    };

    return [view];
  });
}

export function renderAuthorDiscoveryPlayground(root: HTMLElement): void {
  let selectedIntentId: string = authorDiscoveryIntents[0]?.id ?? "";
  let selectedUseId =
    getAuthorDiscoveryUsesForIntent(selectedIntentId)[0]?.use.id ?? "";

  const render = (): void => {
    const selectedIntent = authorDiscoveryIntents.find(
      (intent) => intent.id === selectedIntentId
    );
    const useViews = getAuthorDiscoveryUsesForIntent(selectedIntentId);
    const selectedUseView =
      useViews.find((view) => view.use.id === selectedUseId) ?? useViews[0];

    root.replaceChildren();
    root.className = "author-discovery-playground";

    const title = document.createElement("h1");
    title.textContent = "Author Discovery Playground V0.2";

    const subtitle = document.createElement("p");
    subtitle.className = "adp-subtitle";
    subtitle.textContent =
      "Start from what learners should do, then discover how BHE can represent it.";

    const coverage = renderCoverage(getAuthorCoverageStats());

    const layout = document.createElement("div");
    layout.className = "adp-layout";

    const intentPanel = renderIntentPanel(selectedIntentId);
    const usePanel = renderUsePanel(useViews, selectedUseView?.use.id);
    const detailPanel = renderDetailPanel(selectedIntent, selectedUseView);

    layout.append(intentPanel, usePanel, detailPanel);
    root.append(title, subtitle, coverage, layout);

    intentPanel.addEventListener("click", (event) => {
      const button = (event.target as Element).closest<HTMLButtonElement>(
        "button[data-intent-id]"
      );

      if (!button) {
        return;
      }

      selectedIntentId = button.dataset.intentId ?? selectedIntentId;
      selectedUseId =
        getAuthorDiscoveryUsesForIntent(selectedIntentId)[0]?.use.id ?? "";
      render();
    });

    usePanel.addEventListener("click", (event) => {
      const button = (event.target as Element).closest<HTMLButtonElement>(
        "button[data-use-id]"
      );

      if (!button) {
        return;
      }

      selectedUseId = button.dataset.useId ?? selectedUseId;
      render();
    });
  };

  render();
}

function renderIntentPanel(selectedIntentId: string): HTMLElement {
  const panel = document.createElement("section");
  panel.className = "adp-panel";

  const heading = document.createElement("h2");
  heading.textContent = "1. I want to...";
  panel.append(heading);

  for (const intent of authorDiscoveryIntents) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.intentId = intent.id;
    button.className =
      intent.id === selectedIntentId ? "adp-card is-selected" : "adp-card";
    button.textContent = intent.label;
    panel.append(button);
  }

  return panel;
}

function renderCoverage(stats: AuthorCoverageStats): HTMLElement {
  const section = document.createElement("section");
  section.className = "adp-coverage";

  const heading = document.createElement("h2");
  heading.textContent = "Author Coverage";

  const ready = document.createElement("span");
  ready.className = "adp-coverage-item is-ready";
  ready.textContent = `READY: ${stats.ready}`;

  const plausible = document.createElement("span");
  plausible.className = "adp-coverage-item is-plausible";
  plausible.textContent = `PLAUSIBLE: ${stats.plausible}`;

  const missing = document.createElement("span");
  missing.className = "adp-coverage-item is-missing";
  missing.textContent = `MISSING BRIDGE: ${stats.missingBridge}`;

  section.append(heading, ready, plausible, missing);
  return section;
}

function renderUsePanel(
  useViews: readonly AuthorDiscoveryUseView[],
  selectedUseId?: string
): HTMLElement {
  const panel = document.createElement("section");
  panel.className = "adp-panel";

  const heading = document.createElement("h2");
  heading.textContent = "2. Pedagogical Uses";
  panel.append(heading);

  for (const view of useViews) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.useId = view.use.id;
    button.className =
      view.use.id === selectedUseId ? "adp-card is-selected" : "adp-card";

    const label = document.createElement("span");
    label.className = "adp-card-title";
    label.textContent = view.use.label;

    const description = document.createElement("span");
    description.textContent = view.use.description;

    const pathStatus = document.createElement("span");
    pathStatus.className = `adp-pill ${getConfidenceClass(view.confidence)}`;
    pathStatus.textContent = view.confidence.badge;

    button.append(label, description, pathStatus);
    panel.append(button);
  }

  return panel;
}

function renderDetailPanel(
  selectedIntent: AuthorDiscoveryIntent | undefined,
  selectedUseView: AuthorDiscoveryUseView | undefined
): HTMLElement {
  const panel = document.createElement("section");
  panel.className = "adp-panel adp-detail";

  const heading = document.createElement("h2");
  heading.textContent = "3. Representation discovery";
  panel.append(heading);

  if (!selectedIntent || !selectedUseView) {
    const empty = document.createElement("p");
    empty.textContent = "Choose an intent to begin.";
    panel.append(empty);
    return panel;
  }

  panel.append(
    renderBlock("Intent", selectedIntent.label, selectedIntent.description),
    renderBlock(
      "Pedagogical Use",
      selectedUseView.use.label,
      selectedUseView.use.description
    ),
    renderConfidence(selectedUseView.confidence)
  );

  if (selectedUseView.path) {
    panel.append(renderPath(selectedUseView.path, selectedUseView.use.label));
  } else if (selectedUseView.orchestrationPath) {
    panel.append(renderOrchestrationPath(selectedUseView.orchestrationPath));
  } else {
    const missing = document.createElement("div");
    missing.className = "adp-warning";
    missing.textContent =
      "This use is discoverable in the catalog, but V0 has no RepresentationPath for it yet. That gap is intentional: the playground should reveal missing bridges instead of hiding them.";
    panel.append(missing);
  }

  panel.append(renderExamples(selectedUseView.examples));

  return panel;
}

function renderConfidence(confidence: RepresentationConfidence): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block adp-confidence";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "Representation Confidence";

  const badge = document.createElement("p");
  badge.className = `adp-confidence-badge ${getConfidenceClass(confidence)}`;
  badge.textContent = confidence.badge;

  const why = document.createElement("h3");
  why.textContent = "Why?";

  const reasons = document.createElement("ul");
  reasons.className = "adp-notes";

  for (const reason of confidence.reasons) {
    const item = document.createElement("li");
    item.textContent = reason;
    reasons.append(item);
  }

  block.append(label, badge, why, reasons);
  return block;
}

function getConfidenceClass(confidence: RepresentationConfidence): string {
  if (confidence.level === "ready") {
    return "is-ready";
  }

  if (confidence.level === "plausible") {
    return "is-plausible";
  }

  return "is-missing";
}

function renderBlock(label: string, title: string, body: string): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const small = document.createElement("p");
  small.className = "adp-label";
  small.textContent = label;

  const heading = document.createElement("h3");
  heading.textContent = title;

  const text = document.createElement("p");
  text.textContent = body;

  block.append(small, heading, text);
  return block;
}

function renderPath(path: RepresentationPath, useLabel: string): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "RepresentationPath";

  const steps = document.createElement("ol");
  steps.className = "adp-path";

  const evaluation =
    path.evaluation.kind === "existing-evaluator"
      ? `Existing evaluator: ${path.evaluation.evaluator}`
      : path.evaluation.kind;

  const values: readonly (readonly [string, string])[] = [
    ["Pedagogical Use", useLabel],
    ["Interaction Shape", `${path.interaction.suggestedShape} interaction`],
    [
      "InteractionData",
      path.interaction.interactionDataType ??
        "No dedicated InteractionData identified"
    ],
    ["UserInput", path.input.type],
    ["Evaluation Policy", evaluation],
    [
      "BHEResult",
      path.result.statuses.map((status) => `BHEResult.${status}`).join(" / ")
    ]
  ];

  for (const [stepLabel, value] of values) {
    const item = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = stepLabel;
    const span = document.createElement("span");
    span.textContent = value;
    item.append(strong, span);
    steps.append(item);
  }

  const notes = document.createElement("ul");
  notes.className = "adp-notes";

  for (const note of path.authorNotes) {
    const item = document.createElement("li");
    item.textContent = note;
    notes.append(item);
  }

  block.append(label, steps, notes);
  return block;
}

function renderOrchestrationPath(path: AuthorOrchestrationPath): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "Author Orchestration Path";

  const heading = document.createElement("h3");
  heading.textContent = path.title;

  const description = document.createElement("p");
  description.textContent = path.description;

  const corpus = document.createElement("p");
  corpus.className = "adp-example-reading";
  corpus.textContent = `${path.relatedCorpusExample.title}: ${path.relatedCorpusExample.whyThisExample}`;

  const steps = document.createElement("ol");
  steps.className = "adp-orchestration";

  for (const step of path.steps) {
    const item = document.createElement("li");

    const stepTitle = document.createElement("h4");
    stepTitle.textContent = step.label;

    const purpose = document.createElement("p");
    purpose.textContent = step.authorPurpose;

    const mapping = document.createElement("dl");
    mapping.className = "adp-step-mapping";

    const rows: readonly (readonly [string, string])[] = [
      ["Cognitive operation", step.cognitiveOperation],
      ["Suggested Pedagogical Use", step.suggestedPedagogicalUse],
      [
        "RepresentationPath",
        step.representationPathId ?? "No single documented RepresentationPath"
      ],
      ["Possible BHE representation", step.bheMapping.possibleRepresentation],
      ["InteractionData", step.bheMapping.interactionData ?? "Not fixed yet"],
      ["UserInput", step.bheMapping.userInput ?? "Not fixed yet"],
      ["Evaluation policy", step.evaluationPolicy],
      ["Result semantics", step.resultSemantics]
    ];

    for (const [term, detail] of rows) {
      const dt = document.createElement("dt");
      dt.textContent = term;
      const dd = document.createElement("dd");
      dd.textContent = detail;
      mapping.append(dt, dd);
    }

    const notes = document.createElement("ul");
    notes.className = "adp-notes";

    for (const note of step.notes) {
      const noteItem = document.createElement("li");
      noteItem.textContent = note;
      notes.append(noteItem);
    }

    item.append(stepTitle, purpose, mapping, notes);
    steps.append(item);
  }

  const limitationsTitle = document.createElement("h4");
  limitationsTitle.textContent = "Limitations";

  const limitations = document.createElement("ul");
  limitations.className = "adp-notes";

  for (const limitation of path.limitations) {
    const item = document.createElement("li");
    item.textContent = limitation;
    limitations.append(item);
  }

  block.append(
    label,
    heading,
    description,
    corpus,
    steps,
    limitationsTitle,
    limitations
  );
  return block;
}

function renderExamples(
  examples: readonly AuthorDiscoveryExample[]
): HTMLElement {
  const block = document.createElement("div");
  block.className = "adp-block";

  const label = document.createElement("p");
  label.className = "adp-label";
  label.textContent = "4. Real Boost'English example";
  block.append(label);

  if (examples.length === 0) {
    const empty = document.createElement("p");
    empty.textContent =
      "No real corpus example is attached to this path in V0.";
    block.append(empty);
    return block;
  }

  for (const example of examples) {
    const heading = document.createElement("h3");
    heading.textContent = example.title;

    const summary = document.createElement("p");
    summary.textContent = example.summary;

    const reading = document.createElement("p");
    reading.className = "adp-example-reading";
    reading.textContent = example.representationReading;

    block.append(heading, summary, reading);
  }

  return block;
}

const defaultRoot =
  typeof document === "undefined"
    ? null
    : document.getElementById("author-discovery-playground");

if (defaultRoot) {
  renderAuthorDiscoveryPlayground(defaultRoot);
}
