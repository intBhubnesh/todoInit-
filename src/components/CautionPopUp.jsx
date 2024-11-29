import { React } from "react";
import Button from "./Button";
import PopUpImg  from "../assets/PopUpImg.png"

export default function CautionPopUp({setIsPopUpOpen, heading, description, onClick }) {

    function handelCancel(){
        setIsPopUpOpen(false)
    }

    return (
        <div className="absolute inset-0 -top-20 left-32 drop-shadow-2xl">
            <div className="w-[540px] h-[300px] bg-[#008E5C] rounded-[30px]  flex flex-row  outline outline-4 outline-white justify-center items-center gap-8">
                {/* img */}
                <div className="inline-flex items-center justify-center size-52" >
                    <img src={PopUpImg} alt="Plant" />
                </div>
                {/* left box */}
                <div className="inline-flex flex-col items-center justify-between gap-8 ">
                    {/* text */}
                    <div className="inline-flex flex-col items-start justify-between gap-2">
                        <h2 className="text-2xl font-medium tracking-tight text-white">{heading}</h2>
                        <p className="text-[12px] text-white font-light tracking-tight w-[220px]" style={{ textAlign: 'justify' }}>{description}</p>
                    </div>
                    {/* buttons */}
                    <div className="inline-flex flex-row items-center justify-between gap-8">
                        < Button text="Cancel" onClick={handelCancel} width="100px" height="36px" font="16px" rounded="8px"/>
                        < Button text="Confirm" onClick={onClick} width="100px" height="36px" font="16px" rounded="8px"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
