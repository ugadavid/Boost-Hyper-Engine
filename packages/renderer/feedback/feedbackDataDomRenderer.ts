import type { FeedbackData, FeedbackMessage } from "../../core/types/index.js";

function severityClassName(severity: FeedbackMessage["severity"]): string {
  return `bhe-feedback--${severity}`;
}

function createMessageElement(message: FeedbackMessage, className: string): HTMLElement {
  const article = document.createElement("article");
  article.className = `bhe-feedback__message ${className} ${severityClassName(message.severity)}`;
  article.dataset.messageId = message.id;

  if (message.targetId) {
    article.dataset.targetId = message.targetId;
  }

  if (message.title) {
    const title = document.createElement("h3");
    title.className = "bhe-feedback__message-title";
    title.textContent = message.title;
    article.append(title);
  }

  const text = document.createElement("p");
  text.className = "bhe-feedback__message-text";
  text.textContent = message.message;
  article.append(text);

  return article;
}

export function renderFeedbackData(feedback: FeedbackData): HTMLElement {
  const section = document.createElement("section");
  section.className = `bhe-feedback bhe-feedback--${feedback.status}`;
  section.dataset.status = feedback.status;

  section.append(createMessageElement(feedback.summary, "bhe-feedback__summary"));

  if (feedback.messages && feedback.messages.length > 0) {
    const list = document.createElement("div");
    list.className = "bhe-feedback__messages";

    for (const message of feedback.messages) {
      list.append(createMessageElement(message, "bhe-feedback__detail"));
    }

    section.append(list);
  }

  return section;
}
