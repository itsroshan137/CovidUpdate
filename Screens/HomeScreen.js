import React from 'react';
import {StyleSheet, Text, View, Image, Button, ScrollView, ActivityIndicator} from 'react-native';
import { Avatar, Icon} from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

const width = 100;
const height = 65 ;

export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            loading: true,
            dataSource:[]
        }
    }
    componentDidMount(){
        this.fetchDatafromServer();
    }

    fetchDatafromServer = async() => {
        try{
            this.setState({loading:true});

            const response = await fetch('https://api.covid19api.com/summary');
            const responseJson = await response.json();
            this.setState({
            loading : false,
            dataSource: responseJson
            })
        }
        catch(e){
            console.log(e);
            this.setState({loading:'true'})
        }
    }

    // go to statistics
    gotoStatistics = () => {
        this.props.navigation.navigate("Statistics");
    }  
    //go to news
    gotoNews = () =>{
        this.props.navigation.navigate("News");
    }
    //alwaysMore
    alwaysMore = () => {
        this.props.navigation.navigate("AlwaysMore");
    }

    render(){
        return(
            <ScrollView>
                <View>
                    <Image source={require('../assets/photos/raw/fight.gif')} style={{ height: 250, width:380, position: "absolute", alignItems:'stretch'}}></Image>
                    <View style = {styles.avatar}>
                        <Avatar 
                            source = {require('../assets/burger.png')}
                            style={{ width: 25, height: 25}}
                            onPress = {()=>{this.props.navigation.openDrawer();}}
                            
                        />
                        <Avatar
                            source = {require('../assets/info.png')}
                            style={{ width: 25, height: 25 }}
                            onPress = {()=>{this.props.navigation.navigate("Information")}}
                        />
                    </View> 
                    <View style = {styles.textContainer}>
                        <TouchableOpacity activeOpacity = {0.7} onPress = {this.gotoStatistics}>
                            <Text style = {styles.text}>Cases World Wide</Text> 
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity = {0.7} onPress = {this.gotoStatistics}>
                            <Text style = {styles.textRight}>See All</Text>
                        </TouchableOpacity>
                       
                    </View>
                    <View> 
                        <View style={styles.boxContainer}>
                            <View style={styles.box}>
                                <Text>Total Cases</Text>
                                {
                                    this.state.loading ? 
                                        <ActivityIndicator/>
                                    :
                                    <Text style={{ fontSize:13}}>{this.state.dataSource.Global.TotalConfirmed}</Text>
                                }
                            </View>
                            <View style={styles.box}>
                                <Text>Total Deaths</Text>
                                {
                                    this.state.loading ? 
                                        <ActivityIndicator/>
                                    :
                                    <Text style={{ fontSize:13}}>{this.state.dataSource.Global.TotalDeaths}</Text>
                                }
                            </View>
                            <View style={styles.box}>
                                <Text>New Cases</Text>
                                {
                                    this.state.loading ? 
                                        <ActivityIndicator/>
                                    :
                                    <Text style={{ fontSize:13}}>{this.state.dataSource.Global.NewConfirmed}</Text>
                                }
                            </View>
                        </View>
                        <View style={styles.boxContainer}>
                        <View style={styles.box}>
                                <Text>New Deaths</Text>
                                {
                                    this.state.loading ? 
                                        <ActivityIndicator/>
                                    :
                                    <Text style={{ fontSize:13}}>{this.state.dataSource.Global.NewDeaths}</Text>
                                }
                            </View>
                            <View style={styles.box}>
                                <Text>New Recovered</Text>
                                {
                                    this.state.loading ? 
                                        <ActivityIndicator/>
                                    :
                                    <Text style={{ fontSize:13}}>{this.state.dataSource.Global.NewRecovered}</Text>
                                }
                            </View>
                            <View style={styles.box}>
                                <Text>New Cases</Text>
                                {
                                    this.state.loading ? 
                                        <ActivityIndicator/>
                                    :
                                    <Text style={{ fontSize:13}}>{this.state.dataSource.Global.TotalRecovered}</Text>
                                }
                            </View>
                        </View>
                    </View>    
                    <View style={{flex:1, flexDirection: 'row', alignItems: 'center', marginTop:8, marginLeft:25, justifyContent:'space-evenly' }}>
                        <Text style={{ color: 'red' }}> Last Updated: {this.state.dataSource.Date} </Text>
                        <TouchableHighlight style = {{  height: 22, width: 22,}} onPress = {this.fetchDatafromServer}>
                            <Image name='refresh' source={require('../assets/refresh.png')} style={{ resizeMode: 'contain', height: 20, width: 20}} />
                        </TouchableHighlight>
                    </View>
                    <View style = {{ flex:1, flexDirection:'row',justifyContent:'space-between', marginLeft:22, marginRight:22, marginTop:10}}>
                        <TouchableOpacity activeOpacity = {0.7} onPress = {this.alwaysMore}>
                            <Text style = {styles.text}>Always More</Text> 
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity = {0.7} onPress = {this.alwaysMore}>
                            <Text style = {styles.textRight}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={{  flex:1, flexDirection:'row',justifyContent:'space-between', marginLeft:22, marginRight:22, margin: 20}}>
                            <View style = {{alignItems:'center'}}>
                                <TouchableOpacity activeOpacity={0.7} onPress = {this.alwaysMore} style={{ width:169, height:101, alignItems:"center", justifyContent:"center"}}>
                                    <Image source={require("../assets/photos/raw/healthServices.jpg")} style={ styles.image } />
                                </TouchableOpacity>
                                <Text>Health Services</Text>
                            </View>
                            <View style = {{alignItems:'center'}}>
                                <TouchableOpacity activeOpacity={0.7} onPress = {this.alwaysMore} style={{ width:169, height:101, alignItems:"center", justifyContent:"center"}}>
                                    <Image source={require("../assets/photos/raw/precautions.png")} style={ styles.image }/>
                                </TouchableOpacity>
                                <Text>Precautions</Text>
                            </View>
                        </View>
                        <View style={{  flex:1, flexDirection:'row',justifyContent:'space-between', marginLeft:22, marginRight:22}}>
                            <View style = {{alignItems:'center'}}>
                                <TouchableOpacity activeOpacity={0.7} onPress = {this.alwaysMore} style={{ width:169, height:101, alignItems:"center", justifyContent:"center"}}>
                                    <Image source={require("../assets/photos/raw/sympotomes.jpg")} style={ styles.image }/>
                                </TouchableOpacity>
                                <Text>Symptomes</Text>
                            </View>
                            <View style = {{alignItems:'center'}}>
                                <TouchableOpacity activeOpacity={0.7} onPress = {this.gotoNews} style={{ width:169, height:101, alignItems:"center", justifyContent:"center"}}>
                                    <Image source={require("../assets/photos/raw/newsupdate.jpg")} style={ styles.image }/>
                                </TouchableOpacity>
                                <Text>News/Update</Text>
                            </View>
                        </View>
                    </View>
                    <View style = {{height:10}}></View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    box:{
        width: width, height: height, 
        backgroundColor: "#fff", borderRadius: 12, alignItems:'center', justifyContent:'center', 
        marginRight: 5, marginTop:10, 
        shadowColor: "#000", 
        shadowOffset: {
        width: 0,
        height: 2, }, shadowOpacity: 1, shadowRadius: 1, elevation: 2,
        },
    avatar:{ 
        flex:1, flexDirection:"row", justifyContent:"space-between", marginTop:50, marginLeft:25, marginRight:25 
    },
    boxContainer:{  
        flex:1, flexDirection:'row',justifyContent:'space-between', marginLeft:22, marginRight:22
    },
    textContainer:{ 
        flex:1, flexDirection:'row',justifyContent:'space-between', marginTop:180, marginLeft:22, marginRight:22
    },
    text:{
        fontWeight:'bold', color:'#000', fontSize:16
    },
    textRight:{
        fontWeight:'bold', color:'#000', fontSize:12.5, textDecorationLine: 'underline'
    },
    image:{
        resizeMode:"cover", width:169, height:101, borderRadius: 12,shadowColor: "#000", 
        shadowOffset: {
        width: 0,
        height: 2, }, shadowOpacity: 1, shadowRadius: 1, elevation: 2,
    }
})