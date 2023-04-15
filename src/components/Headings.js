import React from 'react';

const H1 = ({ children, className, ...props }) => {
  return (
    <h1
      className={'font-bold font-droid lg:text-[32px] ' + className}
      {...props}
    >
      {children}
    </h1>
  );
};

const Heading2 = ({ children, className, ...props }) => {
  return (
    <h2 className={'font-semibold font-montserrat ' + className} {...props}>
      {children}
    </h2>
  );
};

const H2 = ({ children, className, ...props }) => {
  return (
    <h2
      className={
        'text-off-black dark:text-renaissance-dark-black font-semibold md:text-3xl text-base leading-[40px] font-droid ' +
        className
      }
      {...props}
    >
      {children}
    </h2>
  );
};

const H3 = ({ children, className, ...props }) => {
  return (
    <h3
      className={
        'font-bold text-lg text-renaissance-black dark:text-renaissance-dark-black ' +
        className
      }
      {...props}
    >
      {children}
    </h3>
  );
};

const H5 = ({ children, className, ...props }) => {
  return (
    <h5
      className={
        'text-black md:text-base font-normal md:tracking-wide md:leading-[30px] font-montserrat ' +
        className
      }
      {...props}
    >
      {children}
    </h5>
  );
};
const P = ({ children, className, ...props }) => {
  return (
    <p
      className={
        'text-renaissance-black dark:text-renaissance-dark-black text-sm font-normal leading-7 font-montserrat ' +
        className
      }
      {...props}
    >
      {children}
    </p>
  );
};

export { H1, H2, H3, H5, Heading2, P };
