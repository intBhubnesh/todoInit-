import { createSlice, nanoid } from "@reduxjs/toolkit";
import { loadState, saveState } from "../helper/sessionStorage";

const dailySessionKey = "daily"
const initialState = {
    dailyList : loadState(dailySessionKey, [{
        id : 1,
        name : 'Wash Cloths',
        time : '20 Min',
        status : 'notStarted',
        difficulty : 'medium',}])
}


export const dailySlice = createSlice({
    name : "daily",
    initialState,
    reducers : {
        addDaily : (state, action) => {
            const { name, time, difficulty } = action.payload
            if(name ) {
                const newDaily = {
                    id : nanoid(),
                    name : name,
                    time : time,
                    status : 'notStarted',
                    difficulty : difficulty
                }

                state.dailyList.push(newDaily)
            }
            saveState(dailySessionKey, state.dailyList)
        },
        removeDaily : (state, action) => {
            const daily = state.dailyList.filter((daily) => daily.id !== action.payload)
            if(daily){
                state.dailyList = daily
            }
            saveState(dailySessionKey, state.dailyList)
        },
        updateDaily : (state, action) => {
            const {id, name, time, difficulty} = action.payload
            const daily = state.dailyList.find((daily) => daily.id === id)

            if(daily){
                    daily.name = name,
                    daily.time = time,
                    daily.difficulty = difficulty
            }
            saveState(dailySessionKey, state.dailyList)
        },
        startDaily : (state, action) => {
            const todo = state.dailyList.find(todo => todo.id === action.payload)
            if(todo) {
                todo.status = 'Started'
            }
            saveState(dailySessionKey, state.dailyList)
        },
        pauseDaily : (state, action) => {
            const todo = state.dailyList.find(todo => todo.id === action.payload.id)
            if(todo) {
                todo.status = 'notStarted',
                todo.time = action.payload.time
            }
            saveState(dailySessionKey, state.dailyList)
        },
        completedDaily : (state, action) => {
            const todo = state.dailyList.find(todo => todo.id === action.payload)
            if(todo) {
                todo.status = 'Completed'
                todo.time = '0 min'
            }
            saveState(dailySessionKey, state.dailyList)
        },
    }
})


export const {addDaily,removeDaily, updateDaily, startDaily, pauseDaily, completedDaily } = dailySlice.actions

export default dailySlice.reducer
