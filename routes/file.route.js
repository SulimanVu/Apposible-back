const Router = require("express");
const router = Router();
const authMiddleware = require("../middleware/auth.middleware");
const { fileController } = require("../controllers/file.controller");

router.post("", authMiddleware, fileController.createDir);
router.post("/upload", authMiddleware, fileController.fileUpload);
router.get("", authMiddleware, fileController.getFiles);
router.get("/download", authMiddleware, fileController.downLoadFile);
router.delete("/", authMiddleware, fileController.deleteFile);

module.exports = router;
