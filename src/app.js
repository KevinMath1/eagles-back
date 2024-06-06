
import "dotenv/config";
import EaglesController from "./controller/EaglesController.js";
import express from "express";
import cors from "cors";

const servidor = express();
servidor.use(cors());
servidor.use(express.json());
servidor.use(EaglesController);

const port = process.env.PORTA || 3000;

// Configurar o servidor para escutar em todas as interfaces de rede (0.0.0.0)
servidor.listen(port, '0.0.0.0', () => {
    servidor.listen(port, () => console.log("API SUBIU! " + port));
});