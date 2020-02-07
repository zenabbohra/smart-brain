import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  // const { topRow, rightCol, bottomRow, leftCol } = box;

  return(
    <div className='center'>
      <div className='mt2 tc' style={{'position':"relative"}}>

        <img
          alt=''
          id='inputimage'
          src={imageUrl}
          width='500px' height='auto'
        />
        {box.length
          ? box.map((item, i) => {
            return (
              <div
                key={i}
                className="bounding-box"
                style={{
                  top: item.topRow,
                  left: item.leftCol,
                  bottom: item.bottomRow,
                  right: item.rightCol
                }}
              />
            )
          })
          : ''}
      </div>
    </div>
  );
};

export default FaceRecognition;