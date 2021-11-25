/* eslint-disable no-undef */
import { chromium } from "playwright";
import { fromBase64 } from "../../../../isomorphic/services/encoding";

let browser = {};
let renderedPage = {};

const setup = async (browser) => {
  await setupChromium(browser);
};

const setupChromium = async (browser) => {
  browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  renderedPage = page;
}

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

jest.setTimeout(15000);

describe('./CMain.vue', () => {
  
  const testData = {
    clientName: "Nome Teste",
    invalidClientMail: "Email",
    validClientMail: "emailfake@email.com",
    invalidClientPhone: "989898",
    validClientPhone:"47933332222",
    productName: "Produto Teste",
    productSegment: "Nicho de Teste",
    sections: [
      {
        "sectionName": "Cabeçalho",
        "layoutIndex": 1,
        "sectionDetail": "gostaria de mudar a cor do fundo"
      },
      {
        "sectionName": "Faixa gatilho",
        "layoutIndex": 0,
        "sectionDetail": "coloque um texto que tenha a ver com o header"
      },
      {
        "sectionName": "Fórmula",
        "layoutIndex": 2,
        "sectionDetail": "dar foco em x ingrediente?"
      },
      {
        "sectionName": "Provas Sociais",
        "layoutIndex": 2,
        "sectionDetail": "gostaria de prints do whatsapp"
      },
      {
        "sectionName": "Cards de compra",
        "layoutIndex": 0,
        "sectionDetail": "quero 4 cards de checkout"
      },
      {
        "sectionName": "Gatilhos mentais",
        "layoutIndex": 2,
        "sectionDetail": "gostaria de mudar a cor do fundo"
      },      
      {
        "sectionName": "Atendimento Whatsapp",
        "layoutIndex": 1,
        "sectionDetail": "coloca pra enviar pro numero xxxxx-xxxx"
      },
      {
        "sectionName": "Rodapé",
        "layoutIndex": 1,
        "sectionDetail": "não colocar cnpj"
      },
    ]
  }
  
  const verifyModal = async (modalTitle, modalContain) => {
    await renderedPage.click("button[role='saveButton']");
    await renderedPage.waitForSelector('#cModal', { state: 'visible' });
    expect(await renderedPage.innerText("[role='modalTitle']")).toBe(modalTitle);
    expect(await renderedPage.innerText("[role='modalBody']")).toContain(modalContain);
    await renderedPage.click("#closeModal");    
  }

  beforeAll(async () => {
    await setup(browser);    
  });
  
  afterAll(async () => { 
    await renderedPage.close();
  });

  
  describe('Trying to send the layout without all required data', () => {
    it('renders the main view', async () => {
      await renderedPage.goto(
        "http://localhost:3000/", 
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
      await renderedPage.reload({ waitUntil: 'networkidle' });
      
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
      
      renderedPage.on('request', request => {
        const serializedContent = JSON.parse(request.postData()).serializedContent;
        const deserializedContent = fromBase64(serializedContent);
        const parsedContent = JSON.parse(deserializedContent);

        const sections = parsedContent.sections;
        console.log(sections[0].selectedStyle);        
        
        const businessInfo = parsedContent.business.business.businessInfo;
        expect(businessInfo.clientName).toBe(testData.clientName);
        expect(businessInfo.clientMail).toBe(testData.validClientMail);
        expect(businessInfo.clientPhone).toBe("(47) 93333-2222");
        expect(businessInfo.productName).toBe(testData.productName);
        expect(businessInfo.productSegment).toBe(testData.productSegment);

        console.log(businessInfo);
      });

      await verifyModal("Sucesso", "enviado"); 
    });
  });
});
