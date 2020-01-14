import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';

const Logo = () => {
  return (
    <div className=' ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2" options={{max: 65}} style={{height: 150, width: 150}}>
        <div className="Tilt-inner pa3">
          <img
            alt=''
            src="brainLogo.png"
            style={{height: 120, width: 120}}
          />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;