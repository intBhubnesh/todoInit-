import {configureStore} from '@reduxjs/toolkit'
import toDoReducers from '../features/todoSlice.js'
import categoryReducers from '../features/categorySlice.js'

const store = configureStore({
    reducer : {
        todos : toDoReducers,
        categories : categoryReducers
    }
})

export default store
