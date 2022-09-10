const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
});

connection.query('DROP TABLE IF EXISTS people');
connection.query('CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))');

const listNames = ["Leo", "Joao", "Jorge", "Rodrigo"];

listNames.forEach((name) => {
  connection.query('INSERT INTO people(name) VALUES(?)', [name]);
});

app.get('/', (req, res) => {
  connection.query('SELECT name FROM people', (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      let users = "<ul>";

      rows.forEach((row) => {
        users += `<li>${row.name}</li>`;
      });

      return res.send(
        "<h1>Full Cycle Rocks!</h1>" +
        "<p>- Lista de nomes cadastrada no banco de dados.</p>" +
        users + "</ul>"
      );
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
});