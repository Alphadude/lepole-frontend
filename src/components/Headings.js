import React from 'react'

const H2 = ({ children, className, ...props }) => {
  return (
    <h2 className={"text-off-black font-semibold text-3xl leading-[40px] font-droid " + className} {...props}>
      {children}
    </h2>
  )
}

const H5 = ({ children, className, ...props }) => {
  return (
    <h5 className={"text-black text-base font-light tracking-wide leading-[30px] mt-[8px] font-montserrat" + className} {...props}>
      {children}
    </h5>
  )
}


export { H2, H5 }