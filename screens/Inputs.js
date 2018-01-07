import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Image, TouchableHighlight } from 'react-native'
import Voice from 'react-native-voice';


class Inputs extends React.Component {

    constructor(props) {
        super();
        this.state = {
            searchWord: '',
            currentImageData: '',
            hasSubmitted: false,
            numCols: 2,
            numRows: 1,
            isAudioRecording: false,
            voiceResults: '',
        };

        Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
        Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
        Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
    }

    onSpeechStartHandler(){}
    onSpeechEndHandler(){}


    onSpeechResultsHandler(e) {
        this.setState({
            voiceResults: e.value,
        });
    }

    async onStartButtonPress(){
        if(!this.state.isAudioRecording) {
            this.setState({
                voiceResults: [],
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
    handleSearchWord = (text) => {
        this.setState({ searchWord: text })
    };

    componentDidMount() {
        this.mounted = true;
        fetch('https://desolate-spire-63252.herokuapp.com?columns=2&rows=1', {
            method: 'POST',
            body: this.props.photo
        })
            .then(result => result.json())
            .then(result => alert(JSON.stringify(result)))
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
            this.whereIsOurObject();
        }
    }


    whereIsOurObject() {
        //for every col
        //for every row
        //is our object contained there?
        //
        return this.renderObjectIs("on the left!");
    }

    returnToCamera(){
        //TODO: must return a camera prop
       return <App />;
    }

    renderObjectIs(location) {
        return (
            <View style = {styles.container}>
                <Text>{this.state.searchWord} + "is" + {location} </Text>
                <Button
                    onPress={returnToCamera}
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
                <TouchableHighlight onPress = {() => this.onStartButtonPress()}>
                <Image
                    source={require('../mic.png')}
                />
                </TouchableHighlight>
                <TextInput style = {styles.input}
                           placeholder = "Type or talk to search ..."
                           value = {this.state.voiceResults.toString()}
                           placeholderTextColor = "#000"
                           autoCapitalize = "none"
                           onChangeText = {this.handleSearchWord}/>

                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => this.setState({hasSubmitted: true})
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