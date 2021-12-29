import React from 'react';
import { Text, View, Button, TextInput, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import {Image } from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false
        }
    }

    /*
    nextScreen = () => {
        if(this.state.username == 'admin' && this.state.password == 'admin') {
            //this.props.navigation.replace("HomeScreen", {isLogin: true});
            this.props.navigation.replace("Update", {isLogin: true});
        } 
        else if(this.state.username == "SuperAdmin" && this.state.password == "SuperAdmin123"){
            this.props.navigation.replace("SuperAdmin", {isLogin: true});
        }
        else{
            Alert.alert("Somethign is Invalid..!!!");
        }
    }
    */

    loginClick = async() => {
        this.setState({loading:true});
        try{    
            const parameter = "?email="+ this.state.email + "&password="+ this.state.password;
            
            const response = await fetch("https://thecoronatrackerapp.herokuapp.com/admin-login"+ parameter, {method: "POST"});
            const json  = await response.json();
            if(json.status == 200){
                if(json.result != null){
                    if(json.result.email == "superadmin@gmail.com" && json.result.password == "superadmin123"){
                        this.props.navigation.navigate("SuperAdmin");
                    }
                    else{
                        this.props.navigation.navigate("Update");
                    }
                }
                else{
                    Alert.alert("Error", "email and password does not match.")
                }
                
            }
            this.setState({loading:false});
        }
        catch(e){
            console.error(e);
            this.setState({loading:true});
        }
    }


    registerClick = () => {
        this.props.navigation.navigate("RegisterScreen");
    }

    render(){
        return(
            <View style = { styles.container}>
                {
                    this.state.loading ?
                    <ActivityIndicator size = "large" />
                    :
                    <View>
                        <View style = { styles.img }>
                            <Image source = {require('../assets/photos/Splash/java.gif')} style = {{width:200, height:200}}/>
                        </View>
                        <View>
                            <Text style = { styles.text }>Email</Text>
                            <TextInput placeholder = "Enter Email" onChangeText = {(val) => {this.setState({email: val})}} style = { styles.input }/>
                            <Text style = { styles.text }>Password</Text>
                            <TextInput secureTextEntry={true} placeholder = "Enter Password" onChangeText = {(val) => {this.setState({password: val})}} style = { styles.input }/>
                        </View>
                        <View>
                            <Button title = "Login" onPress = {()=>{this.loginClick();}}></Button>
                        </View>
                        <TouchableOpacity activeOpacity = {0.7} style = {{alignItems:'center'}} onPress = {this.registerClick}>
                            <Text style = {{fontWeight:'300'}}>Register Here !</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,justifyContent:'center', marginHorizontal: 25
    },
    img:{
        justifyContent:'center', alignItems:'center', margin:25
    },
    text:{
        marginBottom: 5
    },
    input:{
        borderRadius:4, borderColor: '#000', borderWidth: 1,height:40, width:'100%', paddingHorizontal:20, marginBottom: 20
    }
});