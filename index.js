const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API działa!');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Tymczasowa symulacja logowania
  if (email === 'test@test.com' && password === '1234') {
    res.status(200).json({ message: 'Zalogowano pomyślnie' });
  } else {
    res.status(401).json({ message: 'Błąd logowania' });
  }
});

app.listen(PORT, () => {
  console.log(`API działa na http://localhost:${PORT}`);
});
