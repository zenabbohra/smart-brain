import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
  return(
    <div className='tc'>
      <img
        alt='Face Recognition'
        src={imageUrl}
        width='500px' height='auto'
      />
    </div>
  );
};

export default FaceRecognition;