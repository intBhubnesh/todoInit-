import { React, useState } from "react";
import { useSelector } from 'react-redux';
import Task from './Task.jsx'
import CreateDailyTask from './CreateDailyTask.jsx'

export default function DailyTask(){
    const [isCreateDailyTaskOpen, setIsCreateDailyTaskOpen] = useState(false)
    const dailyTodos = useSelector(state => state.dailies.dailyList)

    console.log("daily :",dailyTodos)
    // If no category is selected or no tasks exist, show empty state
    if (!dailyTodos) {
        return <div>No category selected</div>;
    }

    const numberOfTodos = dailyTodos.length;
    const completedTodos = useSelector(state => state.dailies.dailyList.filter(todo => todo.status === 'Completed'))
    const numberOfCompletedTodos = completedTodos.length

    function handleCreateDailyTask() {
        setIsCreateDailyTaskOpen(prev => !prev)

    }

    return (
        <div className="bg-white w-[40%] h-full rounded-[20px]">
             {/* header */}
             <div className='flex flex-row items-center justify-between w-full p-4 pb-2 border-b-2'>
            <div className='inline-flex flex-col '>
                <h2 className='text-3xl font-semibold'>Daily Task</h2>
                <p className='text-base text-[#8E8E8E]'><span className='text-lg font-medium text-[#75AB5C]'>{numberOfCompletedTodos}</span>/<span>{numberOfTodos}</span> Done</p>
            </div>
            {/* add icon */}
            <div className="flex items-center justify-center rounded-xl size-12 text-lime-600 bg-lime-100" onClick={handleCreateDailyTask}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.379a.75.75 0 0 1-.53-.22L11.47 3.66A2.25 2.25 0 0 0 9.879 3H4.5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h15Zm-6.75-10.5a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V10.5Z" clip-rule="evenodd" />
</svg>

            </div>
            </div>
        <div className='w-full h-[360px] overflow-y-scroll  '>
        {dailyTodos.map(({id}) =>  (

<Task key={id} id={id} type="daily" />
))}
        </div>
        {isCreateDailyTaskOpen && (
            <CreateDailyTask setIsCreateDailyTaskOpen={setIsCreateDailyTaskOpen} />
        )}
        </div>
    )
}
