import { createSlice } from "@reduxjs/toolkit";
import DATA from "../../data/data.json";

const initialState = DATA;

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { id, title, description, duedate, addContext } = action.payload;
      const newTask = {
        id,
        title,
        description,
        status: addContext.name,
        duedate,
      };
      // updating state with new Task from ADD TASK
      state.board[0].columns[addContext.id].tasks.push(newTask);
    },
    removeTask: (state, action) => {
      const { tasks, index } = action.payload;
      // removing task from tasks list in board > todo list
      state.board[0].columns[index].tasks = tasks;
    },
    updateTask: (state, action) => {
      const { tasks, index } = action.payload;
      console.log(tasks, index)
      // removing task from tasks list in board > todo list
      state.board[0].columns[index].tasks = tasks;
    },
    transferTask: (state, action) => {
      const { fromTaskList, toTaskList, fromIndex, toIndex } = action.payload;
      // grab from index
      // grab to index
      // grab task from payload
      // make trasfer UI+Redux
      state.board[0].columns[fromIndex].tasks = fromTaskList;
      state.board[0].columns[toIndex].tasks = toTaskList;
    },
  },
});

export const { addTask, removeTask, updateTask, transferTask } =
  boardSlice.actions;
export default boardSlice.reducer;
