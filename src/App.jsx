import { useState } from "react"
import "./App.css"

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  // Add task
  const addTask = () => {
    if (task.trim() === "") return

    const newTask = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    }

    setTasks([...tasks, newTask])
    setTask("")
  }

  // Done / Undo task
  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    )
  }

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id))
  }

  return (
    <div className="todo-container">

      <div className="todo-card">

        {/* Header */}
        <div className="todo-header">
          <h1>My To-Do List</h1>
          <p>Keep your tasks organized ✨</p>
        </div>

        {/* Input */}
        <div className="input-area">
          <input
            type="text"
            placeholder="What do you need to do?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask()
              }
            }}
          />

          <button onClick={addTask}>
            Add
          </button>
        </div>

        {/* Task count */}
        <div className="task-info">
          <span>
            {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          </span>

          <span>
            {tasks.filter((item) => item.completed).length} completed
          </span>
        </div>

        {/* Task list */}
        <div className="task-list">

          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet.</p>
              <span>Add something you need to do!</span>
            </div>
          ) : (
            tasks.map((item) => (
              <div
                className={`task-item ${
                  item.completed ? "task-completed" : ""
                }`}
                key={item.id}
              >

                <div className="task-text">
                  <span className={item.completed ? "completed" : ""}>
                    {item.text}
                  </span>
                </div>

                <div className="task-buttons">

                  <button
                    className="done-button"
                    onClick={() => toggleTask(item.id)}
                  >
                    {item.completed ? "Undo" : "Done"}
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => deleteTask(item.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

        {/* Instructions */}
        <div className="instructions">
          <h3>How to use</h3>
          <p>• Type a task and click Add.</p>
          <p>• Press Enter to quickly add a task.</p>
          <p>• Click Done when you finish a task.</p>
          <p>• Click Delete to remove a task.</p>
        </div>

      </div>

    </div>
  )
}

export default App