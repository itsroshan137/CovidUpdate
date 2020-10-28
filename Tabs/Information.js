import React from 'react';
import {View, Text, Image, TouchableOpacity, Linking, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

class AlwaysMore extends React.Component{
    constructor(){
        super();
        this.state= {
            dataSource: [],
            loading : false
        }
    }

    componentDidMount = () => {
        this.fetchDataFromServer();
    }

    fetchDataFromServer = async() => {
       try{
           this.setState({loading:true});
           const response = await fetch('https://thecoronatrackerapp.herokuapp.com/retrieving-healthservices', {method:'POST'});
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

    _renderItems = ({item}) => {
        return(
           <View style = {{flex:1, flexDirection:'row',justifyContent:'space-between', alignItems:'center', marginBottom:5}}>
               <Text style = {{fontWeight:"500", fontSize: 16}}>{item.type}</Text>
               <TouchableOpacity
                   style={{backgroundColor: '#FF4D58', width: 100, borderRadius: 40, padding: 5,}}
                   onPress={() => Linking.openURL(`tel:${item.contactNo}`)}>
                   <Text style={{fontSize: 14, color: '#FFF', textAlign: 'center'}}>
                       <Icon name="phone" size={14} style={{marginEnd: 10}} />
                       &nbsp; Call now
                   </Text>
               </TouchableOpacity>
           </View>
        );
    }

    render(){
        return(
            <ScrollView>
            <View style = {{flex:1, marginHorizontal: 25, marginTop: 10}}>
                <View style = {styles.avatarContainer}>
                    <Avatar 
                        source = {require('../assets/burger.png')}
                        style={styles.avatar}
                        onPress = {()=>{this.props.navigation.openDrawer("Statistics");}}
                    />
                    <View><Text>Covid Updates</Text></View>
                    <Avatar
                        source = {require('../assets/info.png')}
                        style={styles.avatar}
                        onPress = {()=>{this.props.navigation.navigate("Information")}}
                    />
                </View> 
                <View>
                    <Text style = {{fontWeight:"bold", fontSize: 26}}>Health Services</Text>
                    {
                        this.state.loading ?
                        <ActivityIndicator size = "small"/>
                        :
                        <FlatList 
                            data = {this.state.dataSource}
                            renderItem = {this._renderItems}
                            keyExtractor = {(item, index) => index.toString()}

                            refreshing={this.state.loading}
                            onRefresh={() => { this.fetchDatafromServer()}}
                        />
                    }
                </View>
                <View style = {{flex:1, marginVertical:5}}>
                    <Text style = {{fontWeight:"bold", fontSize: 26}}>Preventions</Text>
                    <Text style = {{paddingTop:5}}>To prevent the spread of COVID-19: Clean your hands often. Use soap and water, or an alcohol-based hand rub.</Text>
                    <Text style = {{paddingTop:5}}>Maintain a safe distance from anyone who is coughing or sneezing.</Text>
                    <Text style = {{paddingTop:5}}>Maintain a safe distance from anyone who is coughing or sneezing.</Text>
                    <Text style = {{paddingTop:5}}>Don’t touch your eyes, nose or mouth.</Text>
                    <Text style = {{paddingTop:5}}>Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze.</Text>
                    <Text style = {{paddingTop:5}}>Stay home if you feel unwell..</Text>
                    <Text style = {{paddingTop:5}}>If you have a fever, cough and difficulty breathing, seek medical attention.</Text>
                </View>
                <View style = {{flex:1, marginVertical:5}}>
                    <Text style = {{fontWeight:"bold", fontSize: 26}}>Symptomes</Text>
                    <Text style = {{fontWeight:"bold", fontSize: 16}}>Most common symptoms:</Text>
                    <Text style = {{paddingTop:5}}>Fever</Text>
                    <Text style = {{paddingTop:5}}>Dry Cough</Text>
                    <Text style = {{paddingTop:5}}>Tiredness</Text>
                    <Text style = {{fontWeight:"bold", fontSize: 16}}>Less common symptoms:</Text>
                    <Text style = {{paddingTop:5}}>Aches and pains</Text>
                    <Text style = {{paddingTop:5}}>Sore throat</Text>
                    <Text style = {{paddingTop:5}}>Diarrhoea</Text>
                    <Text style = {{paddingTop:5}}>Conjunctivitis</Text>
                    <Text style = {{paddingTop:5}}>Headache</Text>
                    <Text style = {{paddingTop:5}}>Loss of taste or smell</Text>
                    <Text style = {{paddingTop:5}}>A rash on skin, or discolouration of fingers or toes</Text>
                    <Text style = {{fontWeight:"bold", fontSize: 16}}>Serious symptoms:</Text>
                    <Text style = {{paddingTop:5}}>Difficulty breathing or shortness of breath</Text>
                    <Text style = {{paddingTop:5}}>Chest pain or pressure</Text>
                    <Text style = {{paddingTop:5}}>Loss of speech or movement</Text>
                </View>
                <View style = {{height:50}}></View>
                <Text style = {{paddingTop:5}}>Contact Developer  {"\n"}</Text>
                    <View style = {{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/itsroshan137/")} activeOpacity = {0.7}>
                            <Image source={require('../assets/facebook.png')} style={{ height: 20, width:20}}></Image>
                        </TouchableOpacity> 
                        <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/itsroshan137/")} activeOpacity = {0.7}>
                            <Image source={require('../assets/instagram.png')} style={{ height: 20, width:20}}></Image>
                        </TouchableOpacity> 
                        <TouchableOpacity onPress={() => Linking.openURL("https://twitter.com/itsroshan137")} activeOpacity = {0.7}>
                            <Image source={require('../assets/twitter.png')} style={{ height: 20, width:20}}></Image>
                        </TouchableOpacity>
                        <Text>@itsroshan137 {"\n"}</Text>
                        <TouchableOpacity onPress={() => Linking.openURL("https://www.linkedin.com/in/itsroshan137/")} activeOpacity = {0.7}>
                            <Image source={require('../assets/linkedin.png')} style={{ height: 20, width:20}}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL("https://www.youtube.com/channel/UCBtMKGrzUL6TTcUUzxM8DKw")} activeOpacity = {0.7}>
                            <Image source={require('../assets/youtube.png')} style={{ height: 20, width:20}}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL("https://github.com/itsroshan137")} activeOpacity = {0.7}>
                            <Image source={require('../assets/github.png')} style={{ height: 20, width:20}}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
export default AlwaysMore;

const styles = StyleSheet.create({
    avatarContainer:{
        flex:1,
        flexDirection: 'row', 
        justifyContent:"space-between", 
        marginTop:50,
        marginBottom: 40
      },
      avatar:{
        width: 25, height: 25
      }
})