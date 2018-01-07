import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

class Inputs extends React.Component {
    state = {
        searchWord: ''
    }
    handleSearchWord = (text) => {
        this.setState({ searchWord: text })
    }

    lookForWord = (searchTerm) => {
        alert('you searched for: ' + searchTerm)
        //now search for the thing in the image
    }

    render(){
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
                        () => this.lookForWord(this.state.searchWord)
                    }>
                    <Text style = {styles.submitButtonText}> Submit </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Inputs

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#f45151',
        borderWidth: 1
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