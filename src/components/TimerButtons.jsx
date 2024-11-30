
import { React, useState } from "react";
import tick from '../assets/tick.svg'
import minus from '../assets/minus.svg'
import cross from '../assets/cross.svg'
import add from '../assets/add.svg'
import CautionPopUp from './CautionPopUp.jsx'


export default function TimerButtons({handleDoneConfirm, handelDoneQuite , setRemainingTime}) {
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)
    const [selectedButton, setSelectedButton] = useState(null)

    const actionButton = [{
        id : "Done",
        icon : tick,
        heading : "Is the task done ?",
        desc  : "Are you sure your task is truly complete? Just like planting a tree, giving enough time and care ensures the sweetest fruits. Be honest and nurture your growth!",
        handleConfirm : handleDoneConfirm

    },{
        id : "Quit",
        icon : cross,
        heading : "Are you sure Quiting ?",
        desc : 'Leaving a task midway is like neglecting a plant—it withers and dies. Without care and effort, no task can truly flourish. Are you sure you want to quit?',
        handleConfirm : handelDoneQuite

    }]

    function handelTick0rCrossClick(id){
            setIsPopUpOpen(true)
            setSelectedButton(actionButton.find(btn => btn.id === id))

    }

    function handelAddClick(){
        setRemainingTime(prev => prev += 300)
    }
    function handelMinusClick(){
        setRemainingTime(prev => prev > 300 ? prev -= 300 : prev)
    }
    return (
        <div className="absolute inset-0 m-44">
            <div className="flex flex-row items-center justify-between gap-56 px-28">
                <div className="flex flex-col items-center justify-between h-full gap-8">
                    {
                        actionButton.map(({id, icon}) => (
                            <div className="inline-flex items-center justify-center" onClick={() =>  handelTick0rCrossClick(id)}>
                            <img src={icon} alt={id} />
                        </div>
                        ))
                    }

                </div>
                <div className="flex flex-col ">
                    <div className="inline-flex items-center justify-center -mt-2">
                        <img src={add} alt="add" onClick={handelAddClick}/>
                    </div>
                    <h3 className="-mt-1 text-xl font-medium text-center text-white">15 Min</h3>
                    <div className="inline-flex items-center justify-center">
                        <img src={minus} alt="minus" onClick={handelMinusClick}/>
                    </div>
                </div>
                {selectedButton && isPopUpOpen && < CautionPopUp setIsPopUpOpen={setIsPopUpOpen}  heading={selectedButton.heading} description={selectedButton.desc} onClick={selectedButton.handleConfirm}/>
                        }
            </div>

        </div>
    )
}
