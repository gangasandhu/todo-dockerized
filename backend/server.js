// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


// Initialize Database Table
const initDB = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE
      )
    `);
    console.log('Database initialized');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};

initDB();

app.use('/api/todos', todoRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
