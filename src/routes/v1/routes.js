const express = require("express");
const router = express.Router();
const UserRouter = require("./controllers/users/users.routes");

router.use("/user", UserRouter);

module.exports = router;
