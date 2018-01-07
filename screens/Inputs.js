import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator } from 'react-native'

class Inputs extends React.Component {
    state = {
        searchWord: '',
        currentImageData: '',
        hasSubmitted: false
    };
    handleSearchWord = (text) => {
        this.setState({ searchWord: text })
    };

         // Replace the subscriptionKey string value with your valid subscription key.
       // const subscriptionKey = "fb4716ed10714097b83eee1544ba4d94";

        // let uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories%2CDescription%2CColor&details=&language=en";

        //now search for the thing in the image

        // fetch(uriBase, {
        //     // Request headers.
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Ocp-Apim-Subscription-Key": subscriptionKey
        //     },
        //     method: "POST",
        //
        //     // Request body.
        //     body: JSON.stringify({"url": this.state.imageURL})
        // })
        //     .then(data => data.json()) //waits for the ~promise!~
        //     .then(data => {
        //         for(let i in data.description.tags) { //should prob error check this
        //             if(this.state.searchWord===data.description.tags[i]) {
        //                 alert("Yes! Your image is contained!");
        //                 return
        //             }
        //         }
        //         alert("No! :( Your image is not contained!");
        //     })
        //     .catch((error) => alert(error));


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
            //return the result!
        }
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