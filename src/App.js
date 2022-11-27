import React, {Component} from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './component/Navigation/Navigation';
import FaceRecognition from './component/FaceRecognition/FaceRecognition';
import SignIn from './component/SignIn/SignIn';
import Register from './component/Register/Register';
import Logo from './component/Logo/Logo';
import Rank from './component/Rank/Rank';
import ImageLinkForm from './component/ImageLinkForm/ImageLinkForm';
import './App.css';


const app = new Clarifai.App({
 apiKey: '11bbdb793fc840e5983d7e247ff07233'
});

const pariclesOptions= {
    particles: {
      number:{
        value:150,
        density:{
          enable:true,
          value_area:900
        }
      }
    }
  }


class App extends Component {
  constructor() {
    super();
    this.state ={
      input:'',
      imageURL:'',
      box:{},
      route:'SignIn',
      isSignedIn:false,
      userName:''

    }
  }

  calculateFaceLocation =(data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftcol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)


    }

  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onRegisterSubmit = () =>{
    this.setState({userName: this.state.name});
  }

  onInputChange = (event) =>{
   this.setState({input: event.target.value});
  }

  nameInput = (event) =>{
    this.setState({name: event.target.value});
  }

  onButtonSubmit =() =>{
    this.setState({imageURL: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));

  }
  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
   const { isSignedIn, imageURL, route, box, userName } = this.state;
  return (
    <div className="App">
    <Particles className='particles'
              params={pariclesOptions}
            />
     <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
     { route==='home'
     ? <div> 
          <Logo />
          <Rank userName={userName} />
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={box} imageURL={imageURL}/>
    </div>
    :(
      route==='SignIn'
        ? <SignIn onRouteChange={this.onRouteChange} />
        : <Register 
            onRegisterSubmit={this.onRegisterSubmit}
            nameInput={this.nameInput}
            onRouteChange={this.onRouteChange} />
    )
   
    }
    </div>
  );
}
}

export default App;
