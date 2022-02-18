

// Importamos los dos módulos de NPM necesarios para trabajar
const express = require("express");
const cors = require("cors");

// //Base de datos
// const Database = require('better-sqlite3');
// const db = new Database('./src/data/cards.db', { verbose: console.log });

//importamos uuid
const { v4: uuidv4 } = require('uuid');

// Creamos el servidor
const server = express();

// Configuramos el servidor
server.use(cors());
server.use(express.json());

// Configuramos el servidor
server.use(cors());

// para el motor de plantillas
server.set('view engine', 'ejs');

// Arrancamos el servidor en el puerto 3000
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//servidor de estáticos
const staticServerPath = './src/public-react';
const staticServerPathStyle = './src/public-css';
server.use(express.static(staticServerPath));
server.use(express.static(staticServerPathStyle));

// Importar JSON
const hangman = require("../web/src/data/hangman.json");

// endpoint para enviar los nombres de las participantes a la bbdd
server.post("/playersPage", (req, res) => {
  if (
    req.body.name !== '') {
    const newPlayer = {
      ...req.body,
      id: uuidv4(),
    };
    const local_host = `http://localhost:4000/playersPage`;
    const insertData =
      db.prepare(`INSERT INTO players(uuid, name) 
    VALUES (?,?)`);
    insertData.run(
     newPlayer.name
    );
    const responseSuccess = {
      success: true,
    };

    res.json(responseSuccess);
  } else {
    const responseError = {
      success: false,
      cardURL: 'error',
    };
    res.json(responseError);
  }
});


// Palabras para el juego del ahorcado
server.get("/Pruebas/Prueba3", (req, res) => {
  const response = {
      success: true,
      movies
    };
  res.json(response);
});