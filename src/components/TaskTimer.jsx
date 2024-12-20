import { React, useEffect, useState } from "react";
import Button from "./Button.jsx"
import Plants from "./Plants.jsx"
import { useDispatch, useSelector } from "react-redux";
import TimerButtons  from "./TimerButtons.jsx"
import { completedTodo, pausedTodo } from "../features/todoSlice.js";
import { completedDaily, pauseDaily } from "../features/dailySlice.js";


export default function TaskTimer({setIsTaskTimerOpen,startedTaskId, type}){
    const [isButtonClicked ,setIsButtonClicked] = useState(true)
    const [plantBoxOpen, setPlantBoxOpen] = useState(true)
    const [plant, setPlant] = useState('plant0')
    const [remainingTime, setRemainingTime] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false); // To start/stop the timer

    const dispatch = useDispatch()
    // Select the active "Started" todo from Redux state
    let daily =  useSelector(state => state.dailies.dailyList)
    let pending = useSelector(state => state.todos.todoList)
    console.log((type === 'daily'));;

    const selectedTodo = type === 'daily' ? daily.find((todos) => todos.id === startedTaskId)
                                        : pending.find(todos => todos.id === startedTaskId)

    console.log('time in TaskTimer : ', selectedTodo)

    // Parse the time from the selectedTodo when it changes
    useEffect(() => {
        if (selectedTodo?.time) {
            const parsedTime = parseTime(selectedTodo.time); // Parse time to seconds
            setRemainingTime(parsedTime); // Set remaining time
        }
    }, [selectedTodo]);

// Start the countdown when the timer is active
useEffect(() => {
    if (isTimerActive) {
        if (remainingTime > 0) {
            const interval = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1); // Decrement timer by 1 second
            }, 1000);

            return () => clearInterval(interval); // Clear interval to prevent memory leaks
        } else {
            setTimeOnDoneConfirm(); // Trigger only if `remainingTime` reaches 0 while active
        }
    }
}, [isTimerActive, remainingTime]);


    // Function to parse time input into seconds
    function parseTime(inputTime) {
        const timeStr = inputTime.toLowerCase(); // Normalize case
        let minutes = 0;

        const hourMatch = timeStr.match(/(\d+)\s*(h|hr|hrs)/); // Match hours
        const minuteMatch = timeStr.match(/(\d+)\s*(m|min|mins)/); // Match minutes

        if (hourMatch) {
            minutes += parseInt(hourMatch[1]) * 60; // Convert hours to minutes
        }
        if (minuteMatch) {
            minutes += parseInt(minuteMatch[1]); // Add minutes
        }

        return minutes * 60; // Convert total minutes to seconds
    }

    // Format time into HH:MM:SS but omit hours if 0
    function formatTime(seconds) {
        const hrs = Math.floor(seconds / 3600); // Calculate hours
        const mins = Math.floor((seconds % 3600) / 60); // Calculate minutes
        const secs = seconds % 60; // Calculate seconds

        // Format: Omit hours if `hrs` is 0
        if (hrs === 0) {
            return `${mins.toString().padStart(2, "0")}:${secs
                .toString()
                .padStart(2, "0")}`;
        }
        return `${hrs.toString().padStart(2, "0")}:${mins
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    function convertToOriginalTimeFormat(seconds) {
        const hrs = Math.floor(seconds / 3600); // Calculate hours
        const mins = Math.floor((seconds % 3600) / 60); // Calculate remaining minutes

        let timeStr = "";
        if (hrs > 0) {
            timeStr += `${hrs} hr${hrs > 1 ? "s" : ""} `; // Add hours with proper pluralization
        }
        if (mins > 0) {
            timeStr += `${mins} min${mins > 1 ? "s" : ""}`; // Add minutes with proper pluralization
        }

        return timeStr.trim(); //
    }




    function setTimeOnDoneConfirm(){
        setRemainingTime(0)
        type === 'daily' ? dispatch(completedDaily(startedTaskId)) : dispatch(completedTodo(startedTaskId))
        setIsTaskTimerOpen(false)
        setIsTimerActive(false)
        setIsButtonClicked(false)
    }
    function setTimeOnQuitConfirm(){
        if(type === 'daily'){
            dispatch(pauseDaily({id : startedTaskId, time : convertToOriginalTimeFormat(remainingTime)}))
        }else {
            dispatch(pausedTodo({id : startedTaskId, time : convertToOriginalTimeFormat(remainingTime)}))
        }
        setRemainingTime(0)
        setIsTaskTimerOpen(false)
        setIsTimerActive(false)
        setIsButtonClicked(false)
    }



    return (
        <>
            <div
            className="absolute inset-0 m-8 mt-24 mb-4 rounded-2xl"
            style={{
                background: 'radial-gradient(592.78% 179.8% at 48.75% 46.03%, #035F56 0%, #006B55 12.85%, #017A54 21.74%, #008E5C 31.42%, #029767 42%, #07A070 51.77%, #1EB993 62.86%, #20C19F 70.12%, #33D8C8 100%)',
              }}
            >
                <div className="flex flex-col items-center gap-8 py-4">
                    {/* timer */}
                    <div className="inline-flex flex-col justify-center">
                        <h5 className="text-[#CCCCCC] text-2xl text-center">Time</h5>
                        <h1 className="-mt-3 text-6xl tracking-tighter text-center text-white">{formatTime(remainingTime)}</h1>
                    </div>

                    <div className="size-80">
                        <img
                            src={plant} alt="Selectd Plant" className="drop-shadow-2xl"
                        />
                    </div>
                    {plantBoxOpen && (
                        < Plants setPlant={setPlant} setPlantBoxOpen={setPlantBoxOpen}/>
                    )}

                    {/* button */}
                    { isButtonClicked && (< Button text="Plant" onClick={() => {
                        setIsTimerActive(true)
                        setIsButtonClicked(false)}} />)}
                        {!isButtonClicked && (
                            < TimerButtons handleDoneConfirm={setTimeOnDoneConfirm} handelDoneQuite={setTimeOnQuitConfirm}  setRemainingTime={setRemainingTime}/>
                        )
                        }
                </div>

            </div>
        </>
    )
}
