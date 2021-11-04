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
      productSegment: '',
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

    business: (state) => state
  },

  actions: {
    import: ({ commit }, value) => commit('BUSINESS_IMPORT', value),
    reset: ({ commit }) => commit('BUSINESS_RESET'),

    setAdmin: ({ commit }, value) => commit('ADMIN_SET', value),

    sendLayout: ({ commit, getters, rootGetters, rootState }) =>
      new Promise(async (resolve, reject) => {

        if( !isStringFilled(getters.business.clientName) ) {
          return reject("Você deve preencher o campo 'Nome'");
        }

        if( !isStringFilled(getters.business.clientMail) ) {
          return reject("Você deve preencher o campo 'E-mail'");
        }

        if( !isStringFilled(getters.business.clientPhone) ) {
          return reject("Você deve preencher o campo 'Telefone'");
        }

        if( !isStringFilled(getters.business.productName) ) {
          return reject("Você deve preencher o campo 'Nome do produto'");
        }

        if( !isStringFilled(getters.business.productSegment) ) {
          return reject("Você deve preencher o campo 'Qual o nicho do seu produto?'");
        }

        if( !/^([a-zA-Z0-9]|\.|_)+@(.?([a-zA-Z0-9]|\.|_|-)+){2,}/.test(getters.business.clientMail) ) {
          return reject('E-mail inválido');
        }

        if( ![15].includes(getters.business.clientPhone.length)) {
          return reject('Telefone inválido - deve conter entre 10 e 11 dígitos e incluir o DDD');
        }
	
	if( rootGetters["layout/selectedCount"] > rootState.layout.requiredMax ) {
	  return reject('Você precisa escolher até 11 seções!');
	}

        if( rootGetters["layout/selectedCount"] < rootState.layout.requiredMin ) {
          return reject('Você precisa escolher mais seções !');
        }

        const { isAdmin, ...businessInfo } = getters;
        const serializedContent = JSON.stringify({
          sections: rootGetters['layout/filteredSections'],
          business: businessInfo,
        });

        const payload = {
          clientName: getters.business.clientName,
          clientMail: getters.business.clientMail,
          clientPhone: getters.business.clientPhone,
          productName: getters.business.productName,
          productSegment: getters.business.productSegment,
          content: toBase64(serializedContent),
        };

        commit('LOADING_UPDATE', true)
        
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
	isAdmin: true
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
