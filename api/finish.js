/* eslint-disable no-unused-vars */
const http = require("../isomorphic/http");
const sendMail = require("../isomorphic/services/sendMail");

const {
  NODE_ENV,
  CS_SMTP_HOST,
  CS_SMTP_PORT,
  CS_SMTP_USER,
  CS_SMTP_PASS,
  CS_SENDERNAME,
  CS_MAIL,
  HCAPTCHA_SECRET,
  SENDGRID_APIKEY,
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
      method: "post",
      url: "https://hcaptcha.com/siteverify",
      data: {
        secret: HCAPTCHA_SECRET,
        response: req.body["h-captcha-response"],
      },
    }).then((a) => console.log(a));

    await sendMail({
      host: CS_SMTP_HOST,
      port: CS_SMTP_PORT,
      user: CS_SMTP_USER,
      pass: CS_SMTP_PASS,
      sendername: CS_SENDERNAME,
      text: req.body.details ? req.body.details : "-",
      businessMail: CS_MAIL,
      clientName: req.body.clientName,
      clientMail: req.body.clientMail,
      productName: req.body.productName,
      productSegment: req.body.productSegment,
      content: req.body.content,
      details: req.body.details,
    });
  } catch (error) {
    console.trace(error);
    return res.status(500).send({ error: true, message: error.message });
  }

  res.send({
    error: false,
  });
};
