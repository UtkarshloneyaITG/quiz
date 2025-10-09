import React from 'react'

const PopUp = ({onStart}) => {
    return (
        <div className='pop-bg w-full h-full'>
            <div className="pop-up w-[560px] max-w-full p-8 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 shadow-2xl mx-auto ">
                <div className="text text-5xl font-extrabold text-white text-center mb-4 tracking-wide drop-shadow-lg">
                    Are You Ready..?
                </div>
                <div className="subtext text-lg font-semibold text-zinc-300 text-center mb-8">
                    You have only <span className="font-bold text-white">30 minutes</span>
                </div>
                <button onClick={onStart}
                    className="start-btn w-120  bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold py-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50">
                    Start
                </button>
            </div>
        </div>
    )
}

export default PopUp
