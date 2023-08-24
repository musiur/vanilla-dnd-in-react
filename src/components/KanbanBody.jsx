import { useDispatch, useSelector } from "react-redux";
import { removeTask, transferTask } from "../redux/feature/boardSlice";
import { PencilIcon, PlusIcon, X } from "lucide-react";
import { useState } from "react";
import TaskUpdateModal from "../modals/TaskUpdateModal";
import TaskModal, { CreateUID } from "../modals/TaskModal";
import Wave from "../assets/images/backgrounds/shapes/wave";
import WaveLine from "../assets/images/backgrounds/shapes/waveline";
import "../styles/backgrounds/wavy.css";
import format from "date-fns/format";

const KanbanBody = () => {
  const { board } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [addContext, setAddContext] = useState(null);

  const AddTaskHandler = (id, name) => {
    setAddContext({ id, name });
    setOpenAddModal(true);
  };

  // erasing task from any list
  const RemoveTaskHandler = (id, index) => {
    const prevTasks = [...board[0].columns[index].tasks];
    const tasks = [...prevTasks.filter((task) => task.id !== id)];
    dispatch(removeTask({ tasks, index }));
  };
  // updator of task information
  const UpdateTaskHandler = (id, index) => {
    setSelectedTask(id);
    setAddContext({ index });
    setIsOpenModal(true);
  };

  // DND functionalities
  const handleOnDrag = (e, id, name, index) => {
    e.dataTransfer.setData(
      "data",
      JSON.stringify({ id, from: name, fromIndex: index })
    );
  };

  const handleOnDrop = (e, toIndex) => {
    const { id, fromIndex } = JSON.parse(e.dataTransfer.getData("data"));

    // return nothing when from and to equal
    if (fromIndex === toIndex) return;

    // task: id utilize, from: where comes, to: where set

    // finding targeted task
    const targetedTask = {
      ...board[0].columns[fromIndex].tasks.filter((task) => task.id === id)[0],
    };

    // finding from list from redux
    let fromTaskList = [...board[0].columns[fromIndex].tasks];
    // // finding to list from redux
    let toTaskList = [...board[0].columns[toIndex].tasks];
    // remove task from the from list
    fromTaskList = fromTaskList.filter((task) => task.id !== targetedTask.id);
    // // add task to the to list
    if (!toTaskList.length) {
      toTaskList.push(targetedTask);
    } else {
      if (toTaskList.find((task) => task.id === targetedTask.id)) {
        // create id for targetd tast in this toTaskList
        targetedTask.id = CreateUID(toTaskList);
        toTaskList.push(targetedTask);
      } else {
        toTaskList.push(targetedTask);
      }
    }
    // // call dispatch
    dispatch(
      transferTask({
        fromTaskList,
        toTaskList,
        fromIndex,
        toIndex,
      })
    );
  };

  // hover
  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <div className="wavy-container">
        <div className="wavy-container__half-div">
          <Wave />
        </div>
        <div className="wavy-container__line">
          <WaveLine />
        </div>
        <div className="absolute top-0 z-10 w-full h-full flex items-center justify-center">
          <h1 className="text-white font-bold text-2xl lg:text-5xl">
            Manage your tasks!
          </h1>
        </div>
      </div>
      {openAddModal && addContext ? (
        <TaskModal closeModal={setOpenAddModal} addContext={addContext} />
      ) : null}
      {isOpenModal && addContext ? (
        <TaskUpdateModal
          closeModal={setIsOpenModal}
          selectedTask={selectedTask}
          updateContext={addContext}
        />
      ) : null}

      <div className="container section-gap-margin">
        {board.length ? (
          <div className="grid grid-cols-3 gap-5">
            {board[0].columns.map((column, index) => {
              const { name, tasks } = column;
              return (
                <div
                  key={name}
                  className="border mx-5 rounded-md min-h-[50vh]"
                  onDragOver={handleOnDragOver}
                  onDrop={(e) => handleOnDrop(e, index)}
                >
                  <div className="flex items-center justify-between gap-5 p-3 border-b">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          index === 0
                            ? "bg-indigo-400"
                            : index === 1
                            ? "bg-orange-400"
                            : "bg-green-400"
                        }`}
                      ></div>
                      <h4 className="font-bold">
                        {" "}
                        {name} ({tasks.length})
                      </h4>
                    </div>
                    <button
                      className="border rounded-md p-2 hover:bg-gray-100"
                      onClick={() => AddTaskHandler(index, name)}
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                  {tasks.length ? (
                    <div className="flex flex-col gap-3 p-3 min-h-[50vh]">
                      {tasks.map((task) => {
                        const { id, title, description, duedate } = task;
                        return (
                          <div
                            key={id}
                            className="p-3 border hover:shadow-xl rounded-md relative cursor-grab"
                            draggable
                            onDragStart={(e) =>
                              handleOnDrag(e, id, name, index)
                            }
                          >
                            <div className="absolute top-0 right-0 m-2 flex items-center gap-1">
                              <PencilIcon
                                className="w-6 h-6 px-1 rounded-full bg-gray-50 hover:bg-blue-100 hover:text-blue-400 cursor-pointer"
                                onClick={() => UpdateTaskHandler(id, index)}
                              />
                              <X
                                className="w-6 h-6 px-1 rounded-full bg-gray-50 hover:bg-red-100 hover:text-red-400 cursor-pointer"
                                onClick={() => RemoveTaskHandler(id, index)}
                              />
                            </div>
                            <span className="text-4xl font-black text-gray-100 absolute bottom-0 right-0 m-[5px]">
                              {id}
                            </span>
                            <h5 className="font-semibold">{title}</h5>
                            <p className="text-gray-400">{description}</p>
                            {duedate ? (
                              <p className="text-xs mt-3">
                                Due: {format(duedate, "PPP")}
                              </p>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-3 font-bold text-gray-400 text-2xl">
                      {"..."}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          "No board found!"
        )}
      </div>
    </section>
  );
};

export default KanbanBody;
