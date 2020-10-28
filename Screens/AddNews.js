import React from 'react';
import {View, Button, Text, ActivityIndicator, Alert} from 'react-native';    
import {Input} from 'react-native-elements';

export default class Update extends React.Component{
    constructor(){
        super();
        this.state = {
            title:'',
            newsportal:'',
            body:'',
            urlLink: '',
            loading:false
        }
    }

    insertNews = async() => {
      try{  
          const parameter = "?title="+ this.state.title + "&newsportal="+ this.state.newsportal + "&body="+ this.state.body + "&urlLink="+ this.state.urlLink;
          this.setState({loading:true});  
          const response = await fetch("https://thecoronatrackerapp.herokuapp.com/insertNewstemp"+ parameter, {method: "POST"});
          const json  = await response.json();
          if(json.status == 200){
              Alert.alert("Congratulations", this.state.title + "has sent for review");
              this.setState({fullName: '', newsportal:'', body:'', urlLink:'', loading: false});
          }
          this.setState({fullName: '', newsportal:'', body:'', urlLink:'', loading: false});
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
            <Text>News Title</Text>
            <Input placeholder = "Add News Title" onChangeText = {(val) => this.setState({title:val})}/>
            <Text>News Portal</Text>
            <Input placeholder = "Enter News Portal" onChangeText = {(val) => this.setState({newsportal:val})}/>
            <Text>Enter Body</Text>
            <Input placeholder = "Enter Little Brief" onChangeText = {(val) => this.setState({body:val})}/>
            <Text>Enter Url</Text>
            <Input placeholder = "Enter Url to Follow" onChangeText = {(val) => this.setState({urlLink:val})}/>
            <Button title = "Insert News" onPress = {this.insertNews}/>
          </View>
        }
      </View>
    )
  }
}
