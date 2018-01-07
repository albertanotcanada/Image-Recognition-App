import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Image, Button, TouchableHighlight } from 'react-native'
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';

class Inputs extends React.Component {

    constructor(props) {
        super();
        this.state = {
            searchWord: '',
            currentImageData: '',
            hasSubmitted: false,
            numCols: 2,
            numRows: 1,
            isAudioRecording: true,
            voiceResults: [],
            voiceResultsOneStringFormat: "",
        };

        Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
        Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
        Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);

        try {
            Voice.start('en-US');
        } catch (err) {
            console.error(err);
        }
    }

    onSpeechStartHandler(){}
    onSpeechEndHandler(){}


    onSpeechResultsHandler(e) {
        let stringVal = e.value[0].toLowerCase().split(" ");
        this.setState({voiceResultsOneStringFormat: e.value[0].toLowerCase()});
        this.setState({
            voiceResults: stringVal,
        });

        if(this.state.voiceResults.length > 3 &&
            this.state.voiceResults[0] === "where" &&
            this.state.voiceResults[1] === "is" &&
            this.state.voiceResults[2] === "my") {
            this.setState({ searchWord: this.state.voiceResults[3] });
        } else {
            this.setState({ searchWord: stringVal });
        }
    }

    async onStartButtonPress(){
        if(!this.state.isAudioRecording) {
            this.setState({
                voiceResults: "",
                isAudioRecording: true
            });
            try {
               await Voice.start('en-US');
            } catch (err) {
                console.error(err);
            }
        } else {
            try {
                await Voice.stop();
            } catch (e) {
                console.error(e);
            }
            this.setState({isAudioRecording: false});
        }
    }

    componentDidMount() {
        this.mounted = true;
        fetch('https://desolate-spire-63252.herokuapp.com?columns=2&rows=1', {
            method: 'POST',
            body: this.props.photo
        })
            .then(result => result.json())
            .then(result => this.setState({currentImageData: result}))
    }

    checkResult() {
        if(this.state.hasSubmitted && this.state.currentImageData === '') {
            return(
                <View style = {styles.container}>
                    <Text> Loading ... </Text>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        if(!this.state.hasSubmitted) {
            return this.returnDefaultSearchScreen();
        }
        if(this.state.hasSubmitted && this.state.currentImageData !== '') {
            return this.whereIsOurObject();
        }
    }


    whereIsOurObject() {
        //for every col
        //for every row
        //is our object contained there?
        //
        var onLeft = 0;
        var onRight = 0;

        //alert(JSON.stringify(this.state.currentImageData.blocks[0].tags[0]));
        if(this.state.currentImageData.blocks[0].tags.includes(this.state.searchWord[0])){
            onLeft = 1;
        }

        // alert(this.state.currentImageData.blocks[0].tags);
        // alert(this.state.currentImageData.blocks[1].tags);
        //alert(this.state.searchWord[0] === "computer");
        //alert(this.state.currentImageData.meta.tags);
        //alert(this.state.currentImageData.blocks[1].tags.includes("computer"));
        if(this.state.currentImageData.blocks[1].tags.includes(this.state.searchWord[0])){
            onRight = 1;
        }

        if(onLeft === 1 && onRight === 0){
            return this.renderObjectIs("on the left!");
        } else if(onRight === 1 && onLeft === 0){
            return this.renderObjectIs("on the right!");
        } else if(this.state.currentImageData.meta.tags.includes(this.state.searchWord[0])){
            return this.renderObjectIs("on both sides!");
        } else {
            return this.renderObjectIs("on neither side!");
        }

    }

    renderObjectIs(location) {
        Tts.speak(`${this.state.searchWord[0]} is ${location}`);
        return (
            <View style = {styles.container}>
                <Text>{this.state.searchWord[0]} is {location} </Text>
                <Button
                    onPress={this.props.gotoCamera}
                    title="Return to Camera"
                    color="#841584"
                    accessibilityLabel="Return to the camera"
                />
            </View>
        )
    }

    currColor() {
        if(this.state.isAudioRecording) {
            return "#00FF7F";
        }
        return "#f66464";
    }

    returnDefaultSearchScreen() {
        return (
            <View style = {[styles.container, {backgroundColor: this.currColor()}]}>
                <TouchableHighlight onPress = {() => this.onStartButtonPress()} underlayColor="transparent">
                <Image
                    source={require('../mic.png')}
                />
                </TouchableHighlight>
                <Text style = {styles.input}
                           placeholder = "Type or talk to search ..."
                           value = {this.state.voiceResultsOneStringFormat.toString()}
                           placeholderTextColor = "#000"
                           autoCapitalize = "none"

                />

                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => {
                            this.setState({hasSubmitted: true});
                            this.setState({voiceResults: ""});
                        }
                    }>
                    <Text style = {styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </View>

        )
    }

    render(){
        //make function here that checks on both pieces of the data
        return this.checkResult();
    }
}
export default Inputs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#f45151',
        borderWidth: 1,
        width: 300,
        backgroundColor: "#fff",
        borderRadius: 6,
        paddingLeft: 3,
    },
    submitButton: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 15,
        height: 40,
        borderRadius: 6,
    },
    submitButtonText:{
        color: '#000'
    }
})