import React from 'react';
import {View, Text, FlatList, ActivityIndicator, Linking, Button, Alert} from 'react-native';     
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'

export default class insertcontacts extends React.Component{
  constructor(){
    super();
    this.state = {
      dataSource: [],
      loading:false
    }
  }

  //fetching data from server when the screen gets callled.
  componentDidMount(){
    this.fetchDatafromServer();
  }

  fetchDatafromServer = async() => {
    try{
      this.setState({loading:true});
      const response = await fetch('https://thecoronatrackerapp.herokuapp.com/retrieving-temp-healthservices', {method:'POST'});
      const json = await response.json();
      this.setState({
        dataSource: json.result,
        loading: false
      });
      
    }
    catch(e){
      console.log(e);
      this.setState({loading:'true'})
    }
  }

  //Deleting Items
  deleteContacts = ({item}) =>{
    Alert.alert("Alert", "Are you sure want to delete?", 
      [
          {
              text: "Yes", 
              onPress:() => {
                //console.log(item._id)
                this.deleteContactsItem({item});
              } 
          },
          {
              text:"No", 
          }
      ]);
}


deleteContactsItem = async({item}) =>{
    try{
        const parameter = '?_id=' + item._id;
        this.setState({loading:true});
        const response = await fetch("https://thecoronatrackerapp.herokuapp.com/delete-temp-contacts" + parameter, {method: "POST"});
        const json  = await response.json();
        if(json.status == 200){
            Alert.alert("Info", "Delete Information Successfully. Please Refresh");
        }
        this.setState({loading:false});
        //this.props.navigation.pop();
    }
    catch(e){
        console.error(e);
        this.setState({loading:true});
    }
}

insertContacts = ({item}) =>{
  Alert.alert("Alert", "Are you sure want to Insert?", 
    [
        {
            text: "Yes", 
            onPress:() => {
              //console.log(item._id)
              this.insertContactsItem({item});
            } 
        },
        {
            text:"No", 
        }
    ]);
}
//Approving Contacts
insertContactsItem = async({item}) => {
  try{  
    const parameter = "?type="+ item.type + "&contactNo="+ item.contactNo;
    this.setState({loading:true});  
    const response = await fetch("https://thecoronatrackerapp.herokuapp.com/insert-healthservices"+ parameter, {method: "POST"});
    const json  = await response.json();
    if(json.status == 200){
        Alert.alert("Congratulations", item.type + " has been added in News Database. Please Delete the Temporary Entry.",
          [
            {
                text: `Delete ${item.type} Now`, 
                onPress:() => {
                  //console.log(item._id)
                  this.deleteContactsItem({item});
                } 
            },
      ]);
        this.setState({loading:false});
    }
}
catch(e){
  console.error(e);
  this.setState({loading:true});
}
}
  //Iterating over Items
  _renderItem=({item})=>{
    return(
          <View style = {{ flex:1, flexDirection:'row',justifyContent:'space-between', marginBottom:5}}>
            <View style = {{marginRight:20}}>
              <Text> {item.type}</Text>
              <Text> {item.contactNo}</Text>
            </View>
            <View style = {{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
              <TouchableOpacity activeOpacity = {0.7} onPress = { ()=> {this.insertContacts({item})}} style = {{marginRight:20}}>
                <Icon name= "check" type='font-awesome' color = "#517fa4"/>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity = {0.7} onPress = { ()=> {this.deleteContacts({item})}}>
                <Icon name= "delete" color = "#517fa4"/>
              </TouchableOpacity>
            </View>
          </View>
    );
  }

  render(){
    return(
      <View style = {{flex:1, justifyContent:'center', alignItems:'center'}}>
        {
          this.state.loading ?
          <ActivityIndicator size = "large"/>
          :
          <View style = {{flex:1, alignSelf:'stretch', margin: 20}}>
            <Text style = {{fontWeight:"bold", fontSize: 18}}>Contacts Received for Review.</Text>
            <FlatList 
                data = {this.state.dataSource}
                renderItem = {this._renderItem}
                keyExtractor = {(item, index) => index.toString()}
                enableEmptySections={true}
                
                refreshing={this.state.loading}
                onRefresh={() => { this.fetchDatafromServer()}}
              />
          </View>
        }
      </View>
    )
  }
}