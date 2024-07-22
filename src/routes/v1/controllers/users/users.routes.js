const express = require("express");
const router = express.Router();
const {
	AddUserController,
	GetAllUsersController,
	GetUserByUserIdController,
	UpdateUserByUserIdController,
	DeleteUserByUserIdController,
} = require("./index");
const { verifyV1ApiKey } = require("../../../../middlewares/api-key");

router.get("/", verifyV1ApiKey, GetAllUsersController);
router.post("/", verifyV1ApiKey, AddUserController);
router.get("/:userId", verifyV1ApiKey, GetUserByUserIdController);
router.put("/:userId", verifyV1ApiKey, UpdateUserByUserIdController);
router.delete("/:userId", verifyV1ApiKey, DeleteUserByUserIdController);

module.exports = router;
