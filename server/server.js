require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const generatePDF = require("./utils/pdfGenerator");
const sendEmail = require("./utils/emailSender");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Servidor está rodando corretamente!");
});

// Rota para gerar e enviar o PDF por e-mail
app.post("/send-pdf", async (req, res) => {
  try {
    const pdfPath = await generatePDF(req.body);
    await sendEmail(pdfPath, "roger.ngt3494@gmail.com");
    res.json({ message: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao enviar o e-mail" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
