import { sections } from "@/../api-assets/sections.json";

export default {
  namespaced: true,

  state() {
    return {
      sections,
    };
  },

  getters: {
    sections: (state) =>
      state.sections.map((section, index) => ({
        ...section,
        order: section.order || index + 1,
      })),

    filteredSections: (state) =>
      state.sections
        .map((section, index) => ({
          ...section,
          order: section.order || index + 1,
        }))
        .filter((section) => !!section.enabled),
  },

  actions: {
    updateOrder: ({ commit }, value) => commit("ORDER_UPDATE", value),

    moveUp: ({ commit }, value) =>
      commit("SECTION_MOVE", { target: value, direction: -1 }),
    moveDown: ({ commit }, value) =>
      commit("SECTION_MOVE", { target: value, direction: 1 }),

    nextStyle: ({ commit }, target) =>
      commit("STYLE_CYCLE", { target, direction: 1 }),
    previousStyle: ({ commit }, target) =>
      commit("STYLE_CYCLE", { target, direction: -1 }),
  },

  mutations: {
    ORDER_UPDATE: (state, value) => {
      value
        .map((section, index) => ({ ...section, order: index }))
        .sort((a, b) =>
          (a.originalOrder || a.order) < (b.originalOrder || b.order) ? -1 : 1
        )
        .forEach((section, index) => {
          state.sections.find(({ name }) => section.name === name).order =
            index + 1;
        });
    },

    SECTION_MOVE: (state, { target, direction }) => {
      if (typeof target.originalOrder === "number") {
        return;
      }

      if (typeof target.order !== "number") {
        state.sections = state.sections.map((section, index) => ({
          ...section,
          order: section.order || index + 1,
        }));
      }

      const order = target.order;
      const sections = state.sections;

      const previous = sections
        .filter((section) => typeof section.originalOrder !== "number")
        .find((section) => section.order === order + direction);

      if (!previous) {
        return;
      }

      sections.find((section) => section.order === order).order =
        previous.order;
      previous.order = order;
      state.sections = sections;
    },

    STYLE_CYCLE: (state, { target, direction }) => {
      const section = state.sections.find(({ name }) => name === target.name);

      const prevIndex = section.selectedStyle?.index || 0;
      const movement =
        prevIndex + direction >= section.styles.length
          ? 0
          : prevIndex + direction < 0
          ? section.styles.length
          : prevIndex + direction;

      section.selectedStyle = {
        index: movement,
        ...section.styles[movement],
      };
    },
  },
};
