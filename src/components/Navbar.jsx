import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EmployeeModal from "./EmployeeModal";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="text-2xl font-bold text-purple-600">
          Momentum
        </Link>
        <div className="flex gap-4">
          <Link
            onClick={handleModalOpen}
            className="px-4 py-2 rounded-lg text-gray-700 outline-1 transition transform outline-purple-600 hover:bg-purple-600 hover:text-white"
          >
            თანამშრომლის შექმნა
          </Link>

          <Link
            to="/create-task"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg transition transform outline-purple-600 hover:bg-white hover:text-purple-600 "
          >
            + დაამატე ახალი დავალება
          </Link>
        </div>
      </div>

      {isModalOpen && <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm z-40"></div>}

      {isModalOpen && (
        <EmployeeModal isOpen={isModalOpen} onClose={handleModalClose} />
      )}
    </nav>
  );
}

export default Navbar;
