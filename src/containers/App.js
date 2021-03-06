import React, {Component} from 'react';
import './App.css';
import 'tachyons';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageUrlInput from '../components/ImageUrlInput/ImageUrlInput';
import FaceRecognition from '../components/Facerecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import Entry from '../components/Entry/Entry';
import config from './particlesjs-config';

const app = new Clarifai.App({
  apiKey: 'de40d02dd82d4e4b826194bf1a7dfe20'
});

const particleOptions = config;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      input: '',
      box: [],
      isSignedIn: false,
      page: 'sign in',
      imageInputError: null,
      user: {
        name: '',
        signInEmail: '',
        signInPassword: '',
        entries: 0,
        joined_date: new Date()
      }
    }
  }

  componentDidMount() {
    fetch('https://face-detect-zenab.herokuapp.com/');
  }

  calculateFaceDim = (data) => {
    let arrOfRegions = [];
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    for (let faceRegion of data.outputs[0].data.regions) {
      arrOfRegions.push({
        leftCol: faceRegion.region_info.bounding_box.left_col * width,
        topRow: faceRegion.region_info.bounding_box.top_row * height,
        rightCol: width - faceRegion.region_info.bounding_box.right_col * width,
        bottomRow: height - faceRegion.region_info.bounding_box.bottom_row * height,
      })
    }
    return arrOfRegions;
  };

  displayFaceBox = (boundingBox) => {
    this.setState({box: boundingBox});
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  };

  onButtonClick = () => {
    this.setState({imageUrl: this.state.input, imageInputError: null});
    if(this.state.input){
      //detecting the face using clarifai API
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then(response => {
          const boundingBox = this.calculateFaceDim(response);
          this.displayFaceBox(boundingBox);
          return boundingBox;
        })
        .then(boundingBox => {
          if(boundingBox) {
            //Updating the entry count each time the button is clicked
            fetch('https://face-detect-zenab.herokuapp.com/image', {
              method: 'PUT',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, {entries: count}))
              })
              .catch(err => console.log('entry count error', err))
          }
          else console.log('no box dimension returned');
        })
        .catch(err => {
            this.setState({imageInputError : 'Bad image url provided', box: ''});
            console.log('Bad image url provided', err);
        });
    } else{
      this.setState({imageInputError: 'No image url provided', box: ''})
    }
  };

  onPageChange = (page) => {
    console.log('page', page);
    if (page === 'sign out') {
      this.setState({isSignedIn: false});
    } else if (page === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({page: page});
  };

  loadUser = (data) => {
    const {id, name, email, password, entries, joined} = data;
    this.setState({
      user: {
        id: id,
        name: name,
        email: email,
        signInPassword: password,
        entries: entries,
        joined: joined
      },
      imageUrl: '',
      imageInputError: null
    });
  };


  render() {
    const {imageUrl, box, isSignedIn, page, user, imageInputError} = this.state;
    const {onPageChange, loadUser, onButtonClick, onInputChange} = this;
    return <div>
      <Particles className='particles' params={particleOptions}/>
      <Navigation onPageChange={onPageChange} isSignedIn={isSignedIn}/>
      {!isSignedIn && (page === 'sign out' || page === 'sign in') ?
        <Signin onPageChange={onPageChange} loadUser={loadUser}/>
        : !isSignedIn && page === 'register' ?
        <Register onPageChange={onPageChange} loadUser={loadUser} /> :
        <div>
          <Logo/>
          <Entry name={user.name} entries={user.entries}/>
          <ImageUrlInput onInputChange={onInputChange} onButtonClick={onButtonClick} imageInputError={imageInputError}/>
          <FaceRecognition imageUrl={imageUrl} box={box}/>
        </div>
      }
    </div>;
  }
}

export default App;
