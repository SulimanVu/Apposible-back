const { Router } = require("express");
const router = Router();
const { userController } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/users", userController.getUser);
router.post("/registr", userController.registration);
router.post("/login", userController.login);
router.delete("/user/:id", authMiddleware, userController.deleteUser);

module.exports = router;
