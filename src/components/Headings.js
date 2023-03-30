import React from 'react'

const H2 = ({ children, className, ...props }) => {
  return (
    <h2 className={"text-black font-bold text-3xl  font-serif " + className} {...props}>
      {children}
    </h2>
  )
}

const H5 = ({ children, className, ...props }) => {
  return (
    <h5 className={"text-black text-base font-normal mt-1 " + className} {...props}>
      {children}
    </h5>
  )
}


export { H2, H5 }