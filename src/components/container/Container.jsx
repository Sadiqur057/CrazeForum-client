import React from 'react';

const Container = ({children}) => {
  return (
    <div className="max-w-screen-xl w-[90%] md:w-5/6 mx-auto">
      {children}
    </div>
  );
};

export default Container;