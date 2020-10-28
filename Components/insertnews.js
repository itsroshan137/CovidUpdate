import React from 'react';
import {View, Text, FlatList, ActivityIndicator, Linking, Button, Alert} from 'react-native';     
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'

export default class insertnews extends React.Component{
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
      const response = await fetch('https://thecoronatrackerapp.herokuapp.com/retrieving-temp-newsdata', {method:'POST'});
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

  //Deleted News
  deleteNews = ({item}) =>{
    Alert.alert("Alert", "Are you sure want to delete?", 
      [
          {
              text: "Yes", 
              onPress:() => {
                //console.log(item._id)
                this.deleteNewsItem({item});
              } 
          },
          {
              text:"No", 
          }
      ]);
}


deleteNewsItem = async({item}) =>{
    try{
        const parameter = '?_id=' + item._id;
        this.setState({loading:true});
        const response = await fetch("https://thecoronatrackerapp.herokuapp.com/delete-temp-news" + parameter, {method: "POST"});
        const json  = await response.json();
        if(json.status == 200){
            Alert.alert("Info", "Delete Information Successfully.");
        }
        this.setState({loading:false});
        //this.props.navigation.pop();
    }
    catch(e){
        console.error(e);
        this.setState({loading:true});
    }
}

//approved news
insertNews = async({item}) => {
  try{  
      const parameter = "?title="+ item.title + "&newsportal="+ item.newsportal + "&body="+ item.body + "&urlLink="+ item.urlLink;
      this.setState({loading:true});  
      const response = await fetch("https://thecoronatrackerapp.herokuapp.com/insertNewsData"+ parameter, {method: "POST"});
      const json  = await response.json();
      if(json.status == 200){
          Alert.alert("Congratulations", item.title + "has been added in News Database");
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
      <View style = {{ flex:1, flexDirection:'column',justifyContent:'space-between', marginBottom:5}}>
        <View style = {{marginRight:20}}>
          <TouchableOpacity onPress = {()=>{Linking.openURL(item.urlLink)}} activeOpacity ={0.7}>
            <Text style = {{fontWeight:'bold'}}>{item.title}</Text>
          </TouchableOpacity>
          <Text>- {item.newsportal}</Text>
        </View>
        <View style = {{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
            <TouchableOpacity activeOpacity = {0.7} onPress = { ()=> {this.insertNews({item})}} style = {{marginRight:10}}>
              <Icon name= "check" type='font-awesome' color = "#517fa4"/>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity = {0.7} onPress = { ()=> {this.deleteNews({item})}}>
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
            <Text style = {{fontWeight:"bold", fontSize: 18}}>Received News for Review</Text>
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
