/* eslint-disable no-unused-vars */
const sendMail = require("../api-assets/sendMail");

const {
  NODE_ENV,
  CS_SMTP_HOST,
  CS_SMTP_PORT,
  CS_SMTP_USER,
  CS_SMTP_PASS,
  CS_SENDERNAME,
  CS_MAIL,
} = process.env;

module.exports = async (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    return res.send({
      error: false,
    });
  };

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

    await sendMail({
      host: CS_SMTP_HOST,
      port: CS_SMTP_PORT,
      user: CS_SMTP_USER,
      pass: CS_SMTP_PASS,
      sendername: CS_SENDERNAME,
      businessMail: CS_MAIL,
      clientName: req.body.clientName,
      clientMail: req.body.clientMail,
      productName: req.body.productName,
      productSegment: req.body.productSegment,
      content: req.body.content,
    });
  } catch (error) {
    console.trace(error);
    return res.status(500).send({ error: true, message: error.message });
  }

  return res.send({
    error: false,
  });
};
