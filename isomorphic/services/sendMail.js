const nodemailer = require("nodemailer");
const generateMailMessages = require('../../api-assets/generateMailMessages');

module.exports = async (emailData) => {
  console.log(emailData);
  const transporter = nodemailer.createTransport({
    host: emailData.host,
    port: emailData.port,
    auth: {
      user: emailData.user,
      pass: emailData.pass,
    },
  });

  await transporter.sendMail(generateMailMessages.mailToBusiness(emailData));

  await transporter.sendMail(generateMailMessages.mailToClient(emailData));
}
