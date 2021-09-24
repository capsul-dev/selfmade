export default {
  namespaced: true,

  state() {
    return {
      isVisible: false,
      title: "",
      body: "",
      component: "",
      details: {},
    }
  },

  getters: {
    get: (state) => state,
  },

  actions: {
    spawn: ({ commit }, value) => commit("OVERLAY_SPAWN", value),
    close: ({ commit }) => commit("OVERLAY_CLOSE"),
  },

  mutations: {
    OVERLAY_SPAWN: (state, value) => {
      Object.assign(state, {
        ...value,
        isVisible: true,
      });
    },

    OVERLAY_CLOSE: (state) => {
      Object.assign(state, {
        isVisible: false,
        title: "",
        body: "",
        component: "",
        details: Object(),
      });
    },
  },
};
