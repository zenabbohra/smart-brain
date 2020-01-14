import React from 'react';

const Entry = ({ name, entries }) => {
  return(
    <div className='f4'>
      <p className='center i'>{`${name}, your entry count is `}</p>
      <p className='f3 tc'>{`${entries}`}</p>
    </div>
  );
};

export default Entry;