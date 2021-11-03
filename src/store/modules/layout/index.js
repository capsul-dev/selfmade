import { sections } from "@/../api-assets/sections.json";

const initialState = { sections };

export default {
  namespaced: true,

  state() {
    return {
      requiredMin: 6,
      requiredMax: 11,
      sections: [],
    };
  },

  getters: {
    sections: (state) => state.sections,

    filteredSections: (state) =>
      state.sections.filter(
        (section) => !!section.enabled || !!section.required
      ),

    selectedCount: (state) =>
      state.sections.filter(
        (section) => !!section.enabled || !!section.required
      ).length,
  },

  actions: {
    import: ({ commit }, value) => commit("LAYOUT_IMPORT", value),
    reset: ({ commit, rootGetters }) =>
      commit("LAYOUT_RESET", !!rootGetters["business/isAdmin"]),

    initOrder: ({ commit }) => commit("ORDER_INIT"),
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
    LAYOUT_IMPORT: (state, value) => {
      state.sections = value;
    },

    LAYOUT_RESET: (state, isAdmin) => {
      Object.assign(state, !isAdmin ? initialState : { sections: [] });
    },

    ORDER_INIT: (state) => {
      let index = 1;

      state.sections = (
        state.sections.length > 0 ? state.sections : initialState.sections
      ).map((section) => ({
        ...section,
        order: section.enabled ? index++ : section.order || 0,
      }));
      console.log(state.sections);
    },

    ORDER_UPDATE: (state, value) => {
      value
        .filter((section) => !!section.enabled)
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
          ? section.styles.length -1
          : prevIndex + direction;

      section.selectedStyle = {
        index: movement,
        ...section.styles[movement],
      };
    },
  },
};
