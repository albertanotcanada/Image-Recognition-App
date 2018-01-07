import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Camera from 'react-native-camera';
import Inputs from './screens/Inputs.js';

export default class App extends React.Component {


    constructor() {
        super();
        this.state = {
            currentPic: '',
            currentScreen: "camera"
        }
    }
    takePicture() {
        state.currentScreen = "inputText";
        this.setState({currentScreen: "inputText"});
        this.camera.capture()
            .then((data) => (
                this.setState({currentPic: data})
            ))
            .catch(err => console.error(err));

    }


  render() {
      if(state.currentScreen === "camera"){
          return (
              <Camera
                  ref={(cam) => {
                      this.camera = cam;
                  }}
                  style={styles.preview}
                  aspect={Camera.constants.Aspect.fill}>
                  <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
              </Camera>


          );
      } else if(state.currentScreen === "inputText"){

          return <Inputs />;
      }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 400,
        width: 500
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40,
        height: 80,
        width: 150
    }
});
