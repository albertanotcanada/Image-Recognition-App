import React from 'react';
import { StyleSheet, TouchableHighlight, Image } from 'react-native';

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
        this.camera.capture()
            .then((data) => this.setState({currentPic: data, currentScreen: "inputText"}))
            .catch(err => console.error(err));

    }

    gotoCamera() {
        this.setState({currentScreen: "camera"});
    }

    sendPicToServer() {
        // fetch(uriBase, {
        //
        //     method: "POST",
        //     body: JSON.stringify({"url": this.state.imageURL})
        // })
            // .then(data => data.json()) //waits for the ~promise!~
            // .then(data => {
            //
            //     alert("No! :( Your image is not contained!");
            // })
            // .catch((error) => alert(error));
    }

  render() {
      if(this.state.currentScreen === "camera" || this.props.isCam){
          return (
              <Camera
                  ref={(cam) => {
                      this.camera = cam;
                  }}
                  captureTarget={Camera.constants.CaptureTarget.memory}
                  style={styles.preview}
                  aspect={Camera.constants.Aspect.fill}>

                  <TouchableHighlight style={styles.capture}  onPress={this.takePicture.bind(this)}
                                      accessibilityLabel={"Take Image"}>
                      <Image
                          source={require('./cam.png')} style={{width: 130, height: 100}}

                      />
                  </TouchableHighlight>

              </Camera>


          );
      } else if(this.state.currentScreen === "inputText"){
          //alert(JSON.stringify(this.state.currentPic.data));
          return <Inputs returnToParent={this.gotoCamera} photo={this.state.currentPic.data}/>;
      }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 5,
        padding: 10,
        paddingRight: 120,
        margin: 40,
        height: 100,
        width: 150
    }
});
