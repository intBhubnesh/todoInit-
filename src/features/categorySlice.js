import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    CategoryList : [{
    id : 1,
    name : "Excersise",
    task : [],
    isSelected : true
},
{
    id : 2,
    name : "Coding",
    task : [],
    isSelected : false
},
{
    id : 3,
    name : "Assignment",
    task : [],
    isSelected : false
}
]}


export const categorySlice = createSlice({
    name : "category",
    initialState,
    reducers:{
        addCategory : (state, action) => {
            const category = {
                id : nanoid(),
                name : action.payload.name,
                task : [],
                isSelected : false
            }
            state.CategoryList.push(category)
        },
        removeCategory : (state,action) => {
            state.CategoryList = state.CategoryList.filter((category) => category.id !== action.payload)
        },
        addTodoToCategory : (state, action) => {
            const { CategoryId, todo } = action.payload

            const category = state.CategoryList.find((cat) => cat.id === CategoryId)
            if(category){
                category.task.push(todo)
            }


        },
        removeTodoFromCategory : (state, action) => {
            const { CategoryId, toDo } = action.payload

            const category = state.CategoryList.find((cat) => cat.id === CategoryId)
            if(category){
                category.task = category.task.filter(((task) => task.id !== toDo.id))
            }
        },
        selectCategory : (state, action) => {
            const category = state.CategoryList.find(((cat) => cat.id === action.payload))
            category ? state.CategoryList.forEach((cat) => cat.isSelected = (cat.id === category.id)) : alert("Category Not Found Error !")

        }
    }
})


export const {addCategory, addTodoToCategory, removeCategory, removeTodoFromCategory, selectCategory} = categorySlice.actions

export default categorySlice.reducer
