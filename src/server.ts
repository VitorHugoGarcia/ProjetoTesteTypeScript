import express, {Request, Response} from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const hostname = "127.0.0.1";

app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());

app.listen(port, hostname, () => {
  console.log(`Servidor iniciado`);
});

//Criação da rota Usuario
const usuarioRoute = require("./Model/Usuario");
app.use("/Usuario", usuarioRoute);