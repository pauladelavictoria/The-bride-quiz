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

// Configuramos el servidor
server.use(cors());

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

// Importar JSON
const hangman = require("../web/src/data/hangman.json");

// endpoint para enviar los nombres de las participantes a la bbdd
server.post("/playersPage", (req, res) => {
  if (req.body.name !== "") {
    const newPlayer = {
      ...req.body,
      id: uuidv4(),
    };
    const local_host = `http://localhost:4000/playersPage`;
    const insertData = db.prepare(`INSERT INTO players(uuid, name) 
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
server.delete("/playersPage", (req, res) => {
  const query = db.prepare("DELETE FROM players WHERE name = ?");
  const result = query.run(req.body.name);
  res.json(result);
});

// endpoint para guardar los nombres de las participantes a la bbdd
// //Endpoint perfil de usuario
// server.post('/user/profile', (req, res) => {
//   console.log('Petición a la ruta POST /user/profile');
//   const userId = req.header('user-id');
//   const query = db.prepare('UPDATE users SET name= ?, email = ?, password = ? WHERE id = ?');
//   const result = query.run(req.body.name, req.body.email, req.body.password, userId);

//   res.json({
//     success: true,
//   });
// });

// //Endpoint recuperar datos del perfil de usuario
// server.get('/user/profile', (req, res) => {
//   console.log('Petición a la ruta GET /user/profile');
//   const userId = req.header('user-id');
//   const query = db.prepare('SELECT name, email, password FROM users WHERE id=?');
//   const result = query.get(userId);
//   res.json(result);
// });

// Palabras para el juego del ahorcado
server.get("/Pruebas/Prueba3", (req, res) => {
  const queryWord = db.prepare("SELECT word, clue FROM hangman WHERE id= 1");

  const newWord = query.get('?', '?');
    
  const newWord = {
     word: word,
     clue: clue
    };

  
  const response = {
    success: true,
    newWord: newWord,
  };
  res.json(response);
});
