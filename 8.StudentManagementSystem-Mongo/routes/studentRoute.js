import express from "express";

import add from "../controller/studentController.js";

const router = express.Router();

router.post("/", add);

export default router;