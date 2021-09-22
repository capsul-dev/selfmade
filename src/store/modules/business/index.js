/* eslint-disable */
import http from "@/../isomorphic/http";
import { toBase64 } from "@/../isomorphic/services/encoding";
import { isStringFilled } from '@/../isomorphic/polyfill'

const initialState = {
      isAdmin: false,
      isImported: false,
      isLoading: false,

      sentLayouts: [],
      clientName: '',
      clientMail: '',
      clientPhone: '',
      productName: '',
    };

export default {
  namespaced: true,

  state() {
    return {
      ...initialState
    }
  },

  getters: {
    isAdmin: (state) => !!state.isAdmin,
    isImported: (state) => !!state.isImported,
    isLoading: (state) => !!state.isLoading,

    clientName: (state) => state.clientName,
    clientMail: (state) => state.clientMail,
    clientPhone: (state) => state.clientPhone.replace(/^0/, '').replace(/[^0-9]/g, '') || 'invalid',
    productName: (state) => state.productName,
  },

  actions: {
    import: ({ commit }, value) => commit('BUSINESS_IMPORT', value),
    reset: ({ commit }) => commit('BUSINESS_RESET'),

    setAdmin: ({ commit }, value) => commit('ADMIN_SET', value),

    sendLayout: ({ commit, getters, rootGetters }) =>
      new Promise(async (resolve, reject) => {

        if( !isStringFilled(getters.clientName) ) {
          return reject("Você deve preencher o campo 'nome'")
        }

        if( !isStringFilled(getters.clientMail) ) {
          return reject("Você deve preencher o campo 'email'")
        }

        if( !isStringFilled(getters.clientPhone) ) {
          return reject("Você deve preencher o campo 'telefone'")
        }

        if( !isStringFilled(getters.productName) ) {
          return reject("Você deve preencher o campo 'nome do produto'")
        }

        if( !/^([a-zA-Z0-9]|\.|_)+@(.?([a-zA-Z0-9]|\.|_|-)+){2,}/.test(getters.clientMail) ) {
          return reject('E-mail inválido')
      }

        if( ![10, 11].includes(getters.clientPhone.length)) {
          return reject('Telefone inválido - deve conter entre 10 e 11 dígitos e incluir o DDD')
        }

        const { isAdmin, ...businessInfo } = getters;
        const serializedContent = JSON.stringify({
          sections: rootGetters['layout/filteredSections'],
          business: businessInfo,
        })

        const payload = {
          clientName: getters.clientName,
          clientMail: getters.clientMail,
          clientPhone: getters.clientPhone,
          productName: getters.productName,
          content: toBase64(serializedContent),
        };

        commit('LOADING_UPDATE', true)

        if( 'hcaptcha' in window ) {
          const { key } = await hcaptcha.execute(window.hcaptcha_widgetID, { async: true })
            .catch((error) => reject(error))

          if( !key ) {
            return
          }

          payload['h-captcha-response'] = key
        }

        http
          .post("/api/finish", payload)
          .then((result) => {
            commit("LAYOUT_SEND");
            resolve(result);
          })
          .catch((error) => reject(error))

      }).finally(() => commit('LOADING_UPDATE', false)),
  },

  mutations: {
    LOADING_UPDATE: (state, value) => {
      state.isLoading = value;
    },

    BUSINESS_IMPORT: (state, value) => {
      Object.assign(state, {
        ...value,
        isImported: true,
      })
    },

    BUSINESS_RESET: (state) => {
      Object.assign(state, {
        ...initialState,
        isAdmin: true,
      })
    },

    ADMIN_SET: (state, value) => {
      state.isAdmin = value
    },

    // eslint-disable-next-line
    LAYOUT_SEND: (state, value) => {
      //
    },
  },
};
