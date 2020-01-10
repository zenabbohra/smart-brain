import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  const { topRow, rightCol, bottomRow, leftCol } = box;

  return(
    <div className='center'>
      <div className='mt2 tc' style={{'position':"relative"}}>

        <img
          alt=''
          id='inputimage'
          src={imageUrl}
          width='500px' height='auto'

        />
        <div className='bounding-box' style={{top:topRow, right: rightCol, bottom:bottomRow, left:leftCol }}>
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;