const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function generatePDF(data) {
  const templatePath = path.join(__dirname, "template.html");
  let htmlTemplate = fs.readFileSync(templatePath, "utf8");

  // Substituir os placeholders pelos dados reais
  Object.keys(data).forEach((key) => {
    htmlTemplate = htmlTemplate.replace(
      new RegExp(`{{${key}}}`, "g"),
      data[key]
    );
  });

  // Criar um arquivo temporário do HTML
  const tempHtmlPath = path.join(__dirname, "temp.html");
  fs.writeFileSync(tempHtmlPath, htmlTemplate);

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
