import express from "express";
import usuarioRoute from "./routes/usuarioRoutes";
import dontenv from "dotenv";

dontenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route Usuario
app.use("/Usuario", usuarioRoute);

export default app;