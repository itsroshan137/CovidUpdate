import React from 'react';
import {View, Button, Text, ActivityIndicator, Alert} from 'react-native';   
import {Input} from 'react-native-elements';     

export default class Update extends React.Component{
    constructor(){
        super();
        this.state = {
            type:'',
            contactNo:'',
            loading: false
        }
    }

    insertHealthServices = async() => {
        try{  
            const parameter = "?type="+ this.state.type + "&contactNo="+ this.state.contactNo ;
            this.setState({loading:true});  
            const response = await fetch("https://thecoronatrackerapp.herokuapp.com/insert-healthservicestemp"+ parameter, {method: "POST"});
            const json  = await response.json();
            if(json.status == 200){
                Alert.alert("Congratulations", this.state.type + "has sent for review");
                this.setState({type: '', contactNo:'', loading: false});
            }
            this.setState({type: '', contactNo:'', loading: false});
      }
      catch(e){
          console.error(e);
          this.setState({loading:true});
      }
   }

render () {
    return (
    <View style = {{flex:1, marginHorizontal:22, marginTop:10}}>
        {
            this.state.loading ?
            <ActivityIndicator size = "large" style ={{flex:1, justifyContent:'center'}}/>
            :
            <View>
                <Text>Enter Health Service Type</Text>
                <Input placeholder = "Health Service Goes Here.." style = {{borderColor:'black', borderRadius:'1'}} onChangeText = {(val) => {this.setState({type:val})}}/>
                <Text>Enter Contact Number</Text>
                <Input keyboardType="phone-pad" placeholder = "Number Goes Here.." style = {{borderColor:'black', borderRadius:'1'}} onChangeText = {(val) => {this.setState({contactNo:val})}}/>
                <Button title = "Insert Health Service" onPress = {this.insertHealthServices}/>
            </View>
        }
    </View>
    )
  }
}
