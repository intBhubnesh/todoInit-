import { React, useState } from "react";
import Streak from "../components/Streak.jsx";
import Category from "../components/Category.jsx";
import CreateToDo from "../components/CreateToDo.jsx";
import AddToDo from "../components/AddToDo.jsx";
import PendingTask from "../components/PendingTask.jsx";
import DailyTask from "../components/DailyTask.jsx";
export default function Forgound() {
    const [showCreateToDo, setShowCreateToDo] = useState(false)

    function toggleCreateToDo() {
        setShowCreateToDo(prev => !prev)
    }

    return (
        <div className="fixed top-0 z-10 w-full h-screen">
            <div className=" absolute inset-5 rounded-[40px]  backdrop-blur-md ">
                <div className="flex flex-col items-center w-full h-full gap-5">
                    <div className="flex flex-col w-full">
                        < Streak />
                        < Category />
                        {showCreateToDo && < CreateToDo setShowCreateToDo={setShowCreateToDo} />}
                        < AddToDo onClick={toggleCreateToDo} />
                    </div>
                    <div className="flex flex-row items-center justify-between w-full h-full gap-6 px-10 pb-4">
                        < PendingTask />
                        < DailyTask />
                    </div>
                </div>
            </div>

        </div>
    )
}
