import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../helper/sessionStorage";

const todoSessionKey = "todo";

// Initial state: load from sessionStorage or use a default value
const initialState = {
    todoList: loadState(todoSessionKey, [{
        id: 1,
        name: 'Do Yoga',
        time: '20 Mins',
        status: 'notStarted',
        categoryId: null,
        difficulty: 'easy',
        dueDate: 'Nov 20'
    }])
};

// create slice always takes an object parameter
export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const { id, name, time, status, categoryId, difficulty, dueDate } = action.payload;
            const todo = { id, name, time, status, categoryId, difficulty, dueDate };
            state.todoList.push(todo);
            saveState(todoSessionKey, state.todoList);  // save after state changes
        },
        removeTodo: (state, action) => {
            state.todoList = state.todoList.filter((todo) => todo.id !== action.payload);
            saveState(todoSessionKey, state.todoList);  // save after state changes
        },
        updateTodo: (state, action) => {
            const { id, name, time, status, categoryId, difficulty, dueDate } = action.payload;
            const todo = state.todoList.find((todo) => todo.id === id);
            if (todo) {
                todo.name = name;
                todo.time = time;
                todo.status = status;
                todo.categoryId = categoryId;
                todo.difficulty = difficulty;
                todo.dueDate = dueDate;
            }
            saveState(todoSessionKey, state.todoList);  // save after state changes
        },
        startTodo: (state, action) => {
            const todo = state.todoList.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.status = 'Started';
            }
            saveState(todoSessionKey, state.todoList);  // save after state changes
        },
        completedTodo: (state, action) => {
            const todo = state.todoList.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.status = 'Completed';
                todo.time = '0 min';
            }
            saveState(todoSessionKey, state.todoList);  // save after state changes
        },
        pausedTodo: (state, action) => {
            const todo = state.todoList.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.status = 'notStarted';
                todo.time = action.payload.time;
            }
            saveState(todoSessionKey, state.todoList);  // save after state changes
        }
    }
});

// Export actions so they can be used in components
export const { addTodo, removeTodo, startTodo, completedTodo, pausedTodo, updateTodo } = todoSlice.actions;

// Export the reducer so it can be used in the store
export default todoSlice.reducer;
