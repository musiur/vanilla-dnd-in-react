import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/feature/boardSlice";
import { Button } from "../components/ui/button";
import { X } from "lucide-react";
import { DatePicker } from "../components/ui/date-picker";

export const CreateUID = (data) => {
  let ID = 0;
  if (!data.length) {
    return ID + 1;
  }

  for (let i = 0; i < data.length; i++) {
    if (ID < data[i].id) {
      ID = data[i].id;
    }
  }

  return ID + 1;
};

// eslint-disable-next-line react/prop-types
const TaskModal = ({ closeModal, addContext }) => {
  // redux store
  const { board } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react/prop-types
    const prevTasks = board[0].columns[addContext.id].tasks;
    const newTask = {
      id: CreateUID(prevTasks),
      title: task,
      description,
      duedate: selectedDate,
      addContext,
    };
    dispatch(addTask(newTask));
    closeModal(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#abd6db] bg-opacity-30 z-10">
      <div className="relative bg-white p-6 rounded-lg shadow-lg min-w-[310px] w-[450px] h-auto">
        <h1 className="text-2xl font-bold mb-3">New Task</h1>
        <button
          onClick={() => closeModal(false)}
          className="absolute top-0 right-0 mt-2 mr-2 text-red-600 font-bold text-xl"
        >
          <X />
        </button>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="task" className="block font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="task"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-bold mb-2">
              Task Description
            </label>
            <textarea
              id="description"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 h-32"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block font-bold mb-2">
              Due Date
            </label>
            <div className="w-full">
              <DatePicker
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                }}
              />
            </div>
          </div>
          <Button type="submit" className="form-button">
            Add Task
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
