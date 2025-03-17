import { useEffect } from "react";
import { Link } from "react-router-dom";
import useStore from "../store/store";
import Dropdown from "../components/Dropdown";
import Vector from "../assets/Vector.png";

const georgianMonths = [
  "იანვ", "თებ", "მარტ", "აპრ", "მაის", "ივნ",
  "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ",
];

const formatGeorgianDate = (date) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = georgianMonths[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${month} ${year}`;
};

const Home = () => {
  const {
    tasks,
    fetchTasks,
    fetchStatuses,
    statuses,
    fetchDepartments,
    fetchPriorities,
    fetchEmployees,
    departments,
    priorities,
    employees,
  } = useStore();

  useEffect(() => {
    fetchTasks();
    fetchStatuses();
  }, []);

  const getTasksByStatus = (statusId) => {
    return tasks.filter((task) => task.status.id === statusId);
  };

  const statusColors = {
    1: "bg-yellow-400 border-yellow-400",
    2: "bg-orange-500 border-orange-500",
    3: "bg-pink-700 border-pink-700",
    4: "bg-blue-500 border-blue-500",
  };

  const getPriorityClass = (priorityName) => {
    switch (priorityName) {
      case "დაბალი":
        return "text-green-500 border border-green-500 rounded-xl px-2 py-1";
      case "საშუალო":
        return "text-yellow-500 border border-yellow-500 rounded-2xl px-2 py-1";
      case "მაღალი":
        return "text-red-500 border border-red-500 rounded-2xl px-2 py-1";
      default:
        return "";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">დავალებების გვერდი</h1>
      </div>
      <div className="flex gap-4 mb-6">
        <Dropdown
          fetchData={fetchDepartments}
          data={departments}
          label="დეპარტამენტი"
        />
        <Dropdown
          fetchData={fetchPriorities}
          data={priorities}
          label="პრიორიტეტი"
        />
        <Dropdown
          fetchData={fetchEmployees}
          data={employees}
          label="თანამშრომლები"
          dataKey="employee"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {statuses.map((status) => (
          <div key={status.id} className="flex flex-col">
            <h2 className={`text-white text-center text-lg font-bold p-3 rounded-lg ${statusColors[status.id].split(" ")[0]}`}>
              {status.name}
            </h2>
            <div className="space-y-4 p-4 rounded-lg min-h-[300px]">
              {getTasksByStatus(status.id).map((task) => (
                <Link
                  to={`/task/${task.id}`}
                  key={task.id}
                  className={`p-4 bg-white rounded-lg transition block border-2 ${statusColors[status.id].split(" ")[1]}`}
                >
                  <div className="flex justify-between text-sm mb-2">
                    <div className={`flex items-center gap-1 ${getPriorityClass(task.priority.name)}`}>
                      <img src={task.priority.icon} alt="priority-icon" className="w-5 h-5" />
                      <span className="font-semibold text-xs">{task.priority.name}</span>
                    </div>
                    <span className="text-pink-600 bg-pink-100 px-3 py-1 rounded-lg text-xs font-bold">
                      {task.department.name.length > 6 ? `${task.department.name.slice(0, 6)}..` : task.department.name}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {formatGeorgianDate(task.due_date)}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-15px">{task.name}</h3>
                  <p className="text-gray-800 text-sm mt-1">{task.description}</p>
                  <div className="flex justify-between mt-4 text-gray-500 text-sm">
                    <div className="flex items-center">
                      <img src={task.employee.avatar} className="w-8 h-8 rounded-full border" alt={task.employee.name} />
                      <span className="ml-2 font-medium text-gray-700">
                        {task.employee.name} {task.employee.surname}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>
                        <img src={Vector} alt="Vector" />
                      </span>
                      <span className="text-gray-900">{task.total_comments}</span>
                    </div>
                  </div>
                </Link>
              ))}
              {getTasksByStatus(status.id).length === 0 && (
                <p className="text-gray-500 text-center">No tasks available.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
