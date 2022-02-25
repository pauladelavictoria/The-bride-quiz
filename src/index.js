// Importamos los dos módulos de NPM necesarios para trabajar
const express = require("express");
const cors = require("cors");

// //Base de datos
const Database = require("better-sqlite3");
const db = new Database("./src/bbdd/TheBrideQuiz.db", { verbose: console.log });

//importamos uuid
const { v4: uuidv4 } = require("uuid");

// Creamos el servidor
const server = express();

// Configuramos el servidor
server.use(cors());
server.use(express.json());

// para el motor de plantillas
server.set("view engine", "ejs");

// Arrancamos el servidor en el puerto 3000
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

//servidor de estáticos
const staticServerPath = "./src/public-react";
const staticServerPathStyle = "./src/public-css";
server.use(express.static(staticServerPath));
server.use(express.static(staticServerPathStyle));


// endpoint para enviar los nombres de las participantes a la bbdd
server.post("/players", (req, res) => {
  if (req.body.name !== "") {
    const newPlayer = {
      ...req.body,
      id: uuidv4(),
    };
    const local_host = `http://localhost:4000/playersPage`;
    const insertData = db.prepare(`INSERT INTO players(id, name) 
    VALUES (?,?)`);
    insertData.run(newPlayer.id, newPlayer.name);
    const responseSuccess = {
      success: true,
      playerData: newPlayer,
    };

    res.json(responseSuccess);
  } else {
    const responseError = {
      success: false,
      playerData: "error",
    };
    res.json(responseError);
  }
});

// endpoint para eliminar los nombres de las participantes a la bbdd
server.delete("/players", (req, res) => {
  const query = db.prepare("DELETE FROM players WHERE id = ?");
  const result = query.run(req.body.id);
  res.json({id: req.body.id});
});

// endpoint para cargar todas las jugadoras al iniciar
server.get("/players", (req, res) => {
  const query = db.prepare("SELECT * from players");
  const result = query.all();
  res.json(result);
});

// endpoint para las palabras del juego 3
server.get("/hangmanwords", (req, res) => {
  const query = db.prepare("SELECT * from hangman");
  const result = query.all();
  res.json(result);
});

