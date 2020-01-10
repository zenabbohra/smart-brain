import React, {Component} from 'react';
import './App.css';
import 'tachyons';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo/Logo';
import ImageUrlInput from '../components/ImageUrlInput';
import FaceRecognition from '../components/FaceRecognition';

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
    const { imageUrl, input } = this.state;
    return (
      <div>
        <Navigation/>
        <Logo/>
        <ImageUrlInput onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
        <FaceRecognition imageUrl={imageUrl}/>
      </div>
    );
  }
}

export default App;
