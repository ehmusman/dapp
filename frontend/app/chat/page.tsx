import React from 'react'

const Chat = () => {
  return (
    <>
     <div className='container content-center w-4/5 p-5' >
                <div className="Container flex flex-col items-end rounded-2xl shadow-2xl drop-shadow-2xl border-t border-blue-600 p-5 max-h-96 overflow-x-auto no-scrollbar">
                    <div className="bubble border-2 border-blue-600 w-96 p-5 text-blue-800 font-sans text-lg rounded-full rounded-br-none my-2 hover:shadow-lg transition-all">Bubble</div>
                    <div className="bubble border-2 border-blue-600 w-96 p-5 text-blue-800 font-sans text-lg rounded-full rounded-br-none my-2 hover:shadow-lg transition-all">Bubble</div>
                    <div className="bubble border-2 border-blue-600 w-96 p-5 text-blue-800 font-sans text-lg rounded-full rounded-br-none my-2 hover:shadow-lg transition-all">Bubble</div>
                    <div className="bubble border-2 border-blue-600 w-96 p-5 text-blue-800 font-sans text-lg rounded-full rounded-br-none my-2 hover:shadow-lg transition-all">Bubble</div>
                    <div className="bubble border-2 border-blue-600 w-96 p-5 text-blue-800 font-sans text-lg rounded-full rounded-br-none my-2 hover:shadow-lg transition-all">Bubble</div>
                    <div className="bubble border-2 border-blue-600 w-96 p-5 text-blue-800 font-sans text-lg rounded-full rounded-br-none my-2 hover:shadow-lg transition-all">Bubble</div>
                </div>
            </div> 
    </>
  )
}

export default Chat