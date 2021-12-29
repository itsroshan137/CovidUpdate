import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SplashScreen from '../Screens/SplashScreen';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import HomeScreen from '../Screens/HomeScreen';
import Statistics from '../Tabs/Statistics';
import News from '../Tabs/News';
import UpdateNews from '../Tabs/UpdateNews';
import Update from '../Screens/Update';
import AddNews from '../Screens/AddNews';
import AddHealthServices from '../Screens/AddHealthServices';
import ManageStudentQuery from '../Screens/ManageStudentQuery';
import SuperAdmin from '../Screens/SuperAdmin';
import Information from '../Tabs/Information';
import AlwasysMore from '../Screens/AlwaysMore';
import AboutITS from '../Screens/AboutITS';
import Chapter from '../Screens/Chapter';
import { Icon } from 'react-native-elements';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();

function screenOptions({route}){
    return{
        tabBarIcon:({focused, color, size, style})=>{
            let iconName;
            let type = "font-awesome";
            if (route.name === "HomeScreen"){
                iconName= "book";
            }
            else if (route.name ==="Statistics"){
                iconName= "search";
            }
            else if (route.name ==="News"){
                iconName = "newspaper-o";
            }
            else if (route.name === 'Information') {
                iconName = 'question';
            }
            return <Icon name = {iconName} type = {type} size = {20} color={color} style = {{ alignItems:'center', justifyContent:'center'}}/>
        }
    };
}

function somethingTabs(){
    return(
        <Tabs.Navigator screenOptions = {screenOptions} initialRouteName = "HomeScreen" tabBarOptions={{activeBackgroundColor:"#4d79ff", activeTintColor:"#ffffff", inactiveBackgroundColor:"#ffffff", showLabel:false}} >
            <Tabs.Screen name = "HomeScreen" component = {HomeScreen} options = {{ title: ''}}></Tabs.Screen>
            <Tabs.Screen name = "Statistics" component = {Statistics} options = {{ title: ''}}></Tabs.Screen>
            <Tabs.Screen name = "News" component = {News} options = {{ title: ""}}></Tabs.Screen>
            <Tabs.Screen name = "Information" component = {Information} options = {{ title: ''}}></Tabs.Screen>
        </Tabs.Navigator>
    );
}

function somethingDrawer(){
        return(
                <Drawer.Navigator initialRouteName = "HomeScreen" drawerStyle= {{activeTintColor:'#fff'}}>
                    <Drawer.Screen name = "HomeScreen" component = {somethingTabs} drawerStyle = {{backgroundColor:"#FE80000"}} />
                    <Drawer.Screen name = "Statistics" component = {Statistics} />
                    <Drawer.Screen name = "News" component = {News} />
                    <Drawer.Screen name = "Information" component = {Information} />
                </Drawer.Navigator>
        );
}

export default function screen(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName= "SplashScreen">
                <Stack.Screen name = "SplashScreen" component = {SplashScreen} options = {{headerShown:false }} />
                <Stack.Screen name = "LoginScreen" component = {LoginScreen} options = {{ title: 'Login', headerShown:false }} />
                <Stack.Screen name = "RegisterScreen" component = {RegisterScreen} options = {{ title: 'Register'}} />
                <Stack.Screen name = "HomeScreen" component = {somethingDrawer} options = {{ headerShown:false}} />
                <Stack.Screen name = "UpdateNews" component = {UpdateNews} />
                <Stack.Screen name = "News" component = {News}  options = {{ headerShown:false}}/>
                <Stack.Screen name = "Statistics" component = {Statistics}/>
                <Stack.Screen name = "AlwaysMore" component = {AlwasysMore} options = {{title:'Ask your Doubt !'}} />
                <Stack.Screen name = "AboutITS" component = {AboutITS} options = {{title:'ITS for Learning Java'}} />
                <Stack.Screen name = "Chapter" component = {Chapter} options = {{title:'Chapters'}} />
                <Stack.Screen name = "Update" component = {Update} options = {{title:'Update'}} />
                <Stack.Screen name = "AddNews" component = {AddNews} options = {{title:'Quiz Creation'}} />
                <Stack.Screen name = "AddHealthServices" component = {AddHealthServices} options = {{title:'Study Material Creation'}} /> 
                <Stack.Screen name = "ManageStudentQuery" component = {ManageStudentQuery} options = {{title:'Manage Student Query'}} /> 
                <Stack.Screen name = "SuperAdmin" component = {SuperAdmin} options = {{title:'Confirm Or Delete'}} />          
            </Stack.Navigator>
        </NavigationContainer>
    );
}