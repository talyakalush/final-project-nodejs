import express from "express";
import {
  deleteUserController,
  loginController,
  registerController,
  updateUserController,
  patchIsBizController,
  getAllUsersController,
  getUserByIdController,
  resetPassword,
  forgotPassword,
} from "../../controllers/users.controller.js";
import bodyValidationMiddleware from "../../middlewares/bodyValidation.mw.js";
import {
  loginValidation,
  registerValidation,
  editUserValidation,
} from "../../validation/validationAdapter.js";
import authMiddleware from "../../middlewares/auth.mw.js";
import adminOrOwn from "../../middlewares/adminOrOwn.mw.js";
import objectIdParamsValidationMiddleware from "../../middlewares/objectIdParamsValidation.mw.js";
import isAdminMiddleware from "../../middlewares/isAdmin.mw.js";
import validateObjectBizSchema from "../../validation/joi/users/isBiz.js";

const router = express.Router();

router.get("/", authMiddleware, isAdminMiddleware, getAllUsersController);
router.post(
  "/register",
  bodyValidationMiddleware(registerValidation),
  registerController
);

router.post(
  "/login",
  bodyValidationMiddleware(loginValidation),

  loginController
);

router.post("/forgotPassword", forgotPassword);

router.post("/resetPassword/:token", resetPassword);
router.get(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrOwn,
  getUserByIdController
);

router.put(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrOwn,
  bodyValidationMiddleware(editUserValidation),
  updateUserController
);

router.patch(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrOwn,
  bodyValidationMiddleware(validateObjectBizSchema),
  patchIsBizController
);

router.delete(
  "/:id",
  authMiddleware,
  objectIdParamsValidationMiddleware,
  adminOrOwn,
  deleteUserController
);

export default router;
