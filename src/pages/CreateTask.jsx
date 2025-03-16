import { useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import ka from "date-fns/locale/ka";
import "react-datepicker/dist/react-datepicker.css";
import useStore from "../store/store";

registerLocale("ka", ka);

function CreateTask() {
  const { createTask, employees, priorities, statuses, departments } = useStore();

  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    priority_id: "",
    status_id: "",
    department_id: "",
    employee_id: "",
    due_date: "",
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setTaskData({ ...taskData, due_date: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(taskData.due_date) < new Date()) {
      alert("Due date must be today or in the future");
      return;
    }

    try {
      await createTask({
        ...taskData,
        name: taskData.name,
      });
      alert("Task Created Successfully");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Title"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <select name="priority_id" onChange={handleChange} className="border p-2 w-full" required>
          <option value="">Select Priority</option>
          {priorities.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select name="status_id" onChange={handleChange} className="border p-2 w-full" required>
          <option value="">Select Status</option>
          {statuses.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <select name="department_id" onChange={handleChange} className="border p-2 w-full" required>
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <select name="employee_id" onChange={handleChange} className="border p-2 w-full" required>
          <option value="">Select Employee</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>

        <DatePicker
          selected={taskData.due_date}
          onChange={handleDateChange}
          locale="ka"
          dateFormat="dd MMMM yyyy"
          placeholderText="აირჩიე თარიღი"
          className="border p-2 w-full"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
