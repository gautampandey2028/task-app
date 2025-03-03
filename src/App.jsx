import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center text-white p-6"
      style={{ backgroundImage: "url('/task2.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 text-center max-w-3xl p-10 bg-smokey-900 bg-opacity-20 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold mb-4 text-black-400">Boost Your Productivity</h1>
        <p className="text-lg mb-6 text-black-300">
          Manage your tasks efficiently with our intuitive and easy-to-use task manager.
        </p>
        <Link
          to="/task-manager"
          className="px-8 py-4 bg-blue-500 text-white font-bold text-lg rounded-full shadow-lg hover:bg-blue-600 transition transform hover:scale-105"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

function TaskManager() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks")) || []);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskName.trim()) return;
    
    const now = new Date();
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(now);

    const newTask = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      completed: false,
      date: formattedDate,
    };

    setTasks([...tasks, newTask]);
    setTaskName("");
    setTaskDescription("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div
      className="max-w-xl mx-auto p-6 bg-cover bg-center text-white shadow-lg rounded-lg min-h-screen mt-20"
      style={{ backgroundImage: "url('/task-bg.jpg')" }}
    >
      <div className="bg-black bg-opacity-80 p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">Task Manager</h1>
        <div className="flex flex-col gap-3 mb-6 p-4 bg-gray-800 rounded-lg shadow">
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="p-3 border rounded focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
          />
          <textarea
            placeholder="Task Description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="p-3 border rounded focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white"
          />
          <button onClick={addTask} className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Add Task
          </button>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {["all", "completed", "pending"].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition font-semibold ${
                filter === status ? "bg-blue-500 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <ul className="space-y-4">
          {filteredTasks.map(task => (
            <li key={task.id} className="p-4 border rounded-lg flex justify-between items-center bg-gray-800 shadow-sm hover:shadow-md transition">
              <div>
                <p className={`font-semibold text-lg ${task.completed ? "line-through text-gray-400" : "text-white"}`}>{task.name}</p>
                <p className="text-sm text-gray-400">{task.description}</p>
                <p className="text-xs text-gray-500 mt-1">Added on: {task.date}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => toggleTask(task.id)} className="p-2 text-green-400 bg-green-700 rounded-full hover:bg-green-600 transition">✔</button>
                <button onClick={() => deleteTask(task.id)} className="p-2 text-red-400 bg-red-700 rounded-full hover:bg-red-600 transition">✖</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md fixed top-0 w-full z-10">
      <h1 className="text-xl font-bold">Task App</h1>
      <nav>
        <Link to="/" className="mx-3 hover:text-blue-400 transition">Home</Link>
        <Link to="/task-manager" className="mx-3 hover:text-blue-400 transition">Task Manager</Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 shadow-md fixed bottom-0 w-full">
      <p>&copy; 2025 Task Manager. All rights reserved.</p>
    </footer>
  );
}

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task-manager" element={<TaskManager />} />
      </Routes>
      <Footer />
    </Router>
  );
}
