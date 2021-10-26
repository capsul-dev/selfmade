/* eslint-disable no-unused-vars */
const nodemailer = require("nodemailer");
const sgMail = require("@sendgrid/mail");
const http = require("../isomorphic/http");
const { fromBase64 } = require("../isomorphic/services/encoding");

const {
  fromClientToBusiness,
  fromBusinessToClient,
} = require("../api-assets/mailTemplates.json");

const {
  NODE_ENV,
  CS_MAIL,
  HCAPTCHA_SECRET,
  SENDGRID_APIKEY
} = process.env;

module.exports = async (req, res) => {
  try {
    const requiredFields = {
      clientName: "string",
      clientMail: "string",
      content: "string",
      details: "string",
    };

    if (typeof req.body !== "object") {
      throw "direct access not allowed";
    }

    if (!req.body["h-captcha-response"]) {
      throw "access denied";
    }

    Object.entries(requiredFields).forEach(([name, value]) => {
      if (typeof req.body[name] !== value) {
        throw NODE_ENV === "development"
          ? `expected ${name} to be ${value}`
          : "an error ocurred";
      }
    });
    
    await http({
      method: 'post',
      url: 'https://hcaptcha.com/siteverify',
      data: {
        secret: HCAPTCHA_SECRET,
        response: req.body["h-captcha-response"],
      }
    }).then((a) => console.log(a));

    sgMail.setApiKey(SENDGRID_APIKEY);
    const msgToBusiness = {
      to: CS_MAIL,
      from: CS_MAIL,
      subject: "Novo Layout recebido!",
      text: `Detalhes: ${req.body.details ? req.body.details : "-"}`,
      attachments: [
        {
          filename: `layout.json`,
          content: req.body.content
        },
      ]
    };

    const msgToClient = {
      to: req.body.clientMail,
      from: CS_MAIL,
      subject: "Layout recebido!",
      text: "Seu layout foi enviado para nossa equipoe de desenvolvimento, por favor aguarde, nossos profissionais entrarão em contato! :)"
    }

    await sgMail.send(msgToBusiness);
    await sgMail.send(msgToClient);

    // const transporter = nodemailer.createTransport({
    //   host: CS_SMTP_HOST,
    //   port: CS_SMTP_PORT,
    //   auth: {
    //     user: CS_SMTP_USER,
    //     pass: CS_SMTP_PASS,
    //   },
    // });

    // await transporter.sendMail({
    //   subject: "Selfmade",
    //   text: `Detalhes: ${req.body.details ? req.body.details : "-"}`,
    //   from: `${req.body.clientName} <${req.body.clientMail}>`,
    //   to: CS_MAIL,
    //   attachments: [
    //     {
    //       filename: `NOME.json`,
    //       content: fromBase64(req.body.content),
    //     },
    //   ],
    // });

    // await transporter.sendMail({
    //   ...fromBusinessToClient,
    //   from: `${CS_SENDERNAME} <${CS_MAIL}>`,
    //   to: req.body.clientMail,
    // });

  } catch (error) {
    console.trace(error);
    console.log(error.response.body);
    console.log(SENDGRID_APIKEY);
    console.log(CS_MAIL);
    return res.status(500).send({ error: true, message: error.message });
  }

  res.send({
    error: false,
  });
};
