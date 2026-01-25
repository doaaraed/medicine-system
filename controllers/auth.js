const createError = require("http-errors");
const { hashSync, compareSync } = require("bcryptjs");
const { readUsers, appendUser, newId } = require("../utils/usersCsv");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(createError(400, "All fields are required (username, email, password)"));
  }

  try {
    const users = await readUsers();
    const exists = users.find(u => u.username === username);
    if (exists) return next(createError(400, "Username already taken"));

    const password_hash = hashSync(password, 12);

    const userRow = {
      id: newId(),
      username,
      email,
      password_hash,
      created_at: new Date().toISOString()
    };

    await appendUser(userRow);

    res.status(201).json({
      status: true,
      message: "User created",
      data: { id: userRow.id, username: userRow.username, email: userRow.email }
    });
  } catch (err) {
    next(createError(500, err.message));
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(createError(400, "All fields are required (username, password)"));
  }

  try {
    const users = await readUsers();
    const user = users.find(u => u.username === username);

    if (!user) return next(createError(401, "User not found"));

    const ok = compareSync(password, user.password_hash);
    if (!ok) return next(createError(401, "Invalid password"));

    res.json({
      status: true,
      message: "Login successful",
      data: { id: user.id, username: user.username, email: user.email }
    });
  } catch (err) {
    next(createError(500, err.message));
  }
};

module.exports = { signup, login };