import { createRequire } from "node:module";
import fs from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);

let pdfLib;
try {
  pdfLib = require("pdf-lib");
} catch {
  pdfLib = require(
    "/Users/deanmason/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pdf-lib"
  );
}

const { PDFDocument, StandardFonts, rgb } = pdfLib;

const root = path.resolve(import.meta.dirname, "..");
const output = path.join(root, "lead-magnets", "beginner-investing-glossary.pdf");

const colors = {
  navy: rgb(0.125, 0.153, 0.302),
  navySoft: rgb(0.16, 0.196, 0.376),
  mint: rgb(0.557, 0.804, 0.659),
  mintDeep: rgb(0.435, 0.698, 0.545),
  ivory: rgb(0.957, 0.929, 0.863),
  paper: rgb(1, 0.992, 0.969),
  text: rgb(0.09, 0.13, 0.23),
  muted: rgb(0.32, 0.376, 0.47),
  line: rgb(0.82, 0.87, 0.84),
  white: rgb(1, 1, 1),
  softMint: rgb(0.965, 0.985, 0.965),
};

const pageSize = [595.28, 841.89];
const margin = 52;
const contentWidth = pageSize[0] - margin * 2;
const colGap = 14;
const colWidth = (contentWidth - colGap) / 2;

const terms = [
  ["Asset", "Something that has value. In investing, this could include shares, bonds, funds, property, or cash."],
  ["Bear market", "A period where markets have fallen significantly and investors are generally more negative."],
  ["Bond", "A loan made to a government or company. In return, the borrower usually pays interest."],
  ["Broker", "A platform or company that lets you buy and sell investments."],
  ["Bull market", "A period where markets have been rising and investors are generally more positive."],
  ["Capital", "The money you put to work when you invest."],
  ["Capital gain", "The profit made when you sell an investment for more than you paid for it."],
  ["Compound growth", "Growth on top of previous growth. Over long periods, this can become very powerful."],
  ["Diversification", "Spreading money across different investments so one result does not carry everything."],
  ["Dividend", "A payment some companies make to shareholders from profits."],
  ["ETF", "An exchange-traded fund. It is a fund that can be bought and sold on a stock exchange."],
  ["Fees", "The costs charged by platforms, funds, or products. Fees can reduce your returns over time."],
  ["Fund", "A basket of investments managed together. Funds can help beginners avoid relying on one company."],
  ["Index", "A list that tracks a market or part of a market, such as large UK or US companies."],
  ["Inflation", "The rise in prices over time. Inflation can reduce what your money can buy."],
  ["Interest", "Money paid for borrowing or saving money. With bonds and cash, interest is often part of the return."],
  ["Investment platform", "An online service where you can open accounts and buy investments."],
  ["Liquidity", "How quickly something can be turned into cash without a major price change."],
  ["Portfolio", "The collection of investments you own."],
  ["Risk", "The chance that results are different from what you hoped for, including losing money."],
  ["Share", "A small piece of ownership in a company."],
  ["Stocks and Shares ISA", "A UK account that can hold investments with certain tax advantages, subject to rules and limits."],
  ["Time horizon", "How long you expect to leave money invested before needing it."],
  ["Volatility", "How much an investment moves up and down in price over time."],
];

const doc = await PDFDocument.create();
const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
const fontSerif = await doc.embedFont(StandardFonts.TimesRomanBold);

function wrapText(text, font, size, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= maxWidth) {
      line = next;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawParagraph(page, text, x, y, width, options = {}) {
  const size = options.size ?? 10;
  const lineHeight = options.lineHeight ?? size * 1.42;
  const font = options.font ?? fontRegular;
  const color = options.color ?? colors.muted;
  const lines = wrapText(text, font, size, width);
  let cursorY = y;
  for (const line of lines) {
    page.drawText(line, { x, y: cursorY, size, font, color });
    cursorY -= lineHeight;
  }
  return cursorY;
}

function drawBrand(page, x, y, light = false) {
  page.drawText("Nuts & Bolts", {
    x,
    y,
    size: 25,
    font: fontSerif,
    color: light ? colors.ivory : colors.navy,
  });
  page.drawText("I N V E S T I N G", {
    x,
    y: y - 16,
    size: 8,
    font: fontBold,
    color: colors.mint,
  });
}

function drawFooter(page, pageNumber) {
  page.drawText("Educational content only. This glossary is not financial advice.", {
    x: margin,
    y: 32,
    size: 8.5,
    font: fontRegular,
    color: colors.muted,
  });
  page.drawText(String(pageNumber).padStart(2, "0"), {
    x: pageSize[0] - margin - 14,
    y: 32,
    size: 10,
    font: fontBold,
    color: colors.navy,
  });
}

function addCover() {
  const page = doc.addPage(pageSize);
  page.drawRectangle({ x: 0, y: 0, width: pageSize[0], height: pageSize[1], color: colors.navy });
  page.drawRectangle({ x: 0, y: 0, width: pageSize[0], height: pageSize[1], color: colors.navySoft, opacity: 0.24 });

  drawBrand(page, margin, 780, true);
  page.drawText("FREE PLAIN-ENGLISH GUIDE", {
    x: margin,
    y: 570,
    size: 9,
    font: fontBold,
    color: colors.mint,
  });

  page.drawText("Beginner Investing", { x: margin, y: 515, size: 47, font: fontSerif, color: colors.ivory });
  page.drawText("Glossary", { x: margin, y: 460, size: 47, font: fontSerif, color: colors.ivory });

  drawParagraph(
    page,
    "A calm, jargon-free guide to the investing words beginners are most likely to meet.",
    margin,
    390,
    420,
    { size: 14, lineHeight: 20, color: rgb(0.86, 0.88, 0.92) }
  );

  page.drawRectangle({
    x: margin,
    y: 105,
    width: 420,
    height: 104,
    color: rgb(0.18, 0.23, 0.42),
    borderColor: colors.mint,
    borderWidth: 0.8,
  });
  drawParagraph(
    page,
    "Use this glossary when a term stops you mid-sentence. The goal is not to memorise every word, but to make investing language feel less intimidating.",
    margin + 18,
    178,
    384,
    { size: 10.5, lineHeight: 15.5, color: colors.ivory }
  );
  page.drawText("Educational content only. This is not financial advice.", {
    x: margin,
    y: 58,
    size: 9,
    font: fontRegular,
    color: rgb(0.78, 0.83, 0.86),
  });
}

function addTermsPages() {
  let page;
  let y;
  let column = 0;
  let pageNumber = 1;

  function newPage() {
    page = doc.addPage(pageSize);
    pageNumber += 1;
    column = 0;
    y = 720;
    page.drawRectangle({ x: 0, y: 0, width: pageSize[0], height: pageSize[1], color: colors.paper });
    page.drawText("Glossary Terms", { x: margin, y: 775, size: 27, font: fontSerif, color: colors.navy });
    page.drawText("PLAIN ENGLISH", { x: margin, y: 750, size: 8, font: fontBold, color: colors.mintDeep });
    drawBrand(page, pageSize[0] - margin - 98, 775);
    page.drawLine({
      start: { x: margin, y: 735 },
      end: { x: pageSize[0] - margin, y: 735 },
      thickness: 1,
      color: colors.line,
    });
    drawFooter(page, pageNumber - 1);
  }

  newPage();

  for (const [term, definition] of terms) {
    const lines = wrapText(definition, fontRegular, 9.2, colWidth - 28);
    const cardHeight = Math.max(78, 45 + lines.length * 13);
    if (y - cardHeight < 68) {
      if (column === 0) {
        column = 1;
        y = 720;
      } else {
        newPage();
      }
    }

    const x = margin + column * (colWidth + colGap);
    page.drawRectangle({
      x,
      y: y - cardHeight,
      width: colWidth,
      height: cardHeight,
      color: colors.white,
      borderColor: colors.line,
      borderWidth: 1,
    });
    page.drawText(term, {
      x: x + 14,
      y: y - 24,
      size: 12.5,
      font: fontBold,
      color: colors.navy,
    });
    drawParagraph(page, definition, x + 14, y - 43, colWidth - 28, {
      size: 9.2,
      lineHeight: 13,
    });
    y -= cardHeight + 12;
  }

  if (y - 92 < 68 && column === 0) {
    column = 1;
    y = 720;
  }

  const x = margin + column * (colWidth + colGap);
  page.drawRectangle({
    x,
    y: y - 92,
    width: colWidth,
    height: 92,
    color: colors.softMint,
    borderColor: colors.line,
    borderWidth: 1,
  });
  page.drawText("Beginner reminder", {
    x: x + 14,
    y: y - 24,
    size: 12.5,
    font: fontBold,
    color: colors.navy,
  });
  drawParagraph(
    page,
    "You do not need to know every term before you start learning. Focus on understanding the words that help you make calmer, better-informed decisions.",
    x + 14,
    y - 44,
    colWidth - 28,
    { size: 9.2, lineHeight: 13 }
  );
}

addCover();
addTermsPages();

const pdfBytes = await doc.save();
await fs.writeFile(output, pdfBytes);
console.log(`Created ${output}`);
