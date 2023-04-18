import React from 'react'

const ModalContainer = ({ children, modalOpen, toggleModal, zIndex, ...props }) => {
  return (
    <div
      className={` top-0 left-0 absolute w-screen h-screen justify-center overflow-y-auto  items-center  bg-[#000000aa]  ${zIndex || 'z-20'} ${modalOpen ? 'flex opacity-100 transition-all delay-1000 ' : 'hidden opacity-0 delay-1000 transition-all'}  `}
      onClick={toggleModal}
      {...props}
    >
      <div onClick={(e) => e.stopPropagation()} className=' h-screen  flex pb-5'>
        {children}
      </div>
    </div>
  )
}


export default ModalContainer