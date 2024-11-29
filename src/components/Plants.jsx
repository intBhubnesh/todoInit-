import { React, useState } from "react";
import plant0 from '../assets/00.png'
import plant2 from '../assets/02.png'
import plant3 from '../assets/03.png'
import plant4 from '../assets/04.png'
import plant5 from '../assets/05.png'




export default function Plants({setPlantBoxOpen, setPlant}) {
    const plants = [{
        name: plant0,
        id: '00'
    },
    {
        name: plant2,
        id: '02'
    }, {
        name: plant3,
        id: '03'
    }, {
        name: plant4,
        id: '04'
    }, {
        name: plant5,
        id: '05'
    }]

    function selectPlant(plant){
        setPlant(plant)
        setPlantBoxOpen(false)
    }
    return (
        <div className="absolute inset-0 py-40 px-14">
            {/* tree */}
            <div className="flex flex-row flex-wrap w-full h-full gap-8">
                {plants.map(({ name, id }) => (
                    <div
                    className="inline-flex items-center justify-center size-44"
                    onClick={() => selectPlant(name)}>
                        <img src={name} alt={id} key={id} />
                    </div>
                ))}
            </div>
        </div>
    )
}
