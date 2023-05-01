import express from "express";
// dont know what this does yet 
// import cors from "cors";

import * as dotenv from "dotenv";
import { accountController, houseController, orderController, ratingController, } from "./controller";

dotenv.config();
const api = express();
const port = process.env.BACKEND_PORT ?? 4000;

api.use(express.json());
// api.use(cors());

// api.use("/account", accountController);
// api.use("/house", houseController);
// api.use("/order", orderController);
// api.use("/rating", ratingController);

api.listen(port, () => console.log(`[House Catalogue Backend] is listening on port ${port}`));
