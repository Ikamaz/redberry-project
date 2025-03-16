import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import useStore from "./store/store";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask";
import TaskDetails from "./pages/TaskDetails";
import Navbar from "./components/Navbar";
import './index.css'

function App() {
  const { fetchStatuses, fetchPriorities, fetchDepartments, fetchEmployees, fetchTasks } = useStore();

  useEffect(() => {
    fetchStatuses();
    fetchPriorities();
    fetchDepartments();
    fetchEmployees();
    fetchTasks();
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
