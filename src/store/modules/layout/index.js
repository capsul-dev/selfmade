export default {
  namespaced: true,

  state() {
    return {
      sections: [
        {
          order: 1,
          originalOrder: -1,
          enabled: true,
          required: true,
          name: "Header",
          description:
            "A apresentação do site. Deve conter um título e um subtítulo.",
          component: "c-section-header",
          filename: "header",
        },
        {
          order: 2,
          enabled: true,
          name: "Sobre o produto",
          description: "Formulário de contato.",
          component: "c-section-contact",
          filename: "contact",
        },
        {
          order: 3,
          enabled: true,
          name: "Depoimentos",
          description: "Formulário de contato.",
          component: "c-section-contact",
          filename: "contact",
        },
        {
          order: 4,
          enabled: true,
          name: "Benefícios",
          description: "Formulário de contato.",
          component: "c-section-contact",
          filename: "contact",
        },
        {
          order: 5,
          enabled: true,
          name: "Antes e depois",
          description: "Formulário de contato.",
          component: "c-section-contact",
          filename: "contact",
        },
        {
          order: 6,
          enabled: true,
          name: "O que dizem na mídia",
          description: "Formulário de contato.",
          component: "c-section-contact",
          filename: "contact",
        },
        {
          order: 7,
          enabled: true,
          name: "Cards de compra",
          description: "Formulário de contato.",
          component: "c-section-contact",
          filename: "contact",
        },
        {
          order: 8,
          enabled: true,
          name: "Anvisa",
          description: "Formulário de contato.",
          component: "c-section-contact",
          filename: "contact",
        },
        {
          order: 9,
          enabled: true,
          name: "Garantia",
          description: "Formulário de contato.",
          component: "c-section-contact",
          filename: "contact",
        },
        {
          order: 10,
          enabled: true,
          name: "Perguntas frequentes",
          description: "Formulário de contato.",
          component: "c-section-contact",
          filename: "contact",
        },
        {
          order: 11,
          enabled: true,
          name: "Rodapé",
          description: "Formulário de contato.",
          component: "c-section-contact",
          filename: "contact",
        },
        {
          order: 12,
          enabled: true,
          name: "Compra segura",
          description: "Formulário de contato.",
          component: "c-section-contact",
          filename: "contact",
        },
        {
          order: 13,
          originalOrder: 999,
          enabled: true,
          required: true,
          name: "Bottom",
          description:
            "O rodapé do site. Deve conter informações gerais e de contato.",
          component: "c-section-bottom",
          filename: "bottom",
        },
      ],
    };
  },

  getters: {
    sections: (state) => state.sections,
    filteredSections: (state) =>
      state.sections.filter((section) => !!section.enabled),
  },

  actions: {
    updateOrder: ({ commit }, value) => commit("ORDER_UPDATE", value),

    moveUp: ({ commit }, value) =>
      commit("SECTION_MOVE", { target: value, direction: -1 }),
    moveDown: ({ commit }, value) =>
      commit("SECTION_MOVE", { target: value, direction: 1 }),
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
  },
};
