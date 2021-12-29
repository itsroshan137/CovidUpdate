import React from 'react';
import {StyleSheet, Text, View, Image, Button, ScrollView, ActivityIndicator} from 'react-native';
import { Avatar, Icon} from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

const height = 65 ;

const data=[
    {key:"1",title:"Chapter1: Java - Overview", desc: "Lore Ipsumm 1111111"},
    {key:"2",title:"Chapter2: Java- Environment Setup", desc: "Lorem Ipsum 2222"},
    {key:"3",title:"Chapter3: Java - Basic Syntax", desc: "Lorem Ipsum 333"},
];

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

    AboutITS = () => {
        this.props.navigation.navigate("AboutITS");
    }

    render(){
        return(
            <ScrollView>
                <View>
                    <View style = {styles.avatar}>
                        <Avatar 
                            source = {require('../assets/burger.png')}
                            style={{ width: 25, height: 25}}
                            onPress = {()=>{this.props.navigation.openDrawer();}}   
                        />
                        <Text>Study Material</Text>
                        <Avatar
                            source = {require('../assets/info.png')}
                            style={{ width: 25, height: 25 }}
                            onPress = {()=>{this.props.navigation.navigate("Information")}}
                        />
                    </View> 
                    <View style = {styles.textContainer}>
                        <TouchableOpacity activeOpacity = {0.7} onPress = {this.gotoStatistics}>
                            <Text style = {styles.text}>Topics</Text> 
                        </TouchableOpacity>
                        <Text style = {styles.text} onPress = {this.gotoStatistics}>See All</Text> 
                    </View>
                    <View> 
                        <View style={styles.boxContainer}>
                            <View style={styles.box}>
                                {
                                    this.state.loading ? 
                                        <ActivityIndicator/>
                                    :
                                    <TouchableOpacity onPress = {() => this.props.navigation.navigate("Chapter", {title:data[0].title, body: data[0].desc}) }>
                                        {/* <Text style={{ fontSize:13}}>{this.state.dataSource.Global.TotalConfirmed}</Text> */}
                                        <Text style={{ fontSize:13, fontWeight:'600'}}>Chapter1: Java - Overview</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                            <View style={styles.box}>
                                {
                                    this.state.loading ? 
                                        <ActivityIndicator/>
                                    :
                                    <TouchableOpacity onPress = {() => this.props.navigation.navigate("Chapter", {title:data[1].title, body: data[1].desc}) }>
                                        {/* <Text style={{ fontSize:13}}>{this.state.dataSource.Global.TotalDeaths}</Text> */}
                                        <Text style={{ fontSize:13, fontWeight:'600'}}>Chapter2: Java- Environment Setup</Text>
                                    </ TouchableOpacity>
                                }
                            </View>
                            <View style={styles.box}>
                                {
                                    this.state.loading ? 
                                        <ActivityIndicator/>
                                    :
                                    <TouchableOpacity onPress = {() => this.props.navigation.navigate("Chapter", {title:data[2].title, body: data[2].desc}) }>
                                        <Text style={{ fontSize:13, fontWeight:'600'}}>Chapter3: Java - Basic Syntax</Text>
                                        {/* <Text style={{ fontSize:13}}>{this.state.dataSource.Global.NewConfirmed}</Text> */}
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>             
                    </View>    
                    <View style = {{ flex:1, flexDirection:'row',justifyContent:'space-between', marginLeft:22, marginRight:22, marginTop:10}}>
                        <TouchableOpacity activeOpacity = {0.7} onPress = {this.alwaysMore}>
                            <Text style = {styles.text}>AlwaysMore</Text> 
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={{  flex:1, flexDirection:'row',justifyContent:'space-between', marginLeft:22, marginRight:22, margin: 20}}>
                            <View style = {{alignItems:'center'}}>
                                <TouchableOpacity activeOpacity={0.7} onPress = {this.gotoStatistics} style={{ width:169, height:101, alignItems:"center", justifyContent:"center"}}>
                                    <Image source={require("../assets/photos/raw/healthServices.jpg")} style={ styles.image } />
                                </TouchableOpacity>
                            </View>
                            <View style = {{alignItems:'center'}}>
                                <TouchableOpacity activeOpacity={0.7} onPress = {this.gotoNews} style={{ width:169, height:101, alignItems:"center", justifyContent:"center"}}>
                                    <Image source={require("../assets/photos/raw/precautions.png")} style={ styles.image }/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{  flex:1, flexDirection:'row',justifyContent:'space-between', marginLeft:22, marginRight:22}}>
                            <View style = {{alignItems:'center'}}>
                                <TouchableOpacity activeOpacity={0.7} onPress = {this.alwaysMore} style={{ width:169, height:101, alignItems:"center", justifyContent:"center"}}>
                                    <Image source={require("../assets/photos/raw/sympotomes.jpg")} style={ styles.image }/>
                                </TouchableOpacity>
                            </View>
                            <View style = {{alignItems:'center'}}>
                                <TouchableOpacity activeOpacity={0.7} onPress = {this.AboutITS} style={{ width:169, height:101, alignItems:"center", justifyContent:"center"}}>
                                    <Image source={require("../assets/photos/raw/about.jpg")} style={ styles.image }/>
                                </TouchableOpacity>
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
        width: "100%", height: height, 
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
        flex:1, flexDirection:'column',justifyContent:'space-between', marginLeft:22, marginRight:22
    },
    textContainer:{ 
        flex:1, flexDirection:'row',justifyContent:'space-between', marginTop:30, marginLeft:22, marginRight:22
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