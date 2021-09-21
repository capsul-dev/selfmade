export default {
  namespaced: true,

  state: {
    isVisible: false,
    title: "Título do modal",
    body: "Lorem ipsum dolor sit amet",
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
      });
    },
  },
};