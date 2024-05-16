import express from "express";
import usersRouter from "./api/users.router.js";
import cardsRouter from "./api/cards.router.js";
import handleError from "../utils/handleError.js";

import getAllProductsController from "./api/produt.js";

const router = express.Router();

router.use("/users", usersRouter);

router.use("/cards", cardsRouter);

router.get("/product", getAllProductsController);

export default router;
