class ActivityModel {
  constructor(activityType, meta, data, options = {}) {
    this.activityType = activityType; // "drag-drop", "fill-in-the-blanks", ...
    this.meta = meta;                 // auteur, langue, date, id...
    this.data = data;                 // contenu spécifique à l'activité
    this.options = options;           // paramètres généraux
  }

  getType() {
    return this.activityType;
  }

  getTitle() {
    return this.meta?.title || "Untitled activity";
  }

  getLanguage() {
    return this.meta?.lang || "fr";
  }

  getData() {
    return this.data;
  }

  toJSON() {
    return {
      type: this.activityType,
      meta: this.meta,
      data: this.data,
      options: this.options
    };
  }

  static fromJSON(json) {
    return new ActivityModel(json.type, json.meta, json.data, json.options);
  }
}
