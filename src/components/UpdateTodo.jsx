import {React, useState} from 'react'
import ToDoTags from './toDoTags.jsx'
import calender from '../assets/calender.svg'
import time from "../assets/time.svg";
import easy  from "../assets/easy.svg";
import puzzel from "../assets/puzzel.svg"
import dropDown from "../assets/dropDown.svg"
import Button from './Button.jsx';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo } from '../features/todoSlice';
import { AnimatePresence,motion } from 'framer-motion';
import { addTodoToCategory } from '../features/categorySlice';
import { nanoid } from '@reduxjs/toolkit';
export default function CreateToDo({setUpdateTodo, updateTodoId }){
    const dispatch = useDispatch()
    const todo = useSelector(state => state.todos.todoList.find(todo => todo.id === updateTodoId))

    const [Input, setInput] = useState(todo.name)
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
    const [Time, setTime] = useState(todo.time)
    const [Difficulty, setDifficulty] = useState(todo.difficulty)
    const category = useSelector(state => state.categories.CategoryList.find(cat => cat.id === todo.categoryId))
    const [Category, setCategory] = useState(category.name)

    const categories = useSelector(state => state.categories.CategoryList)

    function handleUpdateTodo() {
        const selectedCategory = categories.find((category) => category.name === Category);

        if (!selectedCategory) {
          alert("Please select a valid category.");
          return;
        }

        const newTodo = {
          id: todo.id,
          name: Input,
          time: Time,
          status: 'notStarted',
          categoryId: selectedCategory,
          difficulty : Difficulty,
          dueDate : Date
        };

        // Dispatch the new todo and associate it with the category
        dispatch(updateTodo(newTodo));
        setInput('');
        setUpdateTodo(false);
      }


    function toggleCategoryDropdown(){
        setIsCategoryDropdownOpen(prev => !prev)
    }
    function selectCategory(cat) {
        setCategory(cat)
        setTimeout(() =>(setIsCategoryDropdownOpen(false)),100)
    }

    const [activeTag, setActiveTag] = useState(null)

    function toggleActiveTag(tag){
        console.log(tag);

        setActiveTag(prev => (prev === tag ? null : tag))
    }

    function handelDifficulty(lable){
        if(!lable) return ;

        switch (lable) {
            case '😊' :
            case 'Easy':
                setDifficulty("😊 Easy")
                break;
            case '😐' :
            case 'Medium':
                setDifficulty("😐 Medium")
                break;
            case '😡' :
            case 'Hard':
                setDifficulty(" 😡 Hard")
                break;

            default :
                setDifficulty("Difficulty")
                break;
        }
    }


    function handleDropdown(id){
        if(!id) return ;

        switch(id){
            case 'Difficulty' :
              return (
              <AnimatePresence>
                  <motion.div
                    className="absolute z-10 p-4 bg-white border rounded-lg shadow-md"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div
                      className="flex gap-6 px-3"
                      onClick={(e) => {
                        handelDifficulty(e.target.textContent)
                        toggleActiveTag(id)
                      }}
                    >
                      <div className='flex flex-col items-center justify-center cursor-pointer'>
                        <span className='text-2xl'>😊</span>
                      <h4 className="text-lg text-[#6F6D6B] ">Easy</h4>
                      </div>
                      <div className='flex flex-col items-center justify-center cursor-pointer'>
                        <span className='text-2xl'>😐</span>
                      <h4 className="text-lg text-[#6F6D6B] ">Medium</h4>
                      </div>
                      <div className='flex flex-col items-center justify-center cursor-pointer'>
                        <span className='text-2xl'>😡</span>
                      <h4 className="text-lg text-[#6F6D6B] ">Hard</h4>
                      </div>
                    </div>
                  </motion.div>
          </AnimatePresence>);
            break;

            case 'Time' :
                return (
                    <AnimatePresence>
                        <motion.div
                        className="absolute z-10 p-4 bg-white border rounded shadow-md"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <input
                          type="text"
                          placeholder="Enter time (e.g., 2 hrs, 30 mins)"
                          className="p-2 border rounded"
                          onKeyDown={handelTimeInput}
                        />
                        </motion.div>
                </AnimatePresence>)
                break;

                case 'Date' :
                    return  (<motion.div
                        className="absolute z-10 p-4 bg-white border rounded shadow-md"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <input
                          type="date"
                          className="p-2 border rounded"
                          onKeyDown={(e) => handleDateInput(e)}
                        />
                      </motion.div>)
                default:
                {}
                break;
        }
    }

    function handelTimeInput(e){
        const inputTime = e.target.value;

        //if enter is pressed
        if(event.key === 'Enter'){
            if(validateTime(inputTime)){
                setTime(inputTime)
                console.log(inputTime)
                setActiveTag(null)
            }
            else {
                alert("Invalid time format. Please enter a valid time (e.g., '2 Hrs', '30 Mins').")
            }
        }
    }

    function validateTime(input) {
        // Basic validation for time format (e.g., "2 Hrs" or "30 Mins")
        const timeRegex = /^(\d+\s?(hrs?|h)\s?)?(\d+\s?(mins?|m))?$/i;
        return timeRegex.test(input);
      }


    const [Date, setDate] = useState('Date')


    function formatDate(inputDate) {
        const date = dayjs(inputDate);
        if (!date.isValid()) {
          console.error("Invalid date format:", inputDate);
          return "Invalid Date";
        }
        return date.format('MMM D');  // Format as "Nov 22"
      }



    function handleDateInput(e){
        const inputDate = e.target.value
        console.log(formatDate("2024-11-22"));
        console.log(Date);


        // if the eneter button has been pressed
        if(event.key === 'Enter'){
            const formattedInput = formatDate(inputDate)
            setDate(formattedInput)
            setActiveTag(null)
        }

    }


    let icons = [{
        id : "Date",
        icon : calender,
        lable : Date
    },
    {
        id : "Time",
        icon : time,
        lable : Time
    } ,
    {
        id : "Difficulty",
        ...(Difficulty === 'Difficulty' && {icon : easy}),
        lable : Difficulty
    }]
    return (
        < div className='shadow-lg absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-fit bg-white rounded-[20px]'>

        <div className='flex flex-col gap-6 p-4 border-b-2'>
            <div className="inline-flex flex-col ">
                <input type="text" name="categoryName" value={Input} onChange={e => setInput(e.target.value)} id="categoryName" placeholder="Category Name" className="text-4xl font-semibold " />
                <label htmlFor="categoryName" className="text-[#6F6D6B] text-xl">Category</label>
            </div>
        <div className='flex flex-row gap-6 '>
            {icons.map(({id, icon, lable},index) => (
                <div className='relative' key={index}>
                < ToDoTags   lable={lable}  icon={icon} onClick={() => toggleActiveTag(id)}/>
                {id === activeTag && handleDropdown(activeTag)}
            </div>
            ))}
        </div>
        </div>

        <div className='flex items-center justify-between p-4'>
            <div className='inline-flex items-center justify-between gap-3'>
                <div className='inline-flex items-center justify-center'>
                    <img src={puzzel} alt="puzzel_icon" />
                </div>
                <div className='relative inline-flex flex-row items-center justify-between gap-1' onClick={toggleCategoryDropdown}>
                    <h4 className='text-xl text-[#6F6D6B]'>{Category}</h4>
                    <div>
                        <img src={dropDown} alt="dropDown_icon" />
                    </div>
                    <AnimatePresence>
              {isCategoryDropdownOpen &&  (
                <motion.div
                  className="absolute z-10 w-48 bg-white border rounded-lg -left-3 -top-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  {categories.map(({name, id}) => (
                    <div
                      key={id}
                      onClick={() => selectCategory(name)}
                      className="px-4 py-2 text-xl text-[#6F6D6B]  cursor-pointer hover:bg-gray-100 bg-white"
                    >
                      {name}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
                </div>
            </div>
            < Button text="Update" onClick={handleUpdateTodo} />
        </div>
        </div>
    )
}
