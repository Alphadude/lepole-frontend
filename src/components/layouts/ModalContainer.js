import React from 'react'

const ModalContainer = ({ children, modalOpen, toggleModal, zIndex, ...props }) => {

  return (
    <div
      className={` top-0 left-0 absolute w-screen h-screen justify-center overflow-y-auto items-center bg-[#000000aa] ${zIndex || 'z-20'} ${modalOpen ? 'flex flex-col opacity-100 transition-all delay-1000 ' : 'hidden opacity-0 delay-1000 transition-all'}  `}
      onClick={toggleModal}
      {...props}
    >
      <div onClick={(e) => e.stopPropagation()} className=' flex-1  overflow-y-auto  border-red-500 flex flex-col mb-'>
        {children}
        <div className='p-10 flex flex-col justify-center text-center '>
          <button onClick={toggleModal} className='text-primary-white'>
            Go back
          </button>
        </div>
      </div>
    </div>
  )
}


export default ModalContainer