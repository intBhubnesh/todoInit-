import { React } from "react";

export default function AddToDo({onClick}){
    return (
        <div
        className=" absolute bottom-10 right-10  rounded-full bg-[#98C259] size-[72px] inline-flex items-center justify-center shadow-lg"
        onClick={onClick}>
            <div className="inline-flex justify-center iteam-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"  stroke="white" class="size-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
</div>
        </div>
    )
}
