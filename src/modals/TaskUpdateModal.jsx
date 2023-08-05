import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../redux/feature/boardSlice";


const TaskUpdateModal = ({ closeModal, selectedTask, updateContext }) => {
  // redux store
  const { board } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const defaultValues = board[0].columns[updateContext.index].tasks.filter(
    (task) => task.id === selectedTask
  )[0];

  const [task, setTask] = useState(defaultValues ? defaultValues.title : "");
  const [description, setDescription] = useState(
    defaultValues ? defaultValues.description : ""
  );
  const [selectedDate, setSelectedDate] = useState(
    defaultValues ? defaultValues.duedate : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const prevTasks = board[0].columns[updateContext.index].tasks;
    console.log(prevTasks)
    const newTask = {
      ...defaultValues,
      title: task,
      description,
      duedate: selectedDate,
    };
    const newTaskList = prevTasks.map(task => {
        if(task.id === selectedTask){
            return newTask
        }else{
            return task
        }
    })
    console.log(newTaskList)
    dispatch(updateTask({
        tasks: newTaskList,
        index: updateContext.index
    }));
    closeModal(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-[#abd6db] bg-opacity-30 z-10">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-72 h-auto">
        <h1 className="text-2xl font-bold mb-3">Update</h1>
        <button
          onClick={() => closeModal(false)}
          className="absolute top-0 right-0 mt-2 mr-2 text-red-600 font-bold text-xl"
        >
          &times;
        </button>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="task" className="block font-bold mb-2">
              Title:
            </label>
            <input
              type="text"
              id="task"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter title"
              defaultValue={task}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-bold mb-2">
              Task Description:
            </label>
            <textarea
              id="description"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 h-32"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block font-bold mb-2">
              Due Date:
            </label>
            <div className="w-full">
              <input
                id="date"
                type="date"
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                selected={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                }}
                defaultValue={selectedDate}
              />
            </div>
          </div>
          <button type="submit" className="form-button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskUpdateModal;
