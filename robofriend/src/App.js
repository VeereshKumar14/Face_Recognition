import React, { Component } from 'react';
import Navigation from './Navigation/Navigation';
import Logo from './Logo/Logo';
import ImageLinkForm from './ImageLinkForm/ImageLinkForm';

import FaceRecognition from './FaceRecognition/FaceRecognition';
import SignIn from './Signin/Signin';
import Register from './Signin/register';
import Particles from 'react-particles-js';
import './App.css';


import Clarifai from 'clarifai';


const app = new Clarifai.App({
 apiKey: 'd6ae1df7517f4690ad0306dd10ddc2ec'
});
const particlesOption={
  
               
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 1000
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 10,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 60,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 300,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 10,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 800,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 800,
        "size": 80,
        "duration": 2,
        "opacity": 0.8,
        "speed": 3
      },
      "repulse": {
        "distance": 400,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}
              


class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box:{},
      route: 'signin'
    }
  }
  calculateFaceLocation =(data)=>{
const face=data.outputs[0].data.regions[0].region_info.bounding_box;
const image=document.getElementById('inputimage');
const width=Number(image.width);
const height=Number(image.height);
//console.log(width,height);
return {
  left:face.left_col*width,
  top:face.top_row*height,
  right:width-(face.right_col*width),
  bottom:height-(face.bottom_row*height)
  }
}
displayBox=(box)=>{
  console.log(box);
  this.setState({box:box});
}
onInputChange=(event )=>{
  this.setState({input:event.target.value});

}
onSubmit=()=>
{
  //console.log('click');
  this.setState({imageUrl: this.state.input})
  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  .then(response => this.displayBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));

}
onRouteChange =(route)=>{
this.setState({route:route})
}

  render() {
    return (
      <div className="App">
       <Particles className='particles'
              params={
                particlesOption
              }
              
            />
         { this.state.route==='register' ? <Register onRouteChange={this.onRouteChange}/>
         :<div>
       <Navigation  onRouteChange={this.onRouteChange} />
      { 
        this.state.route==='signin'
        ?
         <SignIn onRouteChange={this.onRouteChange} /> 
        :
        <div>
       <Logo />
       <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />      
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>

     }
     </div>}
      </div >
    );
  }
}

export default App;
