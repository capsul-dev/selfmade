/* eslint-disable no-undef */
import { mount } from '@vue/test-utils';
import CMain from './CMain.vue';
import store from '@/store';
import { createServer, Response } from "miragejs";

import {
  CTemplateStep,
  COperatorOptions,
  CBusinessInfo,
  CBusinessConfig,
  CSectionList,
  CSectionArrange,
  CFinish,
  CVideo,
  CTemplateModal,
  CLogo,
  CVersion,
} from "@/components";

jest.useFakeTimers();

describe('./CMain.vue', () => {
  it('renders the main view', () => {
    const component = mount(CMain, { 
      global: {
        plugins: [store]
      }
    });
    expect(component.isVisible()).toBe(true);
  });
  
  describe('Trying to send the layout without all required data', () => {
    const wrapper = mount(CMain, {
      global: {
        components: {
          CTemplateStep,
          COperatorOptions,
          CBusinessInfo,
          CBusinessConfig,
          CSectionList,
          CSectionArrange,
          CFinish,
          CVideo,
          CTemplateModal,
          CLogo,
          CVersion,
        },
        plugins: [store]
      }
    });
    
    const server = createServer({
      routes() {
        this.namespace = "/api";
        this.post("/finish", (request) => {
          console.log(request);
          return new Response(200, {}, { "teste": "serverResponse" })
        });
      }
    });
    
    const testData = {
      clientName: "Nome Teste",
      invalidClientMail: "Email",
      validClientMail: "emailfake@email.com",
      invalidClientPhone: "989898",
      validClientPhone:"47933332222",
      productName: "Produto Teste",
      productSegment: "Nicho de Teste"
    }
    
    const saveButton = wrapper.find("[role='saveButton']");
    expect(saveButton).toBeDefined();
    
    afterAll(() => { server.shutdown() });

    const clickToSave = async () => {
      //dont know why but the saveButton needs two clicks to trigger
      //its onClick function, maybe we should change the CMain structure to
      // a form in order to emit a submit event
      await saveButton.trigger('click');
      await saveButton.trigger('click');
    }

    const closeModal = () => {
      store.dispatch("modal/close");
      expect(store.getters["modal/get"].isVisible).toBe(false);
    }

    const verifyModal = async (modalTitle, modalContain) => {
      expect(store.getters["modal/get"].isVisible).toBe(true);
      expect(store.getters["modal/get"].title).toBe(modalTitle);
      expect(store.getters["modal/get"].body).toContain(modalContain);
      closeModal();
    }

    const resetTest = async (modalTitle, modalContain) => {
      await clickToSave();
      await verifyModal(modalTitle, modalContain);
    }

    const insertData = async (role, dataToBeInserted) => {
      const elementInput = wrapper.find(`[role='${role}']`);
      await elementInput.setValue(dataToBeInserted);

      if(role == "clientPhone") {
        expect(store
          .getters["business/business"]
          .businessInfo[role]
            .replace('(', '')
            .replace(')', '')
        );
      } else {
        expect(store.getters["business/business"].businessInfo[role])
          .toBe(dataToBeInserted);
      }
    };

    it("try to save without clientName", async () => {            
      await resetTest("Erro", "Nome");
      await insertData("clientName", testData.clientName);
      await resetTest("Erro","E-mail");
    });

    it("try to save without or with a invalid clientMail", async () => {
      await insertData("clientMail", testData.invalidClientMail);      
      await resetTest("Erro","inválido");
      
      await insertData("clientMail", testData.validClientMail);
      await resetTest("Erro", "Telefone");
    });

    it("try to save without or with a invalid clientPhone", async () => {
      await insertData("clientPhone", testData.invalidClientPhone);
      await resetTest("Erro", "inválido");
      
      await insertData("clientPhone", testData.validClientPhone);
      await resetTest("Erro", "Nome do produto");
    });
    
    it("try to save without a productName", async () => {
      await insertData("productName", testData.productName);
      await resetTest("Erro", "nicho do seu produto");
    });

    it("try to save without a productSegment", async () => {
      await insertData("productSegment", testData.productSegment);
      console.log(store.getters["business/business"].businessInfo);
      await resetTest("Erro", "11 seções");
    });

    it("try to save without a minimum section quantity", async () => {
      const sectionsList = wrapper.findAll("[type='checkbox']");
      console.log(sectionsList);
    });

  }, 15000);
});
