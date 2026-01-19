const path = require("path");
const csv = require("csvtojson");

async function readCsv(fileName) {
  const filePath = path.join(__dirname, "..", "data", fileName);
  const rows = await csv().fromFile(filePath);

  // تحويل قيم boolean إذا موجودة
  for (const r of rows) {
    if (r.available === "true") r.available = true;
    if (r.available === "false") r.available = false;
  }

  return rows;
}

module.exports = { readCsv };
