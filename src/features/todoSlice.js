import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todoList : [{
        id : 1,
        name : 'Do Yoga',
        time : '20 Mins',
        status : 'notStarted',
        categoryId : null,
        difficulty : 'easy',
        dueDate : 'Nov 20'
    }]
}

// create slice always take a object paramenter
export const todoSlice = createSlice({
    name : "todo",
    initialState,
    reducers: {
        addTodo : (state, action) => {
            const {id, name, time, status, categoryId, difficulty, dueDate} = action.payload
            const todo = {
                id : id,
                name: name,
                time : time,
                status : status,
                categoryId : categoryId,
                difficulty : difficulty,
                dueDate : dueDate
            }
            state.todoList.push(todo)
        },
        removeTodo : (state, action) => {
            state.todoList = state.todoList.filter((todo) => todo.id !== action.payload)
        },
        startTodo : (state, action) => {
            const todo = state.todoList.find((todo) => todo.id === action.payload)
            if(todo){
                todo.status = 'Started'
            }
        },
        completedTodo : (state, action) => {
            const todo = state.todoList.find((todo) => todo.id === action.payload)
            if(todo){
                todo.status = 'Completed'
                todo.time = '0 min'
            }
        },
        pausedTodo : (state, action) => {
            const todo = state.todoList.find((todo) => todo.id === action.payload.id)
            if(todo){
                todo.status = 'notStarted'
                todo.time = action.payload.time
            }
        }
    }
})

// export the individual functions as a componet to use them in other components
export const {addTodo, removeTodo, startTodo, completedTodo, pausedTodo} = todoSlice.actions

// export the reducer list so the storage can registem them for use and update state
export default todoSlice.reducer
