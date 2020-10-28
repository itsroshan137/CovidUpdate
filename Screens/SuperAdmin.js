import React from 'react';
import {View} from 'react-native';     

import InsertNews from '../Components/insertnews';
import InsertContacts from '../Components/insertcontacts';


export default class SuperAdmin extends React.Component{

  render(){
    return(
      <View style = {{flex:1, justifyContent:'center'}}>
        <InsertNews />
        <InsertContacts />
      </View>
    );
  }
}