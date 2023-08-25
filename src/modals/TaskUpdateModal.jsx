import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../redux/feature/boardSlice";
import { DatePicker } from "../components/ui/date-picker";
import { Button } from "../components/ui/button";
import { X } from "lucide-react";
import { validator } from "./TaskModal";
import Errors from "../components/errors";

// eslint-disable-next-line react/prop-types
const TaskUpdateModal = ({ closeModal, selectedTask, updateContext }) => {
  // redux store
  const { board } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  // eslint-disable-next-line react/prop-types
  const defaultValues = board[0].columns[updateContext.index].tasks.filter(
    (task) => task.id === selectedTask
  )[0];

  // const [task, setTask] = useState(defaultValues ? defaultValues.title : "");
  // const [description, setDescription] = useState(
  //   defaultValues ? defaultValues.description : ""
  // );
  // const [selectedDate, setSelectedDate] = useState(
  //   defaultValues ? defaultValues.duedate : ""
  // );

  const [formData, setFormData] = useState(
    defaultValues
      ? defaultValues
      : { title: "", description: "", duedate: new Date() }
  );
  const [errors, setErrors] = useState(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(validator(formData, setErrors)).length === 0) {
      // eslint-disable-next-line react/prop-types
      const prevTasks = board[0].columns[updateContext.index].tasks;
      // const newTask = {
      //   ...defaultValues,
      //   title: task,
      //   description,
      //   duedate: selectedDate,
      // };
      const newTaskList = prevTasks.map((task) => {
        if (task.id === selectedTask) {
          // return newTask;
          return formData;
        } else {
          return task;
        }
      });
      dispatch(
        updateTask({
          tasks: newTaskList,
          // eslint-disable-next-line react/prop-types
          index: updateContext.index,
        })
      );
      closeModal(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur bg-black/30 z-10">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-[450px] h-auto">
        <button
          onClick={() => closeModal(false)}
          className="absolute top-0 right-0 mt-2 mr-2 text-red-600 font-bold text-xl"
        >
          <X />
        </button>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              name="title"
              onChange={handleOnChange}
              placeholder="Enter title"
              defaultValue={formData.title}
            />
            <Errors message={errors?.title} />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-bold mb-2">
              Task Description
            </label>
            <textarea
              id="description"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 h-32"
              defaultValue={formData.description}
              name="description"
              onChange={handleOnChange}
              placeholder="Enter task description"
            />
            <Errors message={errors?.description} />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">Due Date</label>
            <div className="w-full">
              <DatePicker
                name="duedate"
                onChange={handleOnChange}
                defaultValue={formData.duedate}
              />
              <Errors message={errors?.duedate} />
            </div>
          </div>
          <Button type="submit" className="form-button">
            Update Task
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TaskUpdateModal;
