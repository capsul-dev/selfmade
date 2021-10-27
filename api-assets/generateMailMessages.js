const { fromBase64 } = require("../isomorphic/services/encoding");

const mailToBusiness = (emailData) => {
  return {
    from: `${emailData.clientName} <${emailData.clientMail}>`,
    to: emailData.businessMail,
    subject: `Selfmade - Layout recebido (${emailData.productName})!`,
    text: `
      Nome do Produtor: ${emailData.clientName}<br/>,
      Email do Produtor: ${emailData.clientMail}<br/>,
      Nicho do Produto: ${emailData.productSegment}<br/>,
      Detalhes: ${emailData.details}
      `,
    attachments: [
      {
        filename: `${emailData.productName}.json`,
        content: fromBase64(emailData.content),
      },
    ],
  }
}

const mailToClient = (emailData) => {
  return {
    from: `${emailData.sendername} <${emailData.businessMail}>`,
    to: emailData.clientMail,
    subject: `Capsul Brasil - Layout de ${emailData.productName} enviado!`,
    text: "Seu layout foi enviado para nossa equipoe de desenvolvimento, por favor aguarde, nossos profissionais entrarão em contato! :)"
  }
}

module.exports = { mailToBusiness, mailToClient };
