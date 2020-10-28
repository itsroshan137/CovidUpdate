import React from 'react';
import {ScrollView, View, Text, Dimensions, Button, TouchableOpacity} from 'react-native';
import {Image} from 'react-native-elements';

export default class SplashScreen extends React.Component{

    buttonPressed = () => {
        this.props.navigation.replace("HomeScreen");
    }

    tologinScreen = () => {
        this.props.navigation.navigate("LoginScreen");
    }

    render(){
        return(
            <ScrollView horizontal = {true} pagingEnabled ={true} style = {{backgroundColor:'#fff'}}>
                <View style = {{ flex:1, justifyContent:'center', alignItems:'center', width:Dimensions.get('window').width, height:Dimensions.get('window').height}}>
                    <Text style = {{fontWeight: 'bold', fontSize:26}}>Covid Updates</Text> 
                    <Image source = {require('../assets/photos/Splash/precautions.gif')} style = {{height:350, width: 200}}/>
                    <Text style = {{fontWeight: '400', fontSize:16, marginHorizontal:25, justifyContent:'center'}}>Covid-19 is “a mild to severe respiratory illness that is caused by a coronavirus,” one that is characterized especially by fever, cough, and shortness of breath and may progress to pneumonia and respiratory failure.</Text>
                </View>
                <View style = {{ flex:1, justifyContent:'center', alignItems:'center', width:Dimensions.get('window').width, height:Dimensions.get('window').height}}>
                    <TouchableOpacity activeOpacity = {0.7} >
                        <Text onPress = {this.tologinScreen} style={{ color: 'white' }}>Admin Login</Text>
                    </TouchableOpacity>
                    <Image source = {require('../assets/photos/Splash/Informative.gif')} style = {{height:350, width: 350}}/>
                    <Button title = "Enter Application" onPress = {this.buttonPressed}></Button>
                </View>
            </ScrollView>
                
        );
    }
}