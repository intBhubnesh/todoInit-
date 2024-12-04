// import storage configuration from redux toolkit
import { configureStore } from "@reduxjs/toolkit";
import dailyReducers from "../features/dailySlice";
import todoReducers from "../features/todoSlice";
import categoryReducers from "../features/categorySlice";
// import { getFromStorage, saveToStorage } from '../utils/storageUtils'


// const STORAGE_KEY = {
//     todos: 'todos',
//     categories: "categories",
//     dailies: 'dailies'
// }

// const initialCategoryState = {
//     CategoryList : [{
//     id : 1,
//     name : "Excersise",
//     task : [],
//     isSelected : true
// },
// {
//     id : 2,
//     name : "Coding",
//     task : [],
//     isSelected : false
// },
// {
//     id : 3,
//     name : "Assignment",
//     task : [],
//     isSelected : false
// }
// ]}

// const initialDailyState = {
//     dailyList : [{
//     id : 1,
//     name : 'Wash Cloths',
//     time : '20 Min',
//     status : 'notStarted',
//     difficulty : 'medium',}]
// }

// const initialTodoState = {
//     todoList : [{
//         id : 1,
//         name : 'Do Yoga',
//         time : '20 Mins',
//         status : 'notStarted',
//         categoryId : null,
//         difficulty : 'easy',
//         dueDate : 'Nov 20'
//     }]
// }


// preload state from localStorage
// const preloadedState = {
    // dailies : {
        // dailyList : getFromStorage(STORAGE_KEY.dailies) || initialDailyState.dailyList
    // },
//     todos : {
//         todoList : getFromStorage(STORAGE_KEY.todos) || initialTodoState.todoList
//     },
//     categories : {
//         categoryList : getFromStorage(STORAGE_KEY.categories) || initialCategoryState.categoryList
//     }
// }


// // middleware to sync the redux state with the localStoeage
// const syncStateToStorage = (store) => (next) => (action) => {
//     const result = next(action);

// //     // Extract the specific parts of the state
// //     const {   dailies, todos, categories } = store.getState();

// //     // Save only necessary keys
//     saveToStorage(STORAGE_KEY.dailies, store.dailies.dailyList);
// //     saveToStorage(STORAGE_KEY.todos, todos.todoList);
// //     saveToStorage(STORAGE_KEY.categories, categories.categoryList);

//     return result;
// };


// create ad export store
const store = configureStore({
    reducer:{
        dailies : dailyReducers,
        todos : todoReducers,
        categories : categoryReducers
    },
    // preloadedState,
    // middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(syncStateToStorage),
})

export default store;
