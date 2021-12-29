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
                    <Text style = {{fontWeight: 'bold', fontSize:26}}>ITS System for Learning Lava</Text> 
                    <Image source = {require('../assets/photos/Splash/java.gif')} style = {{height:350, width: 200}}/>
                    <Text style = {{fontWeight: '400', fontSize:16, marginHorizontal:25, textAlign:'center'}}>Lorem Ipsum  asdf as df as df asdf a sd f asdfa sdf gas g as df a sdf as df a sdf a sdf  asdf fasd;jflasdf asdjklfj asdlkjfklas dfas df asdf asdfjkasdfj+62596 </Text>
                </View>
                <View style = {{ flex:1, justifyContent:'center', alignItems:'center', width:Dimensions.get('window').width, height:Dimensions.get('window').height}}>
                    <Image source = {require('../assets/photos/Splash/java.gif')} style = {{height:350, width: 200}}/>
                    <Button title = "Registration and Login" onPress = {this.tologinScreen}></Button>
                    <View style = {{marginBottom:50}}></View>
                    <Button title = "Enter Application" onPress = {this.buttonPressed}></Button>
                </View>
            </ScrollView>
                
        );
    }
}