/* eslint-disable no-undef */
import { createServer, Response } from "miragejs";
import { chromium } from "playwright";

const setup = async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  return page;
}

let renderedPage = {};
const basicElementsToBeRendered = [
  {
    id: "upperArea",
    rendered: true
  },
  {
    id: "cBusinessInfo",
    rendered: true
  },
  {
    id: "cSectionList",
    rendered: true
  },
  {
    id: "cSectionArrange",
    rendered: true
  },
  {
    id: "cFinish",
    rendered: true
  }
]

let renderedElements = [
  {
    id: "upperArea",
    rendered: true
  },
  {
    id: "cBusinessInfo",
    rendered: true
  },
  {
    id: "cSectionList",
    rendered: true
  },
  {
    id: "cSectionArrange",
    rendered: true
  },
  {
    id: "cFinish",
    rendered: true
  }
]

describe('./CMain.vue', () => {
  let server = {};
  
  const testData = {
    clientName: "Nome Teste",
    invalidClientMail: "Email",
    validClientMail: "emailfake@email.com",
    invalidClientPhone: "989898",
    validClientPhone:"47933332222",
    productName: "Produto Teste",
    productSegment: "Nicho de Teste"
  }
  
  const verifyModal = async (modalTitle, modalContain) => {
    await renderedPage.click("button[role='saveButton']");  
    expect(await renderedPage.isVisible('#cModal')).toBe(true);
    expect(await renderedPage.innerText("[role='modalTitle']")).toBe(modalTitle);
    expect(await renderedPage.innerText("[role='modalBody']")).toContain(modalContain);
    await renderedPage.click("#closeModal");
  }

  beforeAll(async () => {
    renderedPage = await setup();
  
    server = createServer({
      routes() {
        this.namespace = "/api";
        this.post("/finish", (request) => {
          console.log(request);
          return new Response(200, {}, { "teste": "serverResponse" })
        });
      }
    });      
  });
  
  afterAll(() => { server.shutdown() });

  
  describe('Trying to send the layout without all required data', () => {
    it('renders the main view', async () => {
      await renderedPage.goto(
        "http://localhost:8080/", 
        { waitUntil: 'networkidle' }
      );
      
      renderedElements.forEach(async (el) => {
        const matchElement = basicElementsToBeRendered.find(({ id }) => id === el.id);
        matchElement.rendered = await renderedPage.isVisible(`#${el.id}`);
      });
      
      expect(renderedElements).toMatchObject(basicElementsToBeRendered);
    }, 15000);
    
    it("try to save without anyData", async () => {          
      await verifyModal("Erro", "Nome");
      await renderedPage.fill("input[role='clientName']", testData.clientName);
    });

    it("try to save without or with a invalid clientMail", async () => {
      await verifyModal("Erro","E-mail");
      await renderedPage.fill("input[role='clientMail']", testData.invalidClientMail);

      await verifyModal("Erro","inválido");
      await renderedPage.fill("input[role='clientMail']", testData.validClientMail);
    });

    it("try to save without or with a invalid clientPhone", async () => {
      await verifyModal("Erro","Telefone");
      await renderedPage.fill("input[role='clientPhone']", testData.invalidClientPhone);
      
      await verifyModal("Erro", "inválido");
      await renderedPage.fill("input[role='clientPhone']", testData.validClientPhone);
    });
    
    it("try to save without a productName", async () => {
      await verifyModal("Erro", "Nome do produto");
      await renderedPage.fill("input[role='productName']", testData.productName);
    });

    it("try to save without a productSegment", async () => {
      await verifyModal("Erro", "nicho do seu produto");
      await renderedPage.fill("input[role='productSegment']", testData.productSegment);
    });
    
    it("try to save without a minimum section quantity", async () => {
      for (let index = 0; index < 14; index++) {
        if(index !== 0 && index !== 6 && index !== 13)
          if(await renderedPage.isChecked(`#checkbox-${index}`))
            await renderedPage.uncheck(`#checkbox-${index}`)
      }

      await verifyModal("Erro", "escolher mais seções");
    });

    it("try to save sending beyond the maximum section quantity", async () => {
      for (let index = 0; index < 14; index++) {
        if(!await renderedPage.isChecked(`#checkbox-${index}`))
          await renderedPage.check(`#checkbox-${index}`)
      }

      await verifyModal("Erro", "escolher até 11 seções");
    });
  }, 15000);
  describe("try to save with all required data", () => {
    it('renders the main view', async () => {
      await renderedPage.goto(
        "http://localhost:8080/", 
        { waitUntil: 'networkidle' }
      );
      
      renderedElements.forEach(async (el) => {
        const matchElement = basicElementsToBeRendered.find(({ id }) => id === el.id);
        matchElement.rendered = await renderedPage.isVisible(`#${el.id}`);
      });
      
      expect(renderedElements).toMatchObject(basicElementsToBeRendered);
    }, 15000);

    it("sends all required data correctly filled", async () => {
      await renderedPage.fill("input[role='clientName']", testData.clientName);
      await renderedPage.fill("input[role='clientMail']", testData.validClientMail);
      await renderedPage.fill("input[role='clientPhone']", testData.validClientPhone);
      await renderedPage.fill("input[role='productName']", testData.productName);
      await renderedPage.fill("input[role='productSegment']", testData.productSegment);

      for (let index = 0; index < 7; index++) {
        if(await renderedPage.isChecked(`#checkbox-${index}`))
          await renderedPage.check(`#checkbox-${index}`)
      }

      await verifyModal("Erro", "enviado");
    });
  }, 15000);
});
