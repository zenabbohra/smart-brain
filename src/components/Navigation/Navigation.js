import React from 'react';

const Navigation = ({onPageChange, isSignedIn}) => {
  if (isSignedIn) {
    return <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <p onClick={() => onPageChange('sign out')} className='underline pa3 f3 dim pointer link'>Sign Out</p>
    </nav>;
  }else {
    return <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
      <p onClick={() => onPageChange('sign in')} className='underline pa3 f3 dim pointer link'>Sign In</p>
      <p onClick={() => onPageChange('register')} className='underline pa3 f3 dim pointer link'>Register</p>
    </nav>;
  }
};

export default Navigation;