import React, {Component} from 'react';
import './App.css';
import 'tachyons';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo/Logo';
import ImageUrlInput from '../components/ImageUrlInput';
import FaceRecognition from '../components/FaceRecognition';
import Particles from 'react-particles-js';

const particleOptions = {
  "particles": {
    "number": {
      "value": 100
    },
    "size": {
      "value": 3
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      }
    }
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl : '',
      input: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  };

  onButtonClick = () => {
    this.setState({imageUrl: this.state.input});
  };

  render() {
    const { imageUrl } = this.state;
    return (
      <div>
        <Particles className='particles' params={particleOptions}/>
        <Navigation/>
        <Logo/>
        <ImageUrlInput onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
        <FaceRecognition imageUrl={imageUrl}/>
      </div>
    );
  }
}

export default App;
