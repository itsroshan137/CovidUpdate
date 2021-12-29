import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, FlatList, Text } from 'react-native';

import AppButton from '../Components/AppButton';
import { Entypo } from '@expo/vector-icons'; 
import PickerItem from './PickerItem';

function AppPicker({value, items, onSelectItem, selectedItem, type  }) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
        <View style = {styles.container}>
            <Text style = {styles.type}>{type}</Text>
            <TouchableOpacity style = {styles.inputContainer} onPress = {() => setModalVisible(true)}>
                <Text style = {styles.text}>{selectedItem ? selectedItem.label : value}</Text>
                <Entypo name = "chevron-thin-down" size = {24} color = "grey"/>
            </TouchableOpacity>
        </View>
        <Modal visible = {modalVisible} animationType = "slide" >
            <AppButton
                title = "Close" 
                onPress = {() => setModalVisible(false)} 
                buttonStyle = {styles.buttonStyle}
                titleStyle = {styles.titleStyle} />
            <FlatList 
                data = {items}
                keyExtractor = {item => item.value.toString()}
                renderItem = {({item}) =>
                    <PickerItem 
                        label = {item.label}
                        onPress = {() => {
                            setModalVisible(false);
                            onSelectItem(item.label)
                        }}
                    /> }
            />
        </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    buttonStyle:{
        width:120,
        height:35,
        alignSelf:'center'
    },
    container:{
        marginBottom:15
    },
    type:{
        textTransform:'uppercase'
    },
    inputContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:10,
        borderBottomWidth:0.7,
        margin:10,
        borderBottomColor:'grey',
        paddingVertical:10,
        paddingLeft:15,
        paddingRight:20
    },
    text:{
        fontSize:16,
        flex:1,
        textTransform:'uppercase'
    },
    titleStyle:{
        fontSize:16
    },
})

export default AppPicker;