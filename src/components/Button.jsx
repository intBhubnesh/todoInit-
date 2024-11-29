import { React } from "react"

export default function Button({width='150px', height='50px', text='Create',font='22px', rounded="12px",className, onClick }) {
    return(
        <div className="inline-flex items-center pb-1 w-fit px-4 justify-center bg-[#75AB5C] shadow-sm" style={{ height, borderRadius: rounded}} onClick={onClick}>
            <h3 className="text-white" style={{fontSize : font }}>{text}</h3>
        </div>
    )
}
