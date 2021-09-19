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
  },

  actions: {
    updateOrder: ({ commit }, value) => commit("ORDER_UPDATE", value),

    moveUp: ({ commit }, value) => commit("MOVE_UP", value),
    moveDown: ({ commit }, value) => commit("MOVE_DOWN", value),
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

    MOVE_UP: (state, value) => {
      if (typeof value.originalOrder === "number") {
        return;
      }

      const order = value.order;
      const sections = state.sections;

      const next = sections
        .filter((section) => typeof section.originalOrder !== "number")
        .find((section) => section.order === order - 1);
      if (!next) {
        return;
      }

      sections.find((section) => section.order === order).order = next.order;
      next.order = order;
      state.sections = sections;
    },

    MOVE_DOWN: (state, value) => {
      if (typeof value.originalOrder === "number") {
        return;
      }

      const order = value.order;
      const sections = state.sections;

      const previous = sections
        .filter((section) => typeof section.originalOrder !== "number")
        .find((section) => section.order === order + 1);
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
