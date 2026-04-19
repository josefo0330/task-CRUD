const db = require("./db/connectionn");

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);
`;

const createTasksTable = `
CREATE TABLE IF NOT EXISTS task (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  descripcion TEXT,
  estado ENUM('pendiente', 'completada') DEFAULT 'pendiente'
);
`;

db.query(createUsersTable, (err) => {
  if (err) {
    console.error("Error creating users table:", err);
  } else {
    console.log("Users table created or already exists.");
  }
});

db.query(createTasksTable, (err) => {
  if (err) {
    console.error("Error creating task table:", err);
  } else {
    console.log("Task table created or already exists.");
  }
  db.end();
});