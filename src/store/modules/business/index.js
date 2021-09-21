/* eslint-disable */
import http from "@/http";
import { toBase64 } from "@/../isomorphic/services/encoding";
import { isStringFilled } from '@/../isomorphic/polyfill'

export default {
  namespaced: true,

  state() {
    return {
      isAdmin: false,
      sentLayouts: [],
      clientName: "Lorem ipsum",
      clientMail: '',
      productName: "",
    };
  },

  getters: {
    isAdmin: (state) => !!state.isAdmin,
    clientName: (state) => state.clientName,
    clientMail: (state) => state.clientMail,
    productName: (state) => state.productName,
  },

  actions: {
    setAdmin: ({ commit }, value) => commit('ADMIN_SET', value),
    updateClientName: ({ commit }, value) => commit("CLIENT_NAME_UPDATE", value),
    updateClientMail: ({ commit }, value) => commit('CLIENT_MAIL_UPDATE', value),
    updateProductName: ({ commit }, value) => commit('PRODUCT_NAME_UPDATE', value),

    sendLayout: ({ commit, getters, rootGetters }) =>
      new Promise((resolve, reject) => {

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
    ADMIN_SET: (state, value) => {
      state.isAdmin = value
    },

    CLIENT_NAME_UPDATE: (state, value) => {
      state.clientName = value;
    },
    
    CLIENT_MAIL_UPDATE: (state, value) => {
      state.clientMail = value;
    },

    PRODUCT_NAME_UPDATE: (state, value) => {
      state.productName = value;
    },

    // eslint-disable-next-line
    LAYOUT_SEND: (state, value) => {
      //
    },
  },
};
