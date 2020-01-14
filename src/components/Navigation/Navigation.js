import React from 'react';

const Navigation = ({ onPageChange }) => {
  return(
    <nav style={{display:'flex', justifyContent:'flex-end'}}>
      <p onClick={onPageChange} className='underline pa3 f3 dim pointer link'>Sign Out</p>
    </nav>
  );
};

export default Navigation;