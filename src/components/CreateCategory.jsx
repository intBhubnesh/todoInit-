import { React, useState } from "react"
import Button from "./Button"
import image from "../assets/03.svg"
import { useDispatch } from "react-redux"
import { addCategory } from "../features/categorySlice"

export default function CreateCategory({setShowCreateCategory}){

    const dispatch = useDispatch()
    const [Input, setInput] = useState('')
    function handleCreateCategory(){
        dispatch(addCategory({name : Input}))
        setShowCreateCategory(prev => !prev)
        setInput('')
    }
    return (
        <div className="absolute right-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-fit bg-white flex flex-col gap-3 rounded-3xl pb-5">
            <div className="flex justify-center mx-auto border-b-[1.2px] w-[90%] py-7 border-gray-300">
                <img src={image} alt="activity image"  className="w-80"/>
            </div>
            <div className="flex items-center justify-evenly">

<div className="inline-flex items-center justify-center">
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="49" viewBox="0 0 48 49" fill="none">
<rect width="48" height="48" transform="translate(0 0.5)" fill="white"/>
<path d="M23.4 6.10997C23.5892 6.02737 23.7935 5.98474 24 5.98474C24.2065 5.98474 24.4108 6.02737 24.6 6.10997C31.9961 9.34277 39.0511 13.3057 45.66 17.94C45.8929 18.1033 46.0746 18.3295 46.1838 18.5922C46.293 18.8548 46.3253 19.1431 46.2769 19.4235C46.2284 19.7038 46.1013 19.9645 45.9103 20.1753C45.7192 20.3861 45.4722 20.5383 45.198 20.614C38.3368 22.509 31.6977 25.1318 25.394 28.438L25.388 28.442C25.16 28.562 24.934 28.68 24.708 28.802C24.4905 28.9182 24.2476 28.979 24.001 28.979C23.7544 28.979 23.5115 28.9182 23.294 28.802C20.5903 27.3591 17.8228 26.0391 15 24.846V24.398C15 24.136 15.134 23.902 15.344 23.776C18.3627 21.9466 21.4684 20.2646 24.65 18.736C25.0086 18.5636 25.284 18.2558 25.4156 17.8804C25.5473 17.5049 25.5244 17.0925 25.352 16.734C25.1796 16.3754 24.8718 16.1 24.4964 15.9683C24.1209 15.8367 23.7086 15.8596 23.35 16.032C20.0816 17.6025 16.8912 19.3306 13.79 21.21C13.3488 21.4776 12.9682 21.8342 12.6724 22.2571C12.3766 22.6799 12.1721 23.1597 12.072 23.666C9.03442 22.4972 5.94137 21.4779 2.804 20.612C2.52979 20.5363 2.28277 20.3841 2.09174 20.1733C1.90072 19.9625 1.77358 19.7018 1.72515 19.4215C1.67672 19.1411 1.70899 18.8528 1.81821 18.5902C1.92743 18.3275 2.10909 18.1013 2.342 17.938C8.95038 13.3046 16.0047 9.34229 23.4 6.10997Z" fill="#98C259"/>
<path d="M26.12 31.446C31.0325 28.8214 36.1622 26.6253 41.452 24.882C41.72 27.71 41.892 30.568 41.962 33.45C41.9698 33.7521 41.8861 34.0495 41.7219 34.3033C41.5578 34.557 41.3208 34.7552 41.042 34.872C35.3726 37.2398 29.9442 40.1479 24.832 43.556C24.5856 43.7203 24.2961 43.8079 24 43.8079C23.7039 43.8079 23.4144 43.7203 23.168 43.556C18.0565 40.148 12.6288 37.24 6.96002 34.872C6.68122 34.7557 6.44404 34.5579 6.27953 34.3045C6.11502 34.0512 6.03084 33.754 6.03802 33.452C6.10802 30.568 6.28002 27.712 6.54802 24.88C8.39002 25.488 10.208 26.148 12 26.86V29.4C11.5679 29.649 11.2046 30.0018 10.9432 30.4264C10.6817 30.8511 10.5302 31.3343 10.5024 31.8322C10.4746 32.3302 10.5713 32.8272 10.784 33.2783C10.9966 33.7295 11.3183 34.1205 11.72 34.416C11.54 35.176 11.276 35.922 10.926 36.636C11.83 37.062 12.728 37.504 13.618 37.956C14.1197 36.9355 14.49 35.8556 14.72 34.742C15.2258 34.5171 15.6595 34.1567 15.9731 33.7006C16.2868 33.2445 16.4681 32.7106 16.4971 32.1578C16.5261 31.6051 16.4016 31.0551 16.1373 30.5687C15.8731 30.0823 15.4795 29.6785 15 29.402V28.112C17.3362 29.1326 19.6313 30.2448 21.88 31.446C22.5323 31.7944 23.2605 31.9767 24 31.9767C24.7396 31.9767 25.4677 31.7944 26.12 31.446Z" fill="#98C259"/>
<path d="M8.92402 39.424C9.76402 38.586 10.43 37.644 10.924 36.634C11.83 37.062 12.728 37.504 13.618 37.958C12.9636 39.2872 12.0946 40.4995 11.046 41.546C10.7617 41.811 10.3856 41.9552 9.99698 41.9484C9.60837 41.9415 9.2376 41.7841 8.96278 41.5093C8.68795 41.2345 8.53053 40.8637 8.52367 40.4751C8.51681 40.0865 8.66106 39.7104 8.92602 39.426L8.92402 39.424Z" fill="#98C259"/>
</svg>

</div>
<div className="inline-flex flex-col ">
<input type="text" name="categoryName" id="categoryName" placeholder="Category Name" className="text-4xl font-semibold " value={Input} onChange={(e) => setInput(e.target.value)}/>
<label htmlFor="categoryName" className="text-[#6F6D6B] text-xl">Category</label>
</div>
< Button onClick={handleCreateCategory}  />
            </div>
        </div>

    )
}