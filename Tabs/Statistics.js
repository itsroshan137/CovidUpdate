import React, {Component} from 'react';
  import { SafeAreaView, View,StyleSheet, TouchableOpacity, Text, FlatList, Alert} from 'react-native';
  import Constants from 'expo-constants';
  import {SearchBar} from 'react-native-elements';
  const data=[
    {key:"1",title:"Chapter1: Java - Overview", desc: "Lore Ipsumm 1111111"},
    {key:"2",title:"Chapter2: Java- Environment Setup", desc: "Lorem Ipsum 2222"},
    {key:"3",title:"Chapter3: Java - Basic Syntax", desc: "Lorem Ipsum 333"},
    {key:"4",title:"Chapter4: Java - Object and Classes", desc: "Lorem Ipsum 44"},
    {key:"5",title:"Chapter5: Java- Basic Datatypes", desc: "Lorem Ipsum 555"},
    {key:"6",title:"Chapter6: Java - Variable Types", desc: "Lorem Ipsum 666"},
    {key:"7",title:"Chapter7: Java - Modifier Types", desc: "Lorem Ipsum 7777"},
    {key:"7",title:"Chapter8: Java-Basic Operators", desc: "Lorem Ipsum 8888"},
  ];
  class Statistics extends Component {
      constructor(){
          super()
          this.state={
              data:data,
              search:""
          }
      }
    showItem=(data)=>{
      Alert.alert(data);
    }
    
    

      renderHeader=()=>{
        const { search } = this.state;
          return(
              <SearchBar
                placeholder="Search Here"
                lightTheme   
                onChangeText={text=>this.searchAction(text)}
                autoCorrect={false}
                value={search}
              />
          )
      }
      searchAction=(text)=>{
          const newData=data.filter(item=>{
              const itemData=`${item.title.toUpperCase()}`;
              const textData=text.toUpperCase();
              return itemData.indexOf(textData) > -1;

          });
          this.setState({
              data:newData,
              search:text
          });
      }
    

      renderItem=(item)=>{
        return(
          <TouchableOpacity onPress={() => this.chapterFunction(item)} key={item.key} style={styles.item}>
            <Text>{item.title}</Text>
        </TouchableOpacity>
        )
      }

      chapterFunction = (item) =>{
        this.props.navigation.navigate("Chapter", {title:item.title, body: item.desc});
        // this.props.navigation.navigate("Chapter", {title:"Hey Man!", body: "What's ap"});
      }

      render(){
          return(
              <SafeAreaView style={styles.container}>
                  <FlatList
                    data={this.state.data}
                    renderItem={({item})=>this.renderItem(item)}
                    keyExtractor={item=>item.key.toString()}
                    ListHeaderComponent={this.renderHeader}
                  >
                  </FlatList>
              </SafeAreaView>         
              
          )
      }
  }
  export default Statistics;

  const styles =StyleSheet.create({
      container: {
          flex: 1,
          marginTop: Constants.statusBarHeight,
          padding:10
        },
        item:{
          padding:10,
          borderWidth:1,
          borderRadius:5,
          borderColor:"#c1dec5", 
          marginBottom:10},
  })