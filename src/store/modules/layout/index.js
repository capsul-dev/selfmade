export default {
  namespaced: true,

  state() {
    return {
      sections: [
        {
          order: 1,
          name: 'Header',
          description: 'A apresentação do site. Deve conter um título e um subtítulo.',
          component: 'c-section-header',
          filename: 'header',
        },
        {
          order: 2,
          name: 'Bottom',
          description: 'O rodapé dosite. Deve conter informações gerais e de contato.',
          component: 'c-section-bottom',
          filename: 'bottom',
        }
      ]
    }
  },

  getters: {
    sections: (state) => state.sections,
  },
  
  actions: {
    updateOrder: ({ commit }, value) => commit('ORDER_UPDATE', value)
  },

  mutations: {
    ORDER_UPDATE: (state, value) => {
      state.sections = value
    }
  },
}
