import { Router, Request, Response } from "express";
import TaskController from "../controllers/Taskcontroller";

const router: Router = Router();
const taskController = new TaskController();

// Route to get all tasks
router.get("/", (req: Request, res: Response) => {
  const tasks = taskController.getAllTasks();
  res.render("index", { tasks }); // Rendering the tasks in the index.ejs
});

// Route to add a new task
router.post("/add", (req: Request, res: Response) => {
  const taskText = req.body.task;
  const newTask = taskController.addTask(taskText);
  res.redirect("/"); 
});


router.post("/edit/:id", (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const updatedText = req.body.task;
  taskController.editTask(taskId, updatedText);
  res.redirect("/"); // Redirect to the home page to show the updated task list
});


router.get("/delete/:id", (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  taskController.deleteTask(taskId);
  res.redirect("/"); // Redirect to the home page after deleting the task
});


router.get("/toggle/:id", (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  taskController.toggleTask(taskId);
  res.redirect("/"); // Redirect to the home page after toggling the task completion
});

export { router }; // Export the router as a named export
