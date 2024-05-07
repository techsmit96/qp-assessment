import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "./config.env") });

const app: express.Application = express();

//middleware of json parsing
app.use(express.json());

import routerMapping from "./routes/routeMapping";
import questionPro from "./config/db";

app.use("/api", routerMapping);

app.listen(process.env.PORT, () => {
  console.log(`server is runnnig on port ${process.env.PORT}`);
});
questionPro
  .authenticate()
  .then(() => {
    console.log(
      `Connected to ${questionPro.config.database}`
    );
  })
  .catch((err) => {
    console.log(`Can't connect to DB: ${err.message}`);
  });
