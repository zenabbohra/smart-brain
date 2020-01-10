import React from 'react';

const ImageUrlInput = ({ onInputChange, onButtonClick }) => {
  return(
    <div className='tc'>
      <p className='f4 black-70'>This Magic Brain will detect faces in your pictures. Git it a try. </p>
      <input
        className='pa1 w-30-l shadow-5 bw1 b--white'
        type='text'
        placeholder='Insert face image url here'
        onChange={onInputChange}
      />
      <button
        className="f6 link dim ph3 pv2 mb2 dib white bg-light-purple"
        onClick={onButtonClick}
      >Detect</button>
    </div>
  );
};

export default ImageUrlInput;