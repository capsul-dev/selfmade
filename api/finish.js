const nodemailer = require("nodemailer");

/* eslint-disable no-unused-vars */
module.exports = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b6df109c7ed54c",
        pass: "cb116dc6479d24",
      },
    });

    await transporter.sendMail({
      from: "Cliente da Silva <cliente@gmail.com>",
      to: "email@capsul.com.br",
      subject: "Layout do site",
      text: "Aqui iria o JSON",
    });

    await transporter.sendMail({
      from: "Email Capsul <email@capsul.com.br>",
      to: "cliente@gmail.com",
      subject: "Layout do site",
      text: "Alguma mensagem institucional",
    });
  } catch (error) {
    console.trace(error);
    res.status(500).send({ error: true, message: error.message });
  }

  res.send({
    error: false,
  });
};
