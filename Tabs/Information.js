import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Image, ScrollView, Text, TextInput, Alert } from 'react-native';
import {Input} from 'react-native-elements';

import { Entypo } from '@expo/vector-icons'; 
import AppPicker from '../Components/AppPicker';

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
    };

    this.genderCategories=[
        {value:"1",label:"Chapter1: Java - Overview", desc: "Lore Ipsumm 1111111"},
        {value:"2",label:"Chapter2: Java- Environment Setup", desc: "Lorem Ipsum 2222"},
        {value:"3",label:"Chapter3: Java - Basic Syntax", desc: "Lorem Ipsum 333"},
        {value:"4",label:"Chapter4: Java - Object and Classes", desc: "Lorem Ipsum 44"},
        {value:"5",label:"Chapter5: Java- Basic Datatypes", desc: "Lorem Ipsum 555"},
        {value:"6",label:"Chapter6: Java - Variable Types", desc: "Lorem Ipsum 666"},
        {value:"7",label:"Chapter7: Java - Modifier Types", desc: "Lorem Ipsum 7777"},
        {value:"7",label:"Chapter8: Java-Basic Operators", desc: "Lorem Ipsum 8888"},
      ];

  }
  
  backChevronPressed = () => {
    this.props.navigation.navigate("Profile");
  }

  save = () => {
    Alert.alert("Your question has been send to the Tutor,.. He will reply back to you shortly.");
  }
  
  render() {
    return (
      <ScrollView>
        
        <View style = {styles.container}>
            <View style = {{ marginTop:40}}/>
          <View>  
            <Text>What is Your Doubt ?</Text>
            <Input 
              value = {this.state.name} 
              onChangeText={value => this.setState({ name: value })}
              style = {styles.inputText}
            />
          </View>
          
          <AppPicker 
            type = "Topic"
            value = {this.state.gender}
            selecteditem = {this.genderCategories}
            onSelectItem = {item => this.setState({gender:item})}
            items ={this.genderCategories}
          />

          <View style = {{height:20}} />

          <View style = {styles.topContainer}>
            <TouchableOpacity style = {styles.backChevronContainer} onPress = { () => this.save()}>
            <Text style = {styles.saveText}>ASK</Text>
            </TouchableOpacity>
         </View>

        </View>
      </ScrollView>
    );
  }
}

export default Information;

const styles = StyleSheet.create({
  backChevronContainer:{
    marginBottom:10,
  },
  container:{
    marginHorizontal:20
  },
  inputText:{
    paddingLeft:15,
    fontSize:17,
  }, 
  icon:{
    width:30, 
    height:30,
    marginRight:15
  },
  saveText:{
    fontSize:20,
    color:'blue'
  },
  topContainer:{
    justifyContent:'space-between',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginHorizontal:20,
    flexDirection:'row',    
    alignItems:'center',
    marginBottom:30
  },
  textInput: {
    borderRadius:4, 
    borderColor: '#b5b5b5', 
    borderWidth: 1, 
    margin:5, 
    height:40, 
    padding:5
  },
  inputPicker:{
    borderBottomWidth:1,
    marginBottom:30,
    borderColor:'grey',
    marginHorizontal:10,
  }
})