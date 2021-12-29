import React from 'react';
import {View, Button, Text} from 'react-native';     

export default class Update extends React.Component{
  addNews = () => {
    this.props.navigation.navigate("AddNews");
  }

  addHealthServices =() => {
    this.props.navigation.navigate("AddHealthServices")
  }

  ManageStudentQuery =() => {
    this.props.navigation.navigate("ManageStudentQuery")
  }
  render(){
    return(
      <View style = {{flex:1, alignItems:'stretch', margin:10}}>
        <Text>What you Want to Update ?</Text>
        <Text></Text>
        <Button title = "Quiz Creation" onPress = {this.addNews}/> 
        <Text></Text>
        <Button title = "Study Material Creation" onPress = {this.addHealthServices} />
        <Text></Text>
        <Button title = "Manage Student Query" onPress = {this.ManageStudentQuery} />
      </View>
    )
  }
}
