require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Rota para gerar e enviar o PDF por e-mail
app.post("/send-pdf", async (req, res) => {
  try {
    const {
      cpf,
      client,
      vendedor,
      inputDate,
      deliveryDate,
      metersTissue,
      description,
      rows,
    } = req.body;

    // Criar o PDF
    const doc = new PDFDocument();
    const filePath = "pedido.pdf";
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    doc.fontSize(18).text("Ficha Técnica do Pedido", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`CPF: ${cpf}`);
    doc.text(`Cliente: ${client}`);
    doc.text(`Vendedor: ${vendedor}`);
    doc.text(`Data do Pedido: ${inputDate}`);
    doc.text(`Data de Entrega: ${deliveryDate}`);
    doc.text(`Metragem do Tecido: ${metersTissue}`);
    doc.moveDown();
    doc.fontSize(14).text("Descrição:", { underline: true });
    doc.fontSize(12).text(description || "Sem descrição");

    doc.moveDown();
    doc.fontSize(14).text("Produtos:", { underline: true });
    rows.forEach((row, index) => {
      doc.text(
        `${index + 1}. Produto: ${row.codProduct} | Tecido: ${
          row.codTextil
        } | Textura: ${row.texture} | Fornecedor: ${row.fornecedor}`
      );
    });

    doc.end();

    writeStream.on("finish", async () => {
      // Configurar o transporte do e-mail
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Configurar o e-mail
      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: "destinatario@example.com",
        subject: "Ficha Técnica do Pedido",
        text: "Segue em anexo o PDF com os detalhes do pedido.",
        attachments: [{ filename: "pedido.pdf", path: filePath }],
      };

      // Enviar o e-mail
      await transporter.sendMail(mailOptions);
      res.json({ message: "E-mail enviado com sucesso!" });
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao enviar o e-mail" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
