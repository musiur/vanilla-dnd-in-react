import { useDispatch, useSelector } from "react-redux";
import { removeTask, transferTask } from "../redux/feature/boardSlice";
import { PencilIcon, PlusIcon, X } from "lucide-react";
import { useState } from "react";
import TaskUpdateModal from "../modals/TaskUpdateModal";
import TaskModal, { CreateUID } from "../modals/TaskModal";
import Wave from "../assets/images/backgrounds/shapes/wave";
import WaveLine from "../assets/images/backgrounds/shapes/waveline";
import "../styles/backgrounds/wavy.css";
import "../styles/components/kanvanbody.css";
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
        <div className="hero-title-container">
          <h1 className="hero-title">Manage your tasks!</h1>
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

      <div className="board-container">
        {board.length ? (
          <div className="board-container__grid">
            {board[0].columns.map((column, index) => {
              const { name, tasks } = column;
              return (
                <div
                  key={name}
                  className="grid__task-list-column"
                  onDragOver={handleOnDragOver}
                  onDrop={(e) => handleOnDrop(e, index)}
                >
                  <div className="column__container">
                    <div className="column__header">
                      <div
                        className={`column__signature ${
                          index === 0
                            ? "bg-indigo-400"
                            : index === 1
                            ? "bg-orange-400"
                            : "bg-green-400"
                        }`}
                      >
                        {tasks.length}
                      </div>
                      <h4 className="font-bold"> {name}</h4>
                    </div>
                    <button
                      className="border rounded-md p-2 hover:bg-gray-100"
                      onClick={() => AddTaskHandler(index, name)}
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                  {tasks.length ? (
                    <div className="column__task-list-container">
                      {tasks.map((task) => {
                        const { id, title, description, duedate } = task;
                        return (
                          <div
                            key={id}
                            className="task-cards"
                            draggable
                            onDragStart={(e) =>
                              handleOnDrag(e, id, name, index)
                            }
                          >
                            <div className="task-cards__action-container">
                              <PencilIcon
                                className="task-cards__action-update"
                                onClick={() => UpdateTaskHandler(id, index)}
                              />
                              <X
                                className="task-cards__action-remove"
                                onClick={() => RemoveTaskHandler(id, index)}
                              />
                            </div>
                            <span className="task-cards__uid">{id}</span>
                            <div className="task-cards__grid">
                              <div className="task-cards__element-container">
                                <h5 className="task-cards__header">{title}</h5>
                                <p className="task-cards__description ">
                                  {description}
                                </p>
                                {duedate ? (
                                  <p className="task-cards__duedate">
                                    Due: {format(duedate, "PPP")}
                                  </p>
                                ) : null}
                              </div>
                              <div className="col-span-1 w-10 h-10 rounded-full bg-indigo-300 mt-auto flex items-center justify-center text-white">A</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="task-cards__empty-list">{"..."}</div>
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
