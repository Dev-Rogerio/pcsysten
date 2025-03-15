const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (pdfPath, recipientEmail) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: "Seu PDF está pronto",
      text: "Segue o arquivo PDF anexado.",
      attachments: [{ filename: "arquivo.pdf", path: pdfPath }],
    };

    await transporter.sendMail(mailOptions);
    console.log("E-mail enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    throw error;
  }
};

module.exports = sendEmail;
