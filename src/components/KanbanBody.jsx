import { useDispatch, useSelector } from "react-redux";
import { removeTask, transferTask } from "../redux/feature/boardSlice";
import { PencilIcon, PlusIcon, X } from "lucide-react";
import { useState } from "react";
import TaskUpdateModal from "../modals/TaskUpdateModal";
import TaskModal, { CreateUID } from "../modals/TaskModal";

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
    console.log(tasks);
    dispatch(removeTask({ tasks, index }));
  };
  // updator of task information
  const UpdateTaskHandler = (id, index) => {
    setSelectedTask(id);
    console.log(id, index)
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
    const targetedTask = {...board[0].columns[fromIndex].tasks.filter(
      (task) => task.id === id
    )[0]};

    console.log(typeof toIndex, typeof fromIndex, board[0].columns[fromIndex]);
    // finding from list from redux
    let fromTaskList = [...board[0].columns[fromIndex].tasks];
    // console.log(fromTaskList)
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
    <section className="container section-gap-margin">
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
      <h1 className="text-xl lg:text-3xl xl:text-5xl font-black my-10 text-center">
        Kanban body
      </h1>
      <hr />
      <div className="py-10">
        {board.length ? (
          <div className="grid grid-cols-3 gap-5">
            {board[0].columns.map((column, index) => {
              const { name, tasks } = column;
              return (
                <div
                  key={name}
                  className="border mx-5 rounded-md"
                  onDragOver={handleOnDragOver}
                  onDrop={(e) => handleOnDrop(e, index)}
                >
                  <div className="flex items-center justify-between gap-5 p-3 border-b">
                    <h4 className="font-bold">
                      {name} ({tasks.length})
                    </h4>
                    <button
                      className="border rounded-md p-2 hover:bg-gray-100"
                      onClick={() => AddTaskHandler(index, name)}
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                  {tasks.length ? (
                    <div className="flex flex-col gap-3 p-8 min-h-[50vh]">
                      {tasks.map((task) => {
                        const { id, title, description, duedate } = task;
                        return (
                          <div
                            key={id}
                            className="p-3 border hover:shadow-xl rounded-md relative"
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
                            <span className="text-4xl font-black opacity-[20%] absolute top-0 left-0 -ml-[22px]">
                              {id}
                            </span>
                            <h5 className="font-semibold">{title}</h5>
                            <p className="text-gray-400">{description}</p>
                            <p>Due: {duedate}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : index === 0 ? (
                    <div className="p-3">{"Add task"}</div>
                  ) : null}
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
