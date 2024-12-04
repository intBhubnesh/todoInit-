import { createSlice, nanoid } from "@reduxjs/toolkit";
import { loadState, saveState } from "../helper/sessionStorage";

const categorySessionKey = "categories";

const initialState = {
    CategoryList: loadState(categorySessionKey, [
        {
            id: 1,
            name: "Exercise",
            task: [],
            isSelected: true
        },
        {
            id: 2,
            name: "Coding",
            task: [],
            isSelected: false
        },
        {
            id: 3,
            name: "Assignment",
            task: [],
            isSelected: false
        }
    ])
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        addCategory: (state, action) => {
            const category = {
                id: nanoid(),
                name: action.payload.name,
                task: [],
                isSelected: false
            };
            state.CategoryList.push(category);
            saveState(categorySessionKey, state.CategoryList);  // Save the updated CategoryList
        },
        removeCategory: (state, action) => {
            state.CategoryList = state.CategoryList.filter(
                (category) => category.id !== action.payload
            );
            saveState(categorySessionKey, state.CategoryList);  // Save the updated CategoryList
        },
        addTodoToCategory: (state, action) => {
            const { CategoryId, todo } = action.payload;
            const category = state.CategoryList.find((cat) => cat.id === CategoryId);
            if (category) {
                category.task.push(todo);
                saveState(categorySessionKey, state.CategoryList);  // Save the updated CategoryList
            }
        },
        removeTodoFromCategory: (state, action) => {
            const { CategoryId, toDo } = action.payload;
            const category = state.CategoryList.find((cat) => cat.id === CategoryId);
            if (category) {
                category.task = category.task.filter((task) => task.id !== toDo.id);
                saveState(categorySessionKey, state.CategoryList);  // Save the updated CategoryList
            }
        },
        selectCategory: (state, action) => {
            const category = state.CategoryList.find((cat) => cat.id === action.payload);
            if (category) {
                state.CategoryList.forEach((cat) => (cat.isSelected = cat.id === category.id));
                saveState(categorySessionKey, state.CategoryList);  // Save the updated CategoryList
            }
        }
    }
});

export const {
    addCategory,
    addTodoToCategory,
    removeCategory,
    removeTodoFromCategory,
    selectCategory
} = categorySlice.actions;

export default categorySlice.reducer;
