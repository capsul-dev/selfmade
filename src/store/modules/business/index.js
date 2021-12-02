/* eslint-disable */
import http from "@/../isomorphic/http";
import { toBase64 } from "@/../isomorphic/services/encoding";
import { isStringFilled } from '@/../isomorphic/polyfill'

const initialState = {
      isAdmin: false,
      isImported: false,
      isLoading: false,

      sentLayouts: [],
      businessInfo: {
	      clientName: '',
        clientMail: '',
        clientPhone: '',
        productName: '',
        productSegment: ''
      }
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
    sendLayout: ({ commit, getters, rootGetters, rootState }) => {
      return new Promise(async (resolve, reject) => {

        if( !isStringFilled(getters.business.businessInfo.clientName) ) {
          return reject("Você deve preencher o campo 'Nome'");
        }

        if( !isStringFilled(getters.business.businessInfo.clientMail) ) {
          return reject("Você deve preencher o campo 'E-mail'");
        }
        
        if( !/^([a-zA-Z0-9]|\.|_)+@(.?([a-zA-Z0-9]|\.|_|-)+){2,}/.test(getters.business.businessInfo.clientMail) ) {
          return reject('E-mail inválido');
        }

        if( !isStringFilled(getters.business.businessInfo.clientPhone) ) {
          return reject("Você deve preencher o campo 'Telefone'");
        }

        if( ![15].includes(getters.business.businessInfo.clientPhone.length)) {
          return reject('Telefone inválido - deve conter entre 10 e 11 dígitos e incluir o DDD');
        }

        if( !isStringFilled(getters.business.businessInfo.productName) ) {
          return reject("Você deve preencher o campo 'Nome do produto'");
        }

        if( !isStringFilled(getters.business.businessInfo.productSegment) ) {        
          return reject("Você deve preencher o campo 'Qual o nicho do seu produto?'");
        }

        if( rootGetters["layout/selectedCount"] > rootState.layout.requiredMax ) {
          return reject('Você precisa escolher até 11 seções!');
        }

        if( rootGetters["layout/selectedCount"] < rootState.layout.requiredMin ) {
          return reject('Você precisa escolher mais seções !');
        }

        const { isAdmin, ...businessInfo } = getters;
        const stringifiedContent = JSON.stringify({
          sections: rootGetters['layout/filteredSections'],
          business: businessInfo,
        });
        const payload = {
          serializedContent: toBase64(stringifiedContent),
        };

        commit('LOADING_UPDATE', true)

        http
          .post("/api/finish", payload)
          .then((result) => {
            commit("LAYOUT_SEND");
            resolve(result);
          })
          .catch(() =>  reject(error));
            
       }).finally(() => commit('LOADING_UPDATE', false));
    },
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
