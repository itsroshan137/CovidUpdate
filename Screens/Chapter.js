import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class Chapter extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: props.route.params.title,
            body: props.route.params.body, 
        }
    }
    render() {
        
        return (
            <View style = {{marginHorizontal:20, marginVertical:20}}>
                <Text style = {{fontSize:18, fontWeight:'bold'}}>{this.state.title}</Text>
                <Text style = {{marginTop:5}}>{this.state.body}</Text>
            </View>
        )
    }
}

export default Chapter
