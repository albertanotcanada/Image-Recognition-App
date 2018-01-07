import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

class Inputs extends React.Component {
    state = {
        searchWord: '',
        imageURL: 'http://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg'
    }
    handleSearchWord = (text) => {
        this.setState({ searchWord: text })
    }

    lookForWord = (searchTerm, imageURL) => {
         // Replace the subscriptionKey string value with your valid subscription key.
        var subscriptionKey = "fb4716ed10714097b83eee1544ba4d94";

        let uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories%2CDescription%2CColor&details=&language=en";

        //now search for the thing in the image


        // Perform the REST API call.

        fetch(uriBase, {
            // Request headers.
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": subscriptionKey
            },
            method: "POST",

            // Request body.
            body: JSON.stringify({"url": this.state.imageURL})
        })
            .then(data => data.json())
            .then(data => alert(JSON.stringify(data)))
            .catch((error) => alert(error));
        // $.ajax({
        //     url: uriBase + "?" + $.param(params),

        //     // Request headers.
        //     beforeSend: function(xhrObj){
        //         xhrObj.setRequestHeader("Content-Type","application/json");
        //         xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        //     },

        //     type: "POST",

        //     // Request body.
        //     data: '{"url": ' + '"' + sourceImageUrl + '"}',
        // })


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