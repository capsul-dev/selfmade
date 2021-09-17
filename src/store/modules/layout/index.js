export default {
  namespaced: true,

  state() {
    return {
      sections: [
        {
          order: 1,
          originalOrder: 0,
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
          originalOrder: 1,
          enabled: true,
          name: "Contato",
          description: "Formulário de contato.",
          component: "c-section-contact",
          filename: "contact",
        },
        {
          order: 3,
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
  },

  mutations: {
    ORDER_UPDATE: (state, value) => {
      state.sections = value;
    },
  },
};
