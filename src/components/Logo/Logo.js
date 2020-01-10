import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import './brainLogo.png';

const Logo = () => {
  return(
    <div className=' ma4 mt0'>
      <Tilt className="Tilt br2 shadow-2" options={{ max : 65 }} style={{ height: 250, width: 250 }} >
        <div className="Tilt-inner">
          <img
            alt='Smart brain Logo'
            src="brainLogo.png"
          />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;