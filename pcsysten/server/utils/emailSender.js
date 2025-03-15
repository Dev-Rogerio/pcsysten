const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendEmail(pdfPath, recipientEmail) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: "Ficha Técnica do Pedido",
    text: "Segue em anexo o PDF com os detalhes do pedido.",
    attachments: [{ filename: "pedido.pdf", path: pdfPath }],
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
