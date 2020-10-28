import React from 'react';
import {View, Button, Text} from 'react-native';     

export default class Update extends React.Component{
  addNews = () => {
    this.props.navigation.navigate("AddNews");
  }

  addHealthServices =() => {
    this.props.navigation.navigate("AddHealthServices")
  }
  render(){
    return(
      <View style = {{flex:1, alignItems:'stretch', margin:10}}>
        <Text>What you Want to Update ?</Text>
        <Text></Text>
        <Button title = "News" onPress = {this.addNews}/> 
        <Text></Text>
        <Button title = "Health Services" onPress = {this.addHealthServices} />
      </View>
    )
  }
}
