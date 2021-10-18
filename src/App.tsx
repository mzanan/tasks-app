import React, { useState, useRef } from "react";

interface iTask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<iTask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const allTasks: iTask[] = [...tasks, { name, done: false }];
    setTasks(allTasks);
  };

  const toggleDoneTask = (i: number): void => {
    const allTasks: iTask[] = [...tasks];
    allTasks[i].done = !allTasks[i].done;
    setTasks(allTasks);
  };

  const removeTask = (i: number): void => {
    const allTasks: iTask[] = [...tasks];
    allTasks.splice(i, 1);
    setTasks(allTasks);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  className="form-control"
                  autoFocus
                  ref={taskInput}
                />
                <div className="d-grid gap-2">
                  <button className="btn btn-success mt-2">Add</button>
                </div>
              </form>
            </div>
          </div>
          {tasks.map((t: iTask, i: number) => (
            <div className="card card-body mt-2">
              <div className="d-flex justify-content-between" key={i}>
                <h4 style={{ textDecoration: t.done ? "line-through" : "" }}>
                  {t.name}
                </h4>
                <div className="">
                  <button
                    className="btn btn-secondary"
                    onClick={() => toggleDoneTask(i)}
                  >
                    {t.done ? "✗" : "✓"}
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() => removeTask(i)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
