import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.controller.js";
import auth from "../middleware/auth.middleware.js"

const router = Router();

router.route("/createTodo").post(auth, createTodo);
router.route("/getTodos").get(auth, getTodos);
router.route("/updateTodo/:id").put(auth, updateTodo);
router.route("/deletetodo/:id").delete(auth, deleteTodo);


export default router;
