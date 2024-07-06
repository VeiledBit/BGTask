import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "http";
import cors from "cors";
import router from "./src/routes/router";

const app = express();
const server = createServer(app);

app.use(cors());
app.use("/", router);

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
  console.log(`Listening at http://localhost:${PORT}`);
});