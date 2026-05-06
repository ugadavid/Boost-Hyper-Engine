// packages/renderer/ActivityRenderer.ts
import { DragDropActivityModel } from "../core/models/DragDropActivityModel.js";
import type { ActivityMetadata } from "../core/types/ActivityMetadata.js";
import type { DragDropData } from "../core/types/DragDropData.js";

/** Types style (alignés sur /style/drag-drop.style.json) */
type Unit = "px" | "%" | "rem" | string;
type Align = "left" | "center" | "right";

type TargetStyle = {
  x: number; y: number; unit?: Unit; width?: number; align?: Align;
};
type ItemStyle = {
  x: number; y: number; unit?: Unit; fontSize?: string; backgroundColor?: string;
};

type StyleJSON = {
  layout?: "manual" | "horizontal" | "vertical";
  targets?: Record<string, TargetStyle>;
  items?: Record<string, ItemStyle>;
  global?: {
    fontFamily?: string;
    fontSize?: string;
    accentColor?: string;
    borderRadius?: string;
    animation?: string;
  };
};

type BheJSON = {
  type: "drag-drop";
  title: string;
  instructions?: string;
  data: DragDropData;
  feedback?: { correct?: string; partial?: string; wrong?: string };
  meta?: Record<string, unknown>;
};

/** Utilitaires */
const el = <K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
};

const applyGlobalStyles = (root: HTMLElement, style?: StyleJSON["global"]) => {
  if (!style) return;
  if (style.fontFamily) root.style.setProperty("--bhe-font", style.fontFamily);
  if (style.fontSize)   root.style.setProperty("--bhe-font-size", style.fontSize);
  if (style.accentColor) root.style.setProperty("--bhe-accent", style.accentColor);
  if (style.borderRadius) root.style.setProperty("--bhe-radius", style.borderRadius);
};

/** Renderer principal pour DragDrop */
export class DragDropRenderer {
  private container: HTMLElement;
  private model: DragDropActivityModel;
  private style: StyleJSON | undefined;

  /** état courant: itemId -> targetId (si placé) */
  private placed: Record<string, string | null> = {};
  /** cible occupée -> itemId */
  private occupied: Record<string, string | null> = {};

  constructor(container: HTMLElement, bhe: BheJSON, style?: StyleJSON) {
    this.container = container;
    this.style = style;

    const meta: ActivityMetadata = {
      id: bhe.meta?.["id"] as string ?? crypto.randomUUID(),
      title: bhe.title,
      language: "und",
      createdAt: new Date().toISOString(),
      author: (bhe.meta?.["author"] as string) ?? "",   // si requis
      level: (bhe.meta?.["level"] as string) ?? "",     // ← défaut vide si requis
      tags: (bhe.meta?.["tags"] as string[]) ?? []      // si requis, mets []
    };
    this.model = new DragDropActivityModel(meta, bhe.data);

    // init état
    for (const it of bhe.data.items) this.placed[it.id] = null;
    for (const tg of bhe.data.targets) this.occupied[tg.id] = null;
  }

  render() {
    this.container.innerHTML = "";
    this.container.classList.add("bhe-root");
    this.injectBaseCSS();
    applyGlobalStyles(this.container, this.style?.global);

    // Header
    const header = el("div", "bhe-header");
    const title = el("h2", "bhe-title", this.model.metadata.title);
    const instr = el("p", "bhe-instructions", (this as any).model?.data?.instructions ?? "");
    header.append(title);
    if (instr.textContent) header.append(instr);

    // Zones : scene (targets + items), tray (items non placés), actions
    const scene = el("div", "bhe-scene");
    const tray  = el("div", "bhe-tray");
    const actions = el("div", "bhe-actions");
    const feedback = el("div", "bhe-feedback");

    // Cibles
    const targetsWrap = el("div", "bhe-targets");
    for (const t of this.model.getTargets()) {
      const target = el("div", "bhe-target");
      target.id = `bhe-target-${t.id}`;
      target.setAttribute("data-target-id", t.id);
      target.setAttribute("data-accepts", "1");
      target.addEventListener("dragover", (e) => e.preventDefault());
      target.addEventListener("drop", (e) => this.onDrop(e as DragEvent, t.id));

      target.append(el("span", "bhe-target-label", t.label));
      targetsWrap.append(target);

      // Style manuel
      const st = this.style?.targets?.[t.id];
      if (this.style?.layout === "manual" && st) {
        target.style.position = "absolute";
        const unit = st.unit ?? "px";
        target.style.left = `${st.x}${unit}`;
        target.style.top  = `${st.y}${unit}`;
        if (st.width) target.style.width = `${st.width}${unit}`;
        if (st.align === "center") target.style.textAlign = "center";
      }
    }

    // Items
    const itemsWrap = el("div", "bhe-items");
    for (const it of this.model.getItems()) {
      const chip = el("div", "bhe-item", it.label);
      chip.id = `bhe-item-${it.id}`;
      chip.setAttribute("draggable", "true");
      chip.setAttribute("data-item-id", it.id);
      chip.addEventListener("dragstart", (e) => this.onDragStart(e as DragEvent, it.id));

      // Style manuel
      const ist = this.style?.items?.[it.id];
      if (this.style?.layout === "manual" && ist) {
        chip.style.position = "absolute";
        const unit = ist.unit ?? "px";
        chip.style.left = `${ist.x}${unit}`;
        chip.style.top  = `${ist.y}${unit}`;
        if (ist.fontSize) chip.style.fontSize = ist.fontSize;
        if (ist.backgroundColor) chip.style.backgroundColor = ist.backgroundColor;
      }

      itemsWrap.append(chip);
    }

    // Boutons
    const btnCheck = el("button", "bhe-btn", "Valider");
    btnCheck.addEventListener("click", () => {
      const res = this.evaluate();
      feedback.textContent = res.message;
      feedback.setAttribute("data-status", res.status);
    });

    const btnReset = el("button", "bhe-btn ghost", "Réinitialiser");
    btnReset.addEventListener("click", () => this.reset());

    actions.append(btnCheck, btnReset);

    // Composition
    scene.append(targetsWrap, itemsWrap);
    this.container.append(header, scene, tray, actions, feedback);
  }

