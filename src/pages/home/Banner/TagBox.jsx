import React from 'react';

const TagBox = ({ Icon, title }) => {
  return (
    <div className='backdrop-blur-sm py-4 px-6 shadow-lg border-2 border-t-c-secondary border-r-c-secondary border-b-c-primary border-l-c-primary flex flex-col items-center space-y-3 rounded-md cursor-pointer'>
      <h3 className='font-semibold md:text-xl'>{title}</h3>
      <Icon className='text-2xl md:text-3xl'></Icon>
    </div>
  );
};

export default TagBox;