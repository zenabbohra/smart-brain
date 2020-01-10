import React, {Component} from 'react';
import './App.css';
import 'tachyons';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo/Logo';
import ImageUrlInput from '../components/ImageUrlInput';
import FaceRecognition from '../components/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'de40d02dd82d4e4b826194bf1a7dfe20'
});
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
      input: '',
      box: {}
    }
  }
  calculateFaceDim = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        console.log('width', width, 'height', height, 'box:', clarifaiFace);
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height)
        }

  };

  displayFaceBox = (boundingBox) => {
    this.setState({box: boundingBox});
    console.log(this.state.box);
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  };

  onButtonClick = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        this.displayFaceBox(this.calculateFaceDim(response));
      })
      .catch(err => {
          console.log(err);
      });
  };

  render() {
    const { imageUrl, box } = this.state;
    return (
      <div>
        <Particles className='particles' params={particleOptions}/>
        <Navigation/>
        <Logo/>
        <ImageUrlInput onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
        <FaceRecognition imageUrl={imageUrl} box={box}/>
      </div>
    );
  }
}

export default App;