  private onDragStart(e: DragEvent, itemId: string) {
    e.dataTransfer?.setData("text/plain", itemId);
    e.dataTransfer?.setDragImage?.((e.target as HTMLElement), 10, 10);
  }

  private onDrop(e: DragEvent, targetId: string) {
    e.preventDefault();
    const itemId = e.dataTransfer?.getData("text/plain");
    if (!itemId) return;

    // Libérer ancienne cible si l’item y était
    const prevTarget = this.placed[itemId];
    if (prevTarget) this.occupied[prevTarget] = null;

    // Si cible déjà occupée → on remonte l’élément occupant
    const occupying = this.occupied[targetId];
    if (occupying) {
      this.placed[occupying] = null;
      const elOcc = document.getElementById(`bhe-item-${occupying}`);
      if (elOcc) elOcc.parentElement?.appendChild(elOcc);
    }

    // Poser l’item dans la cible
    const targetEl = document.getElementById(`bhe-target-${targetId}`);
    const itemEl = document.getElementById(`bhe-item-${itemId}`);
    if (targetEl && itemEl) {
      targetEl.appendChild(itemEl);
      this.placed[itemId] = targetId;
      this.occupied[targetId] = itemId;
    }
  }

  private evaluate(): { status: "correct" | "partial" | "wrong"; message: string } {
    const map = this.model.getItemTargetMap(); // attendu
    let correct = 0;
    const total = Object.keys(map).length;

    for (const itemId of Object.keys(map)) {
      if (this.placed[itemId] === map[itemId]) correct++;
    }

    const ratio = correct / total;
    const fb = (this as any).model?.data?.feedback; // pas dans DragDropData, on lit depuis bhe.json

    if (ratio === 1) return { status: "correct", message: fb?.correct ?? "Bravo !" };
    if (ratio >= 0.5) return { status: "partial", message: fb?.partial ?? "Presque." };
    return { status: "wrong", message: fb?.wrong ?? "Réessaie." };
  }

  private reset() {
    // Remet tous les items dans leur conteneur initial (itemsWrap)
    for (const k of Object.keys(this.placed)) this.placed[k] = null;
    for (const k of Object.keys(this.occupied)) this.occupied[k] = null;

    const itemsWrap = this.container.querySelector(".bhe-items");
    const chips = this.container.querySelectorAll(".bhe-item");
    chips.forEach(ch => itemsWrap?.appendChild(ch));
    const fb = this.container.querySelector(".bhe-feedback");
    if (fb) { fb.textContent = ""; fb.removeAttribute("data-status"); }
  }

  /** CSS minimal inline pour un rendu propre avec variables globales */
  private injectBaseCSS() {
    if (document.getElementById("bhe-base-css")) return;
    const css = `
:root {
  --bhe-font: system-ui, Inter, Segoe UI, Roboto, Arial, sans-serif;
  --bhe-font-size: 16px;
  --bhe-accent: #4A90E2;
  --bhe-radius: 10px;
}
.bhe-root { font-family: var(--bhe-font); font-size: var(--bhe-font-size); }
.bhe-header { margin-bottom: 12px; }
.bhe-title { margin: 0 0 4px; font-size: 1.25rem; }
.bhe-instructions { margin: 0; opacity: .8; }
.bhe-scene { position: relative; border: 1px solid #e6e6e6; border-radius: var(--bhe-radius); padding: 12px; min-height: 220px; }
.bhe-targets { position: relative; min-height: 120px; }
.bhe-target { display: inline-flex; align-items: center; justify-content: center; 
  min-width: 80px; min-height: 48px; padding: 8px; margin: 6px; 
  border: 2px dashed var(--bhe-accent); border-radius: var(--bhe-radius); }
.bhe-target-label { font-weight: 600; opacity: .7; position: absolute; top: -22px; }
.bhe-items { position: relative; margin-top: 16px; min-height: 80px; }
.bhe-item { display: inline-flex; align-items: center; justify-content: center; 
  padding: 10px 14px; margin: 6px; border-radius: var(--bhe-radius); 
  background: #f5f7fb; border: 1px solid #dde3ee; cursor: grab; user-select: none; }
.bhe-item:active { cursor: grabbing; }
.bhe-actions { display: flex; gap: 8px; margin-top: 12px; }
.bhe-btn { padding: 8px 12px; border-radius: 8px; border: 1px solid var(--bhe-accent); background: var(--bhe-accent); color: white; cursor: pointer; }
.bhe-btn.ghost { background: transparent; color: var(--bhe-accent); }
.bhe-feedback { margin-top: 8px; font-weight: 600; }
.bhe-feedback[data-status="correct"] { color: #2e7d32; }
.bhe-feedback[data-status="partial"] { color: #b26a00; }
.bhe-feedback[data-status="wrong"] { color: #c62828; }
    `.trim();
    const style = document.createElement("style");
    style.id = "bhe-base-css";
    style.textContent = css;
    document.head.appendChild(style);
  }
}
