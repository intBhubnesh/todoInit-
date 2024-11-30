import {configureStore} from '@reduxjs/toolkit'
import toDoReducers from '../features/todoSlice.js'
import categoryReducers from '../features/categorySlice.js'
import dailyReducers from '../features/dailySlice.js'

const store = configureStore({
    reducer : {
        todos : toDoReducers,
        categories : categoryReducers,
        dailies : dailyReducers
    }
})

export default store
