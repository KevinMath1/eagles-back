import "dotenv/config";

import EaglesController from "./controller/EaglesController.js";
import express from "express";
import cors from "cors";

const servidor = express();
servidor.use(cors());
servidor.use(express.json());
servidor.use(EaglesController);
let port = process.env.PORTA || 3000;
servidor.listen(port, () => console.log("API SUBIU! " + port));
