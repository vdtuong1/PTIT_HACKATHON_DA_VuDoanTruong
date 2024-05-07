interface ITodoList {
    id: number;
    name: string;
    completed: boolean;
  }
  
  class TodoList implements ITodoList {
    id: number;
    name: string;
    completed: boolean;
  
    constructor(name: string) {
      this.id = Date.now();
      this.name = name;
      this.completed = false;
    }
  
    renderJob(element: HTMLElement, todoList: TodoList[]) {
      const jobItem = document.createElement("li");
      jobItem.id = `job-${this.id}`;
  
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = this.completed;
      checkbox.addEventListener("change", (event) => {
        this.updateJob(event.target.checked);
        TodoList.saveToLocalStorage(todoList);
      });
  
      const editButton = document.createElement("button");
      editButton.textContent = "Sửa";
      editButton.classList.add("edit-button");
      editButton.addEventListener("click", () => {
        // Thêm logic chỉnh sửa công việc ở đây
      });
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Xoá";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => {
        const index = todoList.findIndex((job) => job.id === this.id);
        if (index !== -1) {
          todoList.splice(index, 1);
          jobItem.remove();
          TodoList.saveToLocalStorage(todoList);
        }
      });
  
      const jobName = document.createElement("span");
      jobName.textContent = this.name;
  
      jobItem.appendChild(checkbox);
      jobItem.appendChild(jobName);
      jobItem.appendChild(editButton);
      jobItem.appendChild(deleteButton);
  
      element.appendChild(jobItem);
    }
  
    static createJob(name: string): TodoList {
      return new TodoList(name);
    }
  
    updateJob(completed: boolean) {
      this.completed = completed;
    }
  
    deleteJob() {}
  
    static saveToLocalStorage(todoList: TodoList[]) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  
    static loadFromLocalStorage(): TodoList[] {
      const storedList = localStorage.getItem("todoList");
      return storedList ? JSON.parse(storedList) : [];
    }
  }
  
  const todoInput = document.getElementById("new-todo-input") as HTMLInputElement;
  const addTodoButton = document.getElementById("add-todo-button")!;
  const todoListElement = document.getElementById("todo-list")!;
  let todoList: TodoList[] = TodoList.loadFromLocalStorage();
  todoList.forEach((job) => {
    const todoItem = new TodoList(job.name);
    todoItem.renderJob(todoListElement, todoList);
  });
  addTodoButton.addEventListener("click", () => {
    const newTodoText = todoInput.value.trim();
    if (newTodoText) {
      const newJob = TodoList.createJob(newTodoText);
      todoList.push(newJob);
      newJob.renderJob(todoListElement, todoList);
      TodoList.saveToLocalStorage(todoList);
      todoInput.value = "";
    }
  });
  