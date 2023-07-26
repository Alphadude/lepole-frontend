import React from 'react'

const ModalContainer = ({ children, modalOpen, toggleModal, scrollable, zIndex, ...props }) => {

  return (
    <div
      className={` top-0 left-0 absolute w-screen h-screen justify-center overflow-y-aut items-center bg-[#000000aa] dark:bg-[#000000cc] ${zIndex || 'z-20'} ${modalOpen ? 'flex flex-col opacity-100 transition-all delay-1000 ' : 'hidden opacity-0 delay-1000 transition-all'}  `}

      {...props}
    >
      <div onClick={toggleModal} className={`w-full px-2 items-center  flex-1 overflow-y-auto border-red-500 flex flex-col justify- ${!scrollable && 'justify-center'} `}>
        {children}

        <div onClick={e => e.stopPropagation()} className='p-6 flex flex-col justify-center text-center '>
          <button onClick={toggleModal} className='text-primary-white'>
            Go back
          </button>
        </div>
      </div>
    </div>
  )
}


export default ModalContainer