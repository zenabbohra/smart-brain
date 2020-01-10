import React from 'react';
import './App.css';
import 'tachyons';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo/Logo';
import ImageUrlInput from '../components/ImageUrlInput';

function App() {
  return (
    <div>
      <Navigation/>
      <Logo/>
      <ImageUrlInput/>
      {/*<FaceRecognition/>*/}
    </div>
  );
}

export default App;
