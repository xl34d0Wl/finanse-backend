const express = require('express');
const bcrypt = require('bcrypt');
const { poolPromise } = require('./db');
const app = express();
const cors = require ('cors');
app.use(cors());
app.use(express.json());

// Logowanie
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('email', email)
      .query('SELECT * FROM Users WHERE Email = @email');

    const user = result.recordset[0];

    if (!user) return res.status(401).json({ message: 'Nieprawidłowy email' });

    const match = await bcrypt.compare(password, user.PasswordHash);
    if (!match) return res.status(401).json({ message: 'Nieprawidłowe hasło' });

    res.json({ message: 'Zalogowano pomyślnie', userId: user.Id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd serwera' });
  }
});
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const pool = await poolPromise;
    await pool
      .request()
      .input('email', email)
      .input('password', hashed)
      .query(`
        INSERT INTO Users (Email, PasswordHash)
        VALUES (@email, @password)
      `);
    res.status(201).json({ message: 'Zarejestrowano użytkownika' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Błąd rejestracji' });
  }
});


