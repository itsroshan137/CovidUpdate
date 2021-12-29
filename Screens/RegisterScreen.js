import React from 'react';
import {View, Button, Text, ActivityIndicator, Alert} from 'react-native';    
import {Input} from 'react-native-elements';

export default class Update extends React.Component{
    constructor(){
        super();
        this.state = {
            fullname:'',
            email:'',
            password:'',
            repassword:'',
            loading: false
        }
    }

    registerUser = async() => {
        try{  
            if(this.state.password === this.state.repassword){
                const parameter = "?fullName="+ this.state.fullName + "&email="+ this.state.email + "&password="+ this.state.password;
                this.setState({loading:true});  
                const response = await fetch("https://thecoronatrackerapp.herokuapp.com/create-admin"+ parameter, {method: "POST"});
                const json  = await response.json();
                if(json.status == 200){
                    Alert.alert("Congratulations", this.state.fullname+" You are Admin Now..");
                    this.props.navigation.pop();
                }
                this.setState({fullName: '', email:'', password:'', repassword:''});
            }
            else{
                Alert.alert("Error", "Password and Re Password did not match")
            }
        }
        catch(e){
            console.error(e);
            this.setState({loading:true});
        }
    }
    
render(){
    return (
      <View style = {{flex:1, marginHorizontal:22, marginTop:10}}>
      {
          this.state.loading ?
              <ActivityIndicator size = "large"/>
            :
        <View>
            <Text>Full Name</Text>
            <Input placeholder = "Please Enter your full Name" onChangeText = {(val) => this.setState({fullname:val})}/>
            <Text>Enter Email Address</Text>
            <Input placeholder = "Please Enter Email Address" onChangeText = {(val) => this.setState({email:val})}/>
            <Text>Enter Password</Text>
            <Input placeholder = "Enter Password" onChangeText = {(val) => this.setState({password:val})}/>
            <Text>Re-Enter Password</Text>
            <Input placeholder = "Re-Enter Password" onChangeText = {(val) => this.setState({repassword:val})}/>
            <Button title = "Register User" onPress = {this.registerUser}/>
        </View>
      }
      </View>
    )
  }
}
