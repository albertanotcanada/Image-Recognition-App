import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


import Inputs from './screens/Inputs.js';
import Camera from 'react-native-camera';

export default class App extends React.Component {
  render() {

    return (

        <Inputs />
  //       <Camera
  //     ref={(cam) => {
  //         this.camera = cam;
  //     }}
  //     aspect={Camera.constants.Aspect.fill}>
  // <Text onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
  // </Camera>



    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
