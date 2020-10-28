import React from 'react';
import {StyleSheet, TextInput, View, Text, Button, ActivityIndicator, Alert} from 'react-native';


export default class UpdateNews extends React.Component{
    constructor(){
        super();
        this.state = {
            loading: false,

            title : "",
            newsportal : "",
            body: "",
            urlLink: ""   
        }
    }
    
    insertNewsData = async() => {
        try{  
            const parameter = "?title="+ this.state.title + "&newsportal="+ this.state.newsportal + "&body="+ this.state.body + "&urlLink=" + this.state.urlLink;
            this.setState({loading:true});  
            const response = await fetch("https://thecoronatrackerapp.herokuapp.com/insertNewsData"+ parameter, {method: "POST"});
            const json  = await response.json();
            if(json.status == 200){
                Alert.alert("Info", "New News ADDED!!!");
                
                this.setState({loading:false, title: '', newsportal:'', body:'', urlLink:''});
            }
            this.setState({title: '', newsportal:'', body:'', urlLink:''});
        }
        catch(e){
            console.error(e);
            this.setState({loading:true});
        }
    }

    render(){
        let { loading } = this.state;
        return(
            <View style = {styles.container}>
                {
                    loading ?
                    <View style = {{flex:1, justifyContent:'center'}}>
                        <ActivityIndicator size = "large"/>
                    </View>
                    :
                    <View>
                        <Text style = {styles.text}>News Title</Text>
                        <TextInput placeholder = "News Title Goes Here.." onChangeText = {(val)=>{this.setState({title:val})}} style = {styles.input}/>
                        <Text style = {styles.text}>News Portal Name</Text>
                        <TextInput placeholder = "News Portal Name Goes Here.." onChangeText = {(val)=>{this.setState({newsportal:val})}}  style = {styles.input}/>
                        <Text style = {styles.text}>Body</Text>
                        <TextInput placeholder = "Short Description Goes Here.." onChangeText = {(val)=>{this.setState({body:val})}}  style = {styles.input}/>
                        <Text style = {styles.text}>Url Link</Text>
                        <TextInput placeholder = "Url to the Link" onChangeText = {(val)=>{this.setState({urlLink:val})}}  style = {styles.input}/>
                        <View style = {styles.btn}>
                            <Button title = "Insert News" onPress = {()=>{this.insertNewsData();}} />
                        </View>
                    </View>       
                }
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        
        marginHorizontal: 25
    },
    input:{
         borderColor: "#000", borderRadius: 4, borderWidth:1, paddingHorizontal: 10, height: 40
    },
    text:{
        marginBottom: 5
    },
    btn:{
        marginTop: 5
    }
})