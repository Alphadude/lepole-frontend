import React from 'react'

const H2 = ({ children, className, ...props }) => {
  return (
    <h2 className={"text-off-black font-semibold text-3xl  font-droid " + className} {...props}>
      {children}
    </h2>
  )
}

const H5 = ({ children, className, ...props }) => {
  return (
    <h5 className={"text-black text-base font-light tracking-wider mt-2 font-montserrat" + className} {...props}>
      {children}
    </h5>
  )
}


export { H2, H5 }