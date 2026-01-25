const path = require("path");
const fs = require("fs/promises");
const csv = require("csvtojson");
const { v4: uuidv4 } = require("uuid");

const USERS_FILE = path.join(__dirname, "..", "data", "users.csv");

async function ensureUsersFile() {
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, "id,username,email,password_hash,created_at\n", "utf8");
  }
}

async function readUsers() {
  await ensureUsersFile();
  const rows = await csv().fromFile(USERS_FILE);
  return rows;
}

async function appendUser(userRow) {
  await ensureUsersFile();
  // سطر CSV واحد
  const line =
    `${userRow.id},${escapeCsv(userRow.username)},${escapeCsv(userRow.email)},${escapeCsv(userRow.password_hash)},${escapeCsv(userRow.created_at)}\n`;
  await fs.appendFile(USERS_FILE, line, "utf8");
}

function escapeCsv(v) {
  if (v === null || v === undefined) return "";
  const s = String(v);
  // لو فيها فاصلة/اقتباس/سطر جديد نغلفها باقتباس ونهرّب الاقتباس
  if (/[,"\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function newId() {
  return uuidv4();
}

module.exports = { readUsers, appendUser, newId };