import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Task from './Task'


export default function PendingTask(){


    const categoryList = useSelector(state => state.categories.CategoryList);

    const category = categoryList.find((todo) => todo.isSelected === true);
    const categoryId = category.id
    console.log(category)

    // If no category is selected or no tasks exist, show empty state
    if (!category) {
        return <div>No category selected</div>;
    }

    const todos = category.task || [];

    const numberOfTodos = todos.length;
    const completedTodos = useSelector(state => state.todos.todoList.filter(todo => todo.status === 'Completed'))
    const numberOfCompletedTodos = completedTodos.length


    return (
        <div className='w-full bg-white h-full overflow-hidden rounded-[20px] '>

            {/* header */}
            <div className='flex flex-row items-center justify-between w-full p-4 pb-2 border-b-2'>
            <div className='inline-flex flex-col '>
                <h2 className='text-3xl font-semibold'>Pending Task</h2>
                <p className='text-base text-[#8E8E8E]'><span className='text-lg font-medium text-[#75AB5C]'>{numberOfCompletedTodos}</span>/<span>{numberOfTodos}</span> Done</p>
            </div>
            <div className='inline-flex flex-col items-end'>
                <h2 className='text-4xl font-semibold text-[#75AB5C]'>22,000</h2>
                <p className='text-base text-[#8E8E8E]'><span className='text-lg font-medium text-[#75AB5C]'>8</span>/<span>10</span> Done</p>
            </div>
            </div>
        <div className='w-full h-[360px] overflow-y-scroll  '>
        {todos.map(({id}) =>  (

<Task key={id} id={id} categoryId={categoryId} />
))}
        </div>

        </div>
    )
}
