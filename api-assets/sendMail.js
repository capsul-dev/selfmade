
import {fromBase64} from "../isomorphic/services/encoding"

const nodemailer = require("nodemailer");
const generateMailMessages = require("./generateMailMessages");

module.exports = async (emailData) => {
  const desserializedContent = fromBase64(emailData.content);
  emailData.content = JSON.parse(desserializedContent);
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
};
