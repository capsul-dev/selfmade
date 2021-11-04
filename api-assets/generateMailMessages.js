import mailTemplates from "./mailTemplates.json"

const mailToBusiness = (emailData) => {
  const content = emailData.content;
  const jsonContent = JSON.stringify({ serialized: new String(emailData.content) });
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
        content: jsonContent
      },
    ],
  }
}

const mailToClient = (emailData) => {
  return {
    from: `${emailData.sendername} <${emailData.businessMail}>`,
    to: emailData.clientMail,
    subject: `Capsul Brasil - Layout de ${emailData.productName} enviado!`,
    text: mailTemplates.fromBusinessToClient.text,
    html: generateHTML(mailTemplates.fromBusinessToClient.html, emailData)
  }
}

const generateHTML = (html, emailData) =>{
  const generatedHTML = html
      .replace("{{name}}", emailData.clientName)
      .replace("{{product}}", emailData.productName)
      .replace("{{images}}", generateImageList(emailData))
  return generatedHTML
}

const generateImageList = (emailData) => {
  var imageList = ""
  emailData.content.sections.map((element)=>{
    imageList = imageList + `<img style="width:100%" src="https://capsul.news/sm/${element.selectedStyle.image}"/>`
  });
  return imageList

}

module.exports = { mailToBusiness, mailToClient };
