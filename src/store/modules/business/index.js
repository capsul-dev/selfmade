export default {
  namespaced: true,

  state() {
    return {
      name: "Lorem ipsum",
    };
  },

  getters: {
    name: (state) => state.name,
  },

  actions: {
    updateName: ({ commit }, value) => commit("NAME_UPDATE", value),
  },

  mutations: {
    NAME_UPDATE: (state, value) => {
      value.forEach((val) => (state.sections[val].enabled = val.enabled));
    },
  },
};
