const mailToBusiness = (emailData) => {
  const content = emailData.content;
  const jsonContent = JSON.stringify({serialized: new String(emailData.content)});
  console.log(jsonContent);
console.log(jsonContent.length)
  const bufferedContent = new Buffer.alloc(jsonContent.length, JSON.parse(jsonContent));
  return {
    from: `${emailData.clientName} <${emailData.clientMail}>`,
    to: emailData.businessMail,
    subject: `Selfmade - Layout recebido (${emailData.productName})!`,
    text: `
      Nome do Produtor: ${emailData.clientName},
      Email do Produtor: ${emailData.clientMail},
      Nicho do Produto: ${emailData.productSegment},
      Detalhes: ${emailData.details}
      `,
    attachments: [
      {
        filename: `${emailData.productName}.json`,
	content: bufferedContent
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
