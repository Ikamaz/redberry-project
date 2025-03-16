import { useState, useEffect } from "react";
import useStore from "../store/store";
import { IoClose } from "react-icons/io5";

function EmployeeModal({ isOpen, onClose }) {
  const { createEmployee, departments } = useStore();
  const [employeeData, setEmployeeData] = useState({
    name: "",
    surname: "",
    department_id: "",
    avatar: null,
    avatarPreview: null,
  });
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 600 * 1024) {
      setEmployeeData({
        ...employeeData,
        avatar: file,
        avatarPreview: URL.createObjectURL(file),
      });
    } else {
      alert("The file size exceeds 600KB or is not an image.");
    }
  };

  const handleRemoveAvatar = () => {
    setEmployeeData({ ...employeeData, avatar: null, avatarPreview: null });
  };

  const validateForm = () => {
    const { name, surname, avatar, department_id } = employeeData;
    const nameValid = /^[ა-ჰa-zA-Z]{2,255}$/.test(name);
    const surnameValid = /^[ა-ჰa-zA-Z]{2,255}$/.test(surname);
    const avatarValid = avatar && avatar.size <= 600 * 1024 && avatar.type.startsWith("image/");
    const departmentValid = department_id !== "";

    setIsValid(nameValid && surnameValid && avatarValid && departmentValid);
  };

  useEffect(() => {
    validateForm();
  }, [employeeData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", employeeData.name);
    formData.append("surname", employeeData.surname);
    formData.append("department_id", employeeData.department_id);
    formData.append("avatar", employeeData.avatar);

    await createEmployee(formData);
    handleModalClose();
  };

  const handleModalClose = () => {
    setEmployeeData({
      name: "",
      surname: "",
      department_id: "",
      avatar: null,
      avatarPreview: null,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 z-50">
      <div className="bg-white p-10 rounded-3xl w-[600px] relative">
        <IoClose className="absolute top-6 right-6 text-2xl cursor-pointer" onClick={handleModalClose} />
        <h2 className="text-center text-3xl font-bold mb-8">თანამშრომლის დამატება</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex gap-6">
            <input
              type="text"
              name="name"
              placeholder="სახელი"
              value={employeeData.name}
              onChange={handleChange}
              className="border p-4 w-full rounded-lg"
              required
            />
            <input
              type="text"
              name="surname"
              placeholder="გვარი"
              value={employeeData.surname}
              onChange={handleChange}
              className="border p-4 w-full rounded-lg"
              required
            />
          </div>

          <div className="border p-8 rounded-lg relative flex justify-center items-center">
            {employeeData.avatarPreview ? (
              <div className="relative">
                <img
                  src={employeeData.avatarPreview}
                  alt="Avatar Preview"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-red-500 text-white p-2 rounded-full"
                  onClick={handleRemoveAvatar}
                >
                  🗑️
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full cursor-pointer"
              />
            )}
          </div>

          <select
            name="department_id"
            value={employeeData.department_id}
            onChange={handleChange}
            className="border p-4 w-full rounded-lg"
            required
          >
            <option value="">აირჩიე დეპარტამენტი</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-6">
            <button
              type="button"
              className="px-8 py-3 border rounded-lg"
              onClick={handleModalClose}
            >
              გაუქმება
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-purple-600 text-white rounded-lg"
              disabled={!isValid}
            >
              დაამატე თანამშრომელი
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeModal;
