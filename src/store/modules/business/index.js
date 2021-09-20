/* eslint-disable */
import http from "@/http";
import { toBase64 } from "@/../isomorphic/services/encoding";
import { isStringFilled } from '@/../isomorphic/polyfill'

export default {
  namespaced: true,

  state() {
    return {
      sentLayouts: [],
      name: "Lorem ipsum",
      mail: '',
    };
  },

  getters: {
    name: (state) => state.name,
    mail: (state) => state.mail,
  },

  actions: {
    updateName: ({ commit }, value) => commit("NAME_UPDATE", value),
    sendLayout: ({ commit, getters, rootGetters }) =>
      new Promise((resolve, reject) => {

        console.log({ getters, rootGetters })

        if( !isStringFilled(getters.name) ) {
          return reject("Você deve preencher o campo 'nome'")
        }

        if( !isStringFilled(getters.mail) ) {
          return reject("Você deve preencher o campo 'email'")
        }

        const payload = {
          clientName: getters.name,
          clientMail: getters.mail,
          content: toBase64(rootGetters['layout/filteredSections']),
        };

        http
          .post("/api/finish", payload)
          .then((result) => {
            commit("LAYOUT_SEND");
            resolve(result);
          })
          .catch((error) => reject(error));
      }),
  },

  mutations: {
    NAME_UPDATE: (state, value) => {
      value.foreach((val) => (state.sections[val].enabled = val.enabled));
    },

    // eslint-disable-next-line
    LAYOUT_SEND: (state, value) => {
      //
    },
  },
};
