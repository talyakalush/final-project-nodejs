import express from "express";
import {
  createCardController,
  getAllCardsController,
  getCardByIdController,
  getMyCardsController,
  updateCardController,
  deleteCardController,
  patchBizNumberController,
  patchLikeController,
} from "../../controllers/cards.controller.js";
import adminOrOwn from "../../middlewares/adminOrOwn.mw.js";
import objectIdParamsValidationMiddleware from "../../middlewares/objectIdParamsValidation.mw.js";
import authMiddleware from "../../middlewares/auth.mw.js";
import isBizMiddleware from "../../middlewares/isBiz.mw.js";
import bodyValidationMiddleware from "../../middlewares/bodyValidation.mw.js";
import { createCardValidation } from "../../validation/validationAdapter.js";
import adminOrBizMiddleware from "../../middlewares/adminOrBizOwn.mw.js";
import isAdminMiddleware from "../../middlewares/isAdmin.mw.js";
import validateBizSchema from "../../validation/joi/cards/BizValidation.js";
const router = express.Router();

router.get("/", getAllCardsController);

router.get("/my-cards", authMiddleware, getMyCardsController);
router.get("/:id", objectIdParamsValidationMiddleware, getCardByIdController);

router.post(
  "/",
  authMiddleware,
  isBizMiddleware,
  bodyValidationMiddleware(createCardValidation),
  createCardController
);
router.put(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,

  adminOrBizMiddleware,

  bodyValidationMiddleware(createCardValidation),
  updateCardController
);
router.patch(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  patchLikeController
);
router.patch(
  "/biz-number/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  bodyValidationMiddleware(validateBizSchema),
  isAdminMiddleware,
  patchBizNumberController
);
router.delete(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrBizMiddleware,
  deleteCardController
);

export default router;
