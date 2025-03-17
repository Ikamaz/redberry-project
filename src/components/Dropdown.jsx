import { useEffect } from "react";
import useStore from "../store/store";

const Dropdown = ({ fetchData, data, label, dataKey }) => {
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <select className="p-2 border-none rounded-lg">
      <option>{label}</option>
      {data.map((item) => (
        <option key={item.id} value={item.id}>
          {dataKey === "employee"
            ? `${item.name} ${item.surname}`
            : item.title || item.name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
