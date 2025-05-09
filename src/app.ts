import express from "express";
import usuarioRoute from "./routes/usuarioRoutes";

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route Usuario
app.use("/Usuario", usuarioRoute);

export default app;