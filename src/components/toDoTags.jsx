import { React } from "react";

export default function ToDoTags({icon, lable, onClick}){
    return(
        <div
        className="flex flex-row px-4  py-2 w-fit h-fit rounded-lg items-center justify-between gap-2 outline outline-1 outline-[#D8D7D6]"
        onClick={onClick}
        >
           {icon && (<div className="inline-flex items-center justify-center size-6">
                <img src={icon} alt="" />
            </div>)}
            <h4 className="text-xl text-[#6F6D6B]">{lable}</h4>
        </div>
    )
}
