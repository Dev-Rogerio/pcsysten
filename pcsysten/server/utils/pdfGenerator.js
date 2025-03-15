const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

async function generatePDF(data) {
  // Adicionando console.log para verificar os dados recebidos
  console.log("Dados recebidos para o PDF:", data); // 🔍 Verifique os dados

  const templatePath = path.join(__dirname, "template.html");
  let htmlTemplate = fs.readFileSync(templatePath, "utf8");

  // Compilando o template com Handlebars
  const template = handlebars.compile(htmlTemplate);
  const htmlFinal = template(data); // Compilando os dados no template

  // Criar um arquivo temporário do HTML
  const tempHtmlPath = path.join(__dirname, "temp.html");
  fs.writeFileSync(tempHtmlPath, htmlFinal);

  // Iniciar o Puppeteer e gerar o PDF
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(`file://${tempHtmlPath}`, { waitUntil: "networkidle0" });
  const pdfPath = path.join(__dirname, "../pedido.pdf");
  await page.pdf({ path: pdfPath, format: "A4" });

  await browser.close();
  return pdfPath;
}

module.exports = generatePDF;
