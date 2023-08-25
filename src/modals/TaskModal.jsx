import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/feature/boardSlice";
import { Button } from "../components/ui/button";
import { X } from "lucide-react";
import { DatePicker } from "../components/ui/date-picker";
import Errors from "../components/errors";

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

// eslint-disable-next-line react-refresh/only-export-components
export const validator = (data, errorSetter) => {
  let obj = {};
  if(!data.title.trim()){
    obj.title = "Title is required!"
  }
  if(!data.description.trim()){
    obj.description = "Description is required!"
  }
  if(!data.duedate){
    obj.duedate = "Due date is required!"
  }
  errorSetter(obj);
  return obj;
}

// eslint-disable-next-line react/prop-types
const TaskModal = ({ closeModal, addContext }) => {
  // redux store
  const { board } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "Add title to your task!",
    description: "Add your custom description to understand the task more deeper",
    duedate: new Date()
  })
  const [errors, setErrors] = useState(null);

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(validator(formData, setErrors)).length === 0) {
      // eslint-disable-next-line react/prop-types
      const prevTasks = board[0].columns[addContext.id].tasks;
      const newTask = {
        id: CreateUID(prevTasks),
        addContext,
        ...formData
      };
      dispatch(addTask(newTask));
      closeModal(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur bg-black/30 z-10">
      <div className="relative bg-white p-6 rounded-lg shadow-lg min-w-[310px] w-[450px] h-auto">
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
              value={formData.title}
              name="title"
              onChange={handleOnChange}
              placeholder="Enter title"
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
              value={formData.description}
              name="description"
              onChange={handleOnChange}
              placeholder="Enter task description"
            />
            <Errors message={errors?.description} />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2">
              Due Date
            </label>
            <div className="w-full">
              <DatePicker
                onChange={handleOnChange}
                name="duedate"
                defaultValue={formData?.duedate}
              />
            </div>
            <Errors message={errors?.selectedDate} />
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
