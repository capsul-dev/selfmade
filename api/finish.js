/* eslint-disable no-unused-vars */
const nodemailer = require("nodemailer");
const { fromBase64 } = require("../isomorphic/services/encoding");

const {
  fromClientToBusiness,
  fromBusinessToClient,
} = require("../api-assets/mailTemplates.json");

const {
  NODE_ENV,
  CS_SMTP_HOST,
  CS_SMTP_PORT,
  CS_SMTP_USER,
  CS_SMTP_PASS,
  CS_MAIL,
  CS_SENDERNAME,
} = process.env;

module.exports = async (req, res) => {
  try {
    const requiredFields = {
      clientName: "string",
      clientMail: "string",
      content: "string",
    };

    if (typeof req.body !== "object") {
      throw "direct access not allowed";
    }

    Object.entries(requiredFields).forEach(([name, value]) => {
      if (typeof req.body[name] !== value) {
        throw NODE_ENV === "development"
          ? `expected ${name} to be ${value}`
          : "an error ocurred";
      }
    });

    const transporter = nodemailer.createTransport({
      host: CS_SMTP_HOST,
      port: CS_SMTP_PORT,
      auth: {
        user: CS_SMTP_USER,
        pass: CS_SMTP_PASS,
      },
    });

    await transporter.sendMail({
      ...fromClientToBusiness,
      from: "${req.body.clientName} <${req.body.clientMail}>",
      to: CS_MAIL,
      attachments: [
        {
          filename: `NOME.json`,
          content: fromBase64(req.body.content),
        },
      ],
    });

    await transporter.sendMail({
      ...fromBusinessToClient,
      from: `${CS_SENDERNAME} <${CS_MAIL}>`,
      to: "cliente@gmail.com",
    });
  } catch (error) {
    console.trace(error);
    return res.status(500).send({ error: true, message: error.message });
  }

  res.send({
    error: false,
  });
};
