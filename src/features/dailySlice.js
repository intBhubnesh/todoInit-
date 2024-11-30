import { createSlice, nanoid } from "@reduxjs/toolkit";

const intialState = {
    dailyList : [{    id : 1,
    name : 'Wash Cloths',
    time : '20 Min',
    status : 'notStarted',
    difficulty : 'medium',}]
}


export const dailySlice = createSlice({
    name : "daily",
    intialState,
    reducers : {
        addDaily : (state, action) => {
            const {name, time, difficulty } = action.payload
            if(name ) {
                const newDaily = {
                    id : nanoid(),
                    name : name,
                    time : time,
                    status : 'notStarted',
                    difficulty : difficulty
                }

                state.dailyList.push(addDaily)
            }
        },
        removeDaily : (state, action) => {
            const daily = state.dailyList.filter((daily) => daily.id !== action.payload)
            if(daily){
                state.dailyList = daily
            }
        },
        updateDaily : (state, action) => {
            const {id, name, time, difficulty, status} = action.payload
            const daily = state.dailyList.find((daily) => daily.id === id)

            if(daily){
                    daily.id = id,
                    daily.name = name,
                    daily.time = time,
                    daily.status = status,
                    daily.difficulty = difficulty
            }
        }
    }
})


export const {} = dailySlice.actions

export default dailySlice.reducer
