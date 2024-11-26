import Task from "../modals/Task";

export default class TaskController {
  private tasks: Task[];

  constructor() {
    this.tasks = []; 
  }


  addTask(taskText: string): Task {
    const newTask = new Task(this.tasks.length + 1, taskText);
    this.tasks.push(newTask);
    return newTask;
  }


  getAllTasks(): Task[] {
    return this.tasks;
  }


  editTask(id: number, updatedText: string): Task | undefined {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.task = updatedText;
      return task;
    }
    return undefined;
  }

 
  deleteTask(id: number): boolean {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1); 
      return true;
    }
    return false;
  }

 
  toggleTask(id: number): Task | undefined {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      return task;
    }
    return undefined;
  }
}
