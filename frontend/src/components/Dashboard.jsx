import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; 
import API from "./services/api";

function Dashboard() {
  const navigate = useNavigate();

  // Tasks
  const [tasks, setTasks] = useState([]);

  // Form Data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  // Edit Mode
  const [editId, setEditId] = useState(null);

  // Dashboard open thay etle tasks load
 useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    fetchTasks();
  }
}, []);

  // ================= GET TASKS =================
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load tasks");
    }
  };

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTask = async () => {
    try {
      const token = localStorage.getItem("token");

      if (editId) {
       
        await API.put(`/task/${editId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Task Updated Successfully");
      } else {
        // CREATE
        await API.post("/task", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Task Added Successfully");
      }

      // Reset Form
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
      });

      setEditId(null);

      // Refresh List
      fetchTasks();

    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  // ================= DELETE TASK =================
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Task Deleted");

      fetchTasks();

    } catch (error) {
      console.log(error);
      alert("Failed to delete task");
    }
  };

  // ================= LOGOUT =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard">

      {/* Navbar */}
      <div className="navbar">
        <h2>TaskHub</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Container */}
      <div className="container">

        <h1>Welcome to TaskHub 🎉</h1>

        <div className="top-section">
          <h2>My Tasks</h2>
        </div>

        {/* Add / Edit Form */}
        <div className="task-form">

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <button className="add-btn" onClick={handleAddTask}>
            {editId ? "Update Task" : "+ Add Task"}
          </button>

        </div>

        {/* Task Cards */}
        <div className="cards">

          {tasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            tasks.map((task) => (
              <div className="card" key={task._id}>

                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <span className="priority">
                  {task.priority}
                </span>

                <div className="card-footer">

                  <button
                    className="edit"
                    onClick={() => {
                      setEditId(task._id);
                      setFormData({
                        title: task.title,
                        description: task.description,
                        priority: task.priority,
                      });
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;