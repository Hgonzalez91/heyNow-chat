import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getMessages,
  createMessage,
  deleteMessage,
  updateMessage,
} from "../controllers/messages.controller.js";

const router = Router();

router.get("/messages", authRequired, getMessages);
router.post("/message", authRequired, createMessage);
router.delete("/message/:id", authRequired, deleteMessage);
router.put("/message/:id", authRequired, updateMessage);

export default router;
