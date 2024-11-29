import { React, useState } from "react"
import { useSelector } from "react-redux"

export default function Streak() {
    const category = useSelector(state => state.todos.todoList.filter((todo) => todo.status === "Completed"))
    const activeCount = category.length
    let date = new Date()
    return (
        <div className="flex flex-row items-center justify-between w-full px-10 mt-6">
            <div className="inline-flex flex-col wrapper">
                <h3 className="text-[32px]  font-semibold text-[#98C259] ">Streak</h3>
                <h4 className="text-xl text-white/75 mt-[-12px]  font-medium text-center #98C259]">{(date.toLocaleString('default', { month: "short" }) + " " + date.getDate().toString())}</h4>
            </div>

            <div className="flex flex-row flex-grow justify-evenly ">
                {[...Array(10)].map((_, index) => (
                    <div className="relative w-full pl-5">
                        <div key={index + 10}
                            className={`absolute w-[90px] h-[12px] rounded-full ${index < activeCount ? "bg-[#98C259]": "bg-[#98C259]/20"}`}
                        ></div>
                        <div key={index} className="absolute w-[90px] h-[12px] bg-[#98C259]/20 rounded-full"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}
