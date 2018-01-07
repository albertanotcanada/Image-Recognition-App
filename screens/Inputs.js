import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator } from 'react-native'

class Inputs extends React.Component {
    state = {
        searchWord: '',
        currentImageData: '',
        hasSubmitted: false,
        numCols: 2,
        numRows: 1
    };
    handleSearchWord = (text) => {
        this.setState({ searchWord: text })
    };


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

    returnDefaultSearchScreen() {
        return (
            <View style = {styles.container}>
                <TextInput style = {styles.input}
                           placeholder = "Thing you're looking for"
                           placeholderTextColor = "#f45151"
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
    },
    submitButton: {
        backgroundColor: '#f45151',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText:{
        color: 'white'
    }
})