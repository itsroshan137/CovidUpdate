import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Button, ActivityIndicator, Linking} from 'react-native';
import {Image, SearchBar, Avatar} from 'react-native-elements';

export default class LoginScreen extends React.Component{
    constructor(props) {
        super();
        this.state = {
            loading: false,
            text:'',
            dataSource: [],
        };
        this.arrayHolder = [];
    }

    componentDidMount = () => {
        this.fetchDataFromServer();
    }

    fetchDataFromServer = async() => {
        try{  
            this.setState({loading:true});  
            const response = await fetch("https://thecoronatrackerapp.herokuapp.com/retrievingNewsData", {method: "POST"});
            const json  = await response.json();
            if(json.status == 200){
                this.setState({dataSource: json.result, loading: false})
            }
            this.arrayHolder = json.result;

        }
        catch(e){
            console.error(e);
            this.setState({loading:true});
        }
    }

    renderSeperator(){
        return(
            <View
                style={{
                width: '80%',
                marginRight: '8%',
                marginLeft: '7%',
                borderWidth: 0.5,  
                }}
            />
        );
    }

    filterSearch = ({text}) => {
        const newData = this.arrayHolder.filter(item=>{
            const itemData = item.title.toUpperCase() || item.newsportal.toUpperCase();
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        })
        
        this.setState({            
            text: text,
            dataSource: newData
        })
    }

    _renderItem = ({item}) => {
        return(
            <TouchableOpacity onPress = {()=>{Linking.openURL(item.urlLink)}} activeOpacity = {0.7}>
                <View style = {{ marginHorizontal: 22, marginTop: 10, flex:1, flexDirection:'row', justifyContent:'space-evenly', alignItems:'stretch'}}>
                    <View style = {{flex:1, marginLeft:5}}> 
                        <Text style = {{ fontWeight:'bold'}}>{item.title} -- {item.newsportal}</Text>
                        <Text>{item.body}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render(){
        return(  
            <View>
                <View style = {styles.avatarContainer}>
                    <Avatar 
                        source = {require('../assets/burger.png')}
                        style={styles.avatar}
                        onPress = {()=>{this.props.navigation.openDrawer("Statistics");}}
                    />
                    <View><Text>News</Text></View>
                    <Avatar
                        source = {require('../assets/info.png')}
                        style={styles.avatar}
                        onPress = {()=>{this.props.navigation.navigate("Information")}}
                    />
                </View>  
                    <View>
                            <SearchBar
                                placeholder = "Search any Relevent News"
                                onChangeText = { text=> this.filterSearch({text})}
                                value = {this.state.text}
                                containerStyle = {{backgroundColor:'#f2f2f2', borderWidth:0, borderBottomWidth: 0, borderTopWidth: 0, borderBottomColor: '#f2f2f2', marginHorizontal: 15 }}
                                inputContainerStyle = {{ backgroundColor:'#fff'}}
                                />
                            {
                                this.state.loading ? <View  style = {{ alignItems:'center'}}><ActivityIndicator /></View>
                                :
                                <FlatList 
                                    data = {this.state.dataSource}
                                    renderItem = { this._renderItem }
                                    keyExtractor = {(item, index) => index.toString()}
                                    ItemSeparatorComponent = {this.renderSeperator}

                                    refreshing={this.state.loading}
                                    onRefresh={() => { this.fetchDataFromServer(); }}
                                    />
                            }
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    avatarContainer:{
        flex:1,
        flexDirection: 'row', 
        justifyContent:"space-between", 
        marginTop:50, marginLeft:25, 
        marginRight:25, 
        marginBottom: 40
      },
      avatar:{
        width: 25, height: 25
      }
})