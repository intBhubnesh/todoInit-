import { React, useEffect, useState } from "react";
import Button from "./Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import TaskTimer from "../components/TaskTimer.jsx";
import { removeTodo, startTodo } from "../features/todoSlice.js";
import { removeTodoFromCategory } from "../features/categorySlice.js";
import UpdateTodo from "./UpdateTodo.jsx";
import { removeDaily, startDaily } from "../features/dailySlice.js";
import UpdateDaily from "./UpdateDaily.jsx";

export default function Task({id ,categoryId, type}) {
    const [isTaskTimerOpen, setIsTaskTimerOpen] = useState(false)
    const [updateTodo, setUpdateTodo] = useState(false)
    const [updateDaily, setUpdateDaily] = useState(false)
    let daily =  useSelector(state => state.dailies.dailyList)
    let pending = useSelector(state => state.todos.todoList)
    const dispatch = useDispatch()


    let todo = type === 'daily' ? daily.find(todo => todo.id === id) : pending.find(todo => todo.id === id)

    function handleTaskSelection() {
        todo = type === 'daily' ? daily.find(todo => todo.id === id) : pending.find(todo => todo.id === id)

    }

    const activeStatus = todo?.status
    // Conditional classNames for styling based on task status
    const textColorClass = activeStatus === 'Completed' ? 'text-gray-400' : 'text-black';
    const tagsColorClass = activeStatus === 'Completed' ? 'text-[#CCCCCC]' : 'text-[#959595]';

    function handleTaskClick() {
        type === 'daily' ?
            dispatch(startDaily(id)) :
            dispatch(startTodo(id))
        setIsTaskTimerOpen(true)
    }

    function handleTodoDelete(){
        type === 'daily' ?
            dispatch(removeDaily(id))  :
            () => {
            dispatch(removeTodoFromCategory({CategoryId:categoryId ,toDo:todo}))
            dispatch(removeTodo(id))}
    }

    function handleTodoUpdate(){
       type === 'daily'  ? setUpdateDaily(true) : setUpdateTodo(true)
        handleTaskSelection()
    }
    return (
        <div className="w-full px-8 h-fit ">
            <div className="flex flex-row items-start  justify-between w-full border-b-[1px] h-fit  py-4">
                <div className="inline-flex flex-row items-start justify-between gap-3">
                   <div className="flex flex-row items-center justify-center gap-2 mt-2 ">

                   <div  className="inline-flex items-center justify-center" onClick={handleTodoDelete}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M14.74 9.00003L14.394 18M9.606 18L9.26 9.00003M19.228 5.79003C19.57 5.84203 19.91 5.89703 20.25 5.95603M19.228 5.79003L18.16 19.673C18.1164 20.2383 17.8611 20.7662 17.445 21.1513C17.029 21.5364 16.4829 21.7502 15.916 21.75H8.084C7.5171 21.7502 6.97102 21.5364 6.55498 21.1513C6.13894 20.7662 5.88359 20.2383 5.84 19.673L4.772 5.79003M19.228 5.79003C18.0739 5.61555 16.9138 5.48313 15.75 5.39303M4.772 5.79003C4.43 5.84103 4.09 5.89603 3.75 5.95503M4.772 5.79003C5.92613 5.61555 7.08623 5.48313 8.25 5.39303M15.75 5.39303V4.47703C15.75 3.29703 14.84 2.31303 13.66 2.27603C12.5536 2.24067 11.4464 2.24067 10.34 2.27603C9.16 2.31303 8.25 3.29803 8.25 4.47703V5.39303M15.75 5.39303C13.2537 5.20011 10.7463 5.20011 8.25 5.39303" stroke="#6F6D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                    </div>
                    <div className="inline-flex items-center justify-center">
                        {
                            activeStatus !== 'Completed' ? (                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={handleTodoUpdate}>
                                <path d="M15 12H9M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="#6F6D6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>) : (                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 12C2.25 6.615 6.615 2.25 12 2.25C17.385 2.25 21.75 6.615 21.75 12C21.75 17.385 17.385 21.75 12 21.75C6.615 21.75 2.25 17.385 2.25 12ZM15.61 10.186C15.67 10.1061 15.7134 10.0149 15.7377 9.91795C15.762 9.82098 15.7666 9.72014 15.7514 9.62135C15.7361 9.52257 15.7012 9.42782 15.6489 9.3427C15.5965 9.25757 15.5276 9.18378 15.4463 9.12565C15.3649 9.06753 15.2728 9.02624 15.1753 9.00423C15.0778 8.98221 14.9769 8.97991 14.8785 8.99746C14.7801 9.01501 14.6862 9.05205 14.6023 9.10641C14.5184 9.16077 14.4462 9.23135 14.39 9.314L11.154 13.844L9.53 12.22C9.38782 12.0875 9.19978 12.0154 9.00548 12.0188C8.81118 12.0223 8.62579 12.101 8.48838 12.2384C8.35097 12.3758 8.27225 12.5612 8.26882 12.7555C8.2654 12.9498 8.33752 13.1378 8.47 13.28L10.72 15.53C10.797 15.6069 10.8898 15.6662 10.992 15.7036C11.0942 15.7411 11.2033 15.7559 11.3118 15.7469C11.4202 15.738 11.5255 15.7055 11.6201 15.6519C11.7148 15.5982 11.7967 15.5245 11.86 15.436L15.61 10.186Z" fill="#75AB5C"/>
</svg>
)
                        }



                    </div>

</div>
                    <div>
                        <h4 className={`-mt-1 ${textColorClass}`}>{todo.name}</h4>
                        <div className="inline-flex flex-row gap-1">
                            <div className="inline-flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 13 12" fill="none">
                                    <path d="M6.39999 3V6.62497L8.64999 6M10.9 6C10.9 6.59095 10.7836 7.17611 10.5575 7.72208C10.3313 8.26804 9.99984 8.76412 9.58197 9.18198C9.16411 9.59984 8.66803 9.93131 8.12207 10.1575C7.5761 10.3836 6.99094 10.5 6.39999 10.5C5.80905 10.5 5.22388 10.3836 4.67792 10.1575C4.13195 9.93131 3.63588 9.59984 3.21801 9.18198C2.80015 8.76412 2.46868 8.26804 2.24254 7.72208C2.01639 7.17611 1.89999 6.59095 1.89999 6C1.89999 4.80653 2.3741 3.66193 3.21801 2.81802C4.06193 1.97411 5.20652 1.5 6.39999 1.5C7.59347 1.5 8.73806 1.97411 9.58197 2.81802C10.4259 3.66193 10.9 4.80653 10.9 6Z" stroke="#75AB5C" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <p className={`text-[12px] ${tagsColorClass}`}>{todo.time}</p>
                        </div>
                    </div>
                </div>
                <div className="inline-flex flex-col items-end justify-start gap-1 -m-1">
                    <div className="inline-flex flex-row items-center justify-center gap-1">
                        <div className="inline-flex flex-row items-center justify-center gap-1">
                            <p className={`text-sm ${tagsColorClass}`}>{todo.difficulty}</p>
                            <span className="text-[#959595]">·</span>
                            <div className="inline-flex flex-row items-center justify-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                                    <path d="M4.27499 1.5V2.625M9.52499 1.5V2.625M2.39999 9.375V3.75C2.39999 3.45163 2.51852 3.16548 2.7295 2.9545C2.94048 2.74353 3.22663 2.625 3.52499 2.625H10.275C10.5734 2.625 10.8595 2.74353 11.0705 2.9545C11.2815 3.16548 11.4 3.45163 11.4 3.75V9.375M2.39999 9.375C2.39999 9.67337 2.51852 9.95952 2.7295 10.1705C2.94048 10.3815 3.22663 10.5 3.52499 10.5H10.275C10.5734 10.5 10.8595 10.3815 11.0705 10.1705C11.2815 9.95952 11.4 9.67337 11.4 9.375M2.39999 9.375V5.625C2.39999 5.32663 2.51852 5.04048 2.7295 4.8295C2.94048 4.61853 3.22663 4.5 3.52499 4.5H10.275C10.5734 4.5 10.8595 4.61853 11.0705 4.8295C11.2815 5.04048 11.4 5.32663 11.4 5.625V9.375" stroke="#959595" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                                <p className={`text-sm ${tagsColorClass}`}>{todo.dueDate}</p>
                            </div>
                        </div>
                    </div>
                    {activeStatus !== 'Completed' && < Button text='Start' width="64px" height="24px" font='12px' rounded="5px" onClick={handleTaskClick}/>}
                </div>
            </div>
            {isTaskTimerOpen &&
                (<TaskTimer setIsTaskTimerOpen={setIsTaskTimerOpen} startedTaskId={id}  />)
            }
            {updateTodo &&
                (<UpdateTodo setUpdateTodo={setUpdateTodo} updateTodoId={id} type={daily} />)
            }
            { updateDaily &&
                (<UpdateDaily setUpdateDaily={setUpdateDaily} updateTodoId={id}  />)}
        </div>


    )
}
