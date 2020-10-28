import React from 'react';
import {StyleSheet, Text, View, FlatList, ActivityIndicator,TouchableOpacity, Alert, Clipboard} from 'react-native';
import {Avatar, Image} from 'react-native-elements';
import {ThemeProvider, Input } from 'react-native-elements';

export default class App extends React.Component{
  constructor(props){
    super();
    this.state = {
      isLoading: true,
      text:''
    };
    ()=>{
      this.arrayHolder = [];
    }
    
  }

  componentDidMount(){
    this.fetchDataFromServer();  
  }

  fetchDataFromServer = () => {
    fetch('https://api.covid19api.com/summary')
    .then(response => response.json())
    .then(responseJson => {
      this.setState({
        isLoading: false,
        dataSource: responseJson.Countries,
      },
      ()=>{
        this.arrayHolder = responseJson.Countries
      });
    }).catch(error =>{
      console.log(error);
    })
  }

  _renderItem = ({item}) => {
    return(
      <TouchableOpacity onPress = {() => 
        Alert.alert(
          item.Country,
          `
            New Confirmed Cases: ${item.NewConfirmed}
            New Deaths: ${item.NewDeaths}
            New Recovered: ${item.NewRecovered}
            Total Recovered: ${item.TotalRecovered}
            Total Deaths: ${item.TotalDeaths} 
            Total Confirmed: ${item.TotalConfirmed}
          `,
          [
            {
              text:'Copy Data',
              onPress: () => { 
                Clipboard.setString(`
                  Country: ${item.Country}
                  New Confirmed Cases: ${item.NewConfirmed}
                  New Deaths: ${item.NewDeaths}
                  New Recovered: ${item.NewRecovered}
                  Total Recovered: ${item.TotalRecovered}
                  Total Deaths: ${item.TotalDeaths} 
                `)
                alert(
                  "Copied to Clipboard"
                )
          }  
            },
            {
              text: 'Okay',
            }
          ],
          {
            cancelable: false
          }

      )}>
        <View style = {styles.country}>
          <View style = {{flex:1, flexDirection:'row'}}>
            <Image source={{ uri: "https://www.countryflags.io/"+(item.CountryCode)+"/flat/64.png" }} style={{ height:25, width:30 }} PlaceholderContent={<ActivityIndicator />} />
            <Text>{"  " + item.Country} </Text>
          </View>
          <Text>{"(" + item.TotalConfirmed +")"} </Text>
        </View>
      </TouchableOpacity>
    )
  }

  searchFilter = text => {
 
    const searchCountry = this.arrayHolder.filter(item => {
      const fetchedCountries = `${item.Country.toUpperCase()}`;
      const searchedCountry = text.toUpperCase();

      return fetchedCountries.indexOf(searchedCountry) > -1; 
    })

    this.setState({dataSource: searchCountry, text: text});
    
  }

  render(){
      if(this.state.isLoading){
        return(
          <View style ={styles.container}>
            <ActivityIndicator size = "large" animating ></ActivityIndicator>
          </View>
        )
      }
      return(
        <View>
            <View style = {styles.avatarContainer}>
                <Avatar 
                    source = {require('../assets/burger.png')}
                    style={styles.avatar}
                    onPress = {()=>{this.props.navigation.openDrawer("Statistics");}}
                />
                <View><Text>Statistics</Text></View>
                <Avatar
                    source = {require('../assets/info.png')}
                    style={styles.avatar}
                    onPress = {()=>{this.props.navigation.navigate("Information")}}
                />
            </View>  
            <View>
              
              <Input
                  placeholder='Search Country'
                  leftIcon={{ type: 'font-awesome', name: 'search', size: 20 }}
                  onChangeText = { text => this.searchFilter(text) }
                  containerStyle = {{paddingHorizontal: 22}}
                  leftIconContainerStyle = {{ paddingRight: 15}}
                  value = {this.state.text}
              />
              <FlatList 
                data = {this.state.dataSource}
                renderItem = {this._renderItem}
                keyExtractor = {(item, index) => index.toString()}
                enableEmptySections={true}
                
                refreshing={this.state.isLoading}
                onRefresh={() => { this.fetchDataFromServer(); }}
              />
           </View>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding: 10,
    paddingTop:50,
    marginTop: 50
  },
  country:{
    padding:5,
    borderBottomWidth:1,
    borderBottomColor: '#fff',
    padding: 10,
    paddingHorizontal: 22,
    marginTop: 5,
    flex:1,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  avatarContainer:{
    flex:1,
    flexDirection:'row', 
    justifyContent:"space-between", 
    marginTop:50, marginLeft:25, 
    marginRight:25, 
    marginBottom: 40
  },
  avatar:{
    width: 25, height: 25
  }
});