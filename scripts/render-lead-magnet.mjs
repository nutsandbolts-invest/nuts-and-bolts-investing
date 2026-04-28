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
const output = path.join(root, "lead-magnets", "beginner-investing-starter-checklist.pdf");

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

const doc = await PDFDocument.create();
const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
const fontSerif = await doc.embedFont(StandardFonts.TimesRomanBold);

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
  page.drawText("Educational content only. This checklist is not financial advice.", {
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
  const size = options.size ?? 10.5;
  const lineHeight = options.lineHeight ?? size * 1.45;
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

function drawHeading(page, text, y, options = {}) {
  page.drawText(options.eyebrow ?? "", {
    x: margin,
    y,
    size: 8,
    font: fontBold,
    color: colors.mintDeep,
  });
  page.drawText(text, {
    x: margin,
    y: y - 34,
    size: options.size ?? 26,
    font: fontSerif,
    color: colors.navy,
  });
  page.drawLine({
    start: { x: margin, y: y - 52 },
    end: { x: pageSize[0] - margin, y: y - 52 },
    thickness: 1,
    color: colors.line,
  });
  drawBrand(page, pageSize[0] - margin - 98, y - 8);
  return y - 78;
}

function drawCard(page, x, y, width, height, fill = colors.white) {
  page.drawRectangle({
    x,
    y: y - height,
    width,
    height,
    color: fill,
    borderColor: colors.line,
    borderWidth: 1,
  });
}

function drawChecklistItem(page, y, title, body) {
  const height = 78;
  drawCard(page, margin, y, contentWidth, height);
  page.drawRectangle({
    x: margin + 16,
    y: y - 30,
    width: 15,
    height: 15,
    borderColor: colors.mintDeep,
    borderWidth: 1.5,
  });
  page.drawText(title, {
    x: margin + 44,
    y: y - 24,
    size: 12,
    font: fontBold,
    color: colors.navy,
  });
  drawParagraph(page, body, margin + 44, y - 42, contentWidth - 64, {
    size: 9.5,
    lineHeight: 13.2,
  });
  return y - height - 12;
}

function drawTermCard(page, x, y, title, body) {
  const width = (contentWidth - 14) / 2;
  const height = 82;
  drawCard(page, x, y, width, height);
  page.drawText(title, {
    x: x + 14,
    y: y - 24,
    size: 12,
    font: fontBold,
    color: colors.navy,
  });
  drawParagraph(page, body, x + 14, y - 42, width - 28, {
    size: 9.2,
    lineHeight: 12.6,
  });
}

function addCover() {
  const page = doc.addPage(pageSize);
  page.drawRectangle({ x: 0, y: 0, width: pageSize[0], height: pageSize[1], color: colors.navy });
  page.drawRectangle({ x: 0, y: 0, width: pageSize[0], height: pageSize[1], color: colors.navySoft, opacity: 0.24 });

  drawBrand(page, margin, 780, true);
  page.drawText("FREE PRACTICAL GUIDE", {
    x: margin,
    y: 570,
    size: 9,
    font: fontBold,
    color: colors.mint,
  });

  const titleLines = ["Beginner Investing", "Starter Checklist"];
  let y = 515;
  for (const line of titleLines) {
    page.drawText(line, { x: margin, y, size: 47, font: fontSerif, color: colors.ivory });
    y -= 55;
  }

  drawParagraph(
    page,
    "A calm, practical starting guide for people who want to understand the stock market without hype, pressure, or jargon.",
    margin,
    390,
    430,
    { size: 14, lineHeight: 20, color: rgb(0.86, 0.88, 0.92) }
  );

  drawCard(page, margin, 205, 410, 100, rgb(0.18, 0.23, 0.42));
  drawParagraph(
    page,
    "Use this checklist before you invest your first pound, choose an account, or start comparing funds and shares. It is designed to help you slow down, understand the basics, and make your next step more deliberate.",
    margin + 18,
    176,
    374,
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

function addStepOne() {
  const page = doc.addPage(pageSize);
  page.drawRectangle({ x: 0, y: 0, width: pageSize[0], height: pageSize[1], color: colors.paper });
  let y = drawHeading(page, "Get Your Starting Point Clear", 775, { eyebrow: "STEP 1" });
  drawCard(page, margin, y + 8, contentWidth, 66, colors.softMint);
  y = drawParagraph(
    page,
    "Investing is easier to understand when you separate the learning process from the pressure to act immediately. Start by checking whether the foundations around your money are ready.",
    margin + 16,
    y - 15,
    contentWidth - 32,
    { size: 10.5, lineHeight: 15 }
  ) - 22;

  const items = [
    ["I know why I want to invest.", "Write down the reason in plain English: long-term wealth, retirement, a future house deposit, children's savings, or simply learning how markets work."],
    ["I have handled short-term essentials first.", "Before investing, check your everyday budget, emergency savings, and high-interest debt. Investing works best when it is not being used to rescue short-term pressure."],
    ["I have chosen a realistic time frame.", "Stock market investing is usually better suited to money you can leave alone for several years. If you need the money soon, risk matters more."],
    ["I understand that investments can fall as well as rise.", "A calm investor expects ups and downs. The goal is not to avoid every wobble, but to understand what you own and why you own it."],
    ["I know how much I can afford to start with.", "Your first amount does not need to be impressive. A small, sustainable starting point is better than an amount that makes you anxious."],
  ];

  for (const [title, body] of items) y = drawChecklistItem(page, y, title, body);
  drawFooter(page, 1);
}

function addStepTwo() {
  const page = doc.addPage(pageSize);
  page.drawRectangle({ x: 0, y: 0, width: pageSize[0], height: pageSize[1], color: colors.paper });
  let y = drawHeading(page, "Learn the Basic Building Blocks", 775, { eyebrow: "STEP 2" });
  const terms = [
    ["Share", "A small piece of ownership in a company. If the company does well, the share may rise. If it struggles, the share may fall."],
    ["Fund", "A basket of investments managed together. Funds can help beginners avoid relying on one single company."],
    ["Index", "A list that tracks a market or section of a market, such as large UK or US companies."],
    ["Diversification", "Spreading money across different investments so one poor result does not carry everything."],
    ["Fees", "The costs charged by platforms, funds, or products. Small fees can matter over long periods."],
    ["Risk", "The chance that results are different from what you hoped for, including the possibility of losing money."],
  ];
  const colWidth = (contentWidth - 14) / 2;
  for (let i = 0; i < terms.length; i++) {
    const x = margin + (i % 2) * (colWidth + 14);
    const cardY = y - Math.floor(i / 2) * 96;
    drawTermCard(page, x, cardY, terms[i][0], terms[i][1]);
  }
  y -= 305;
  drawCard(page, margin, y, contentWidth, 62, colors.softMint);
  drawParagraph(
    page,
    "Beginner rule of thumb: if you cannot explain what an investment is, how it makes money, what it costs, and what could go wrong, pause before buying it.",
    margin + 16,
    y - 22,
    contentWidth - 32,
    { size: 10.5, lineHeight: 15 }
  );
  y -= 88;
  y = drawChecklistItem(page, y, "I can explain the difference between a share and a fund.", "This helps you understand whether you are buying one company or a wider basket.");
  y = drawChecklistItem(page, y, "I know that low cost does not automatically mean low risk.", "A cheap investment can still fall in value. Fees matter, but they are only one part of the decision.");
  y = drawChecklistItem(page, y, "I have written down three words I need to understand better.", "Use confusion as a map. The words you pause on are often the best place to start learning.");
  drawFooter(page, 2);
}

function addStepThree() {
  const page = doc.addPage(pageSize);
  page.drawRectangle({ x: 0, y: 0, width: pageSize[0], height: pageSize[1], color: colors.paper });
  let y = drawHeading(page, "Choose Your First Sensible Action", 775, { eyebrow: "STEP 3" });
  const items = [
    ["I have researched which type of account may suit me.", "In the UK, beginners often hear about Stocks and Shares ISAs, SIPPs, and General Investment Accounts. Each has different tax treatment, access rules, and uses."],
    ["I have checked platform costs and features.", "Look at account fees, fund fees, dealing costs, regular investing options, minimum deposits, and how easy the platform is to understand."],
    ["I have avoided rushing because of online hype.", "A trending investment is not automatically a good beginner investment. Slow decisions are often better decisions."],
    ["I have decided how I will keep learning.", "Choose one trusted learning path. Jumping between random videos, hot takes, and social media threads can make simple topics feel much harder."],
  ];
  for (const [title, body] of items) y = drawChecklistItem(page, y, title, body);
  drawCard(page, margin, y + 2, contentWidth, 56, colors.softMint);
  drawParagraph(
    page,
    "Red flag check: be careful with anything promising guaranteed returns, urgent action, secret methods, or profits with little risk.",
    margin + 16,
    y - 18,
    contentWidth - 32,
    { size: 10.5, lineHeight: 15 }
  );
  y -= 88;
  page.drawText("Your Simple Starter Plan", { x: margin, y, size: 22, font: fontSerif, color: colors.navy });
  y -= 36;
  for (const prompt of [
    "My main reason for investing is:",
    "The first topic I need to understand better is:",
    "My next calm action is:",
  ]) {
    page.drawText(prompt, { x: margin, y, size: 11.5, font: fontBold, color: colors.navy });
    page.drawLine({
      start: { x: margin, y: y - 24 },
      end: { x: pageSize[0] - margin, y: y - 24 },
      thickness: 1,
      color: colors.line,
    });
    y -= 58;
  }
  drawFooter(page, 3);
}

function addFinalPage() {
  const page = doc.addPage(pageSize);
  page.drawRectangle({ x: 0, y: 0, width: pageSize[0], height: pageSize[1], color: colors.paper });
  let y = drawHeading(page, "What To Do After This Checklist", 775, { eyebrow: "KEEP GOING" });
  const plans = [
    ["1. Build your vocabulary", "Pick one investing term per day and learn it well enough to explain it to someone else."],
    ["2. Understand accounts first", "Before comparing investments, understand the account or wrapper you may hold them inside."],
    ["3. Compare slowly", "Do not compare only past performance. Also look at risk, fees, diversification, and time frame."],
    ["4. Write down your rules", "Decide what you will avoid, how much you can afford, and when you will review your plan."],
  ];
  const colWidth = (contentWidth - 14) / 2;
  for (let i = 0; i < plans.length; i++) {
    const x = margin + (i % 2) * (colWidth + 14);
    const cardY = y - Math.floor(i / 2) * 98;
    drawTermCard(page, x, cardY, plans[i][0], plans[i][1]);
  }
  y -= 230;
  drawCard(page, margin, y, contentWidth, 82, colors.softMint);
  page.drawText("Your next learning step", { x: margin + 16, y: y - 24, size: 13, font: fontBold, color: colors.navy });
  drawParagraph(
    page,
    "If you want a structured beginner path, the Nuts & Bolts Investing course is designed to explain the basics calmly, practically, and in plain English.",
    margin + 16,
    y - 44,
    contentWidth - 32,
    { size: 10.5, lineHeight: 15 }
  );
  y -= 112;
  drawCard(page, margin, y, contentWidth, 70, colors.white);
  drawParagraph(
    page,
    "Remember: the goal at the beginning is not to sound clever. The goal is to understand enough to make calm, informed decisions and avoid being pushed around by hype.",
    margin + 16,
    y - 24,
    contentWidth - 32,
    { size: 10.5, lineHeight: 15 }
  );
  y -= 100;
  page.drawText("Important note", { x: margin, y, size: 14, font: fontBold, color: colors.navy });
  drawParagraph(
    page,
    "This guide is for education only and does not take into account your personal circumstances. Investing involves risk, and the value of investments can go down as well as up. Consider speaking to a qualified financial adviser if you need personal advice.",
    margin,
    y - 24,
    contentWidth,
    { size: 10, lineHeight: 14.5 }
  );
  page.drawText("nutsandboltsinvesting.com", { x: margin, y: 32, size: 8.5, font: fontRegular, color: colors.muted });
  page.drawText("04", { x: pageSize[0] - margin - 14, y: 32, size: 10, font: fontBold, color: colors.navy });
}

addCover();
addStepOne();
addStepTwo();
addStepThree();
addFinalPage();

const pdfBytes = await doc.save();
await fs.writeFile(output, pdfBytes);
console.log(`Created ${output}`);
