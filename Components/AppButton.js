import React from 'react';
import {StyleSheet } from 'react-native';
import {Button} from 'react-native-elements';

function AppButton({title, onPress, titleStyle, buttonStyle }) {
    return (
        <Button 
            title={title}
            buttonStyle={[styles.buttonStyle, buttonStyle]} 
            onPress={onPress}
            titleStyle = {[styles.titleStyle, titleStyle]}
        />
    );
}

const styles = StyleSheet.create({
    buttonStyle:{ 
        width:180, 
        height:55, 
        backgroundColor:'blue', 
        borderRadius:50, 
    },
    titleStyle:{
        fontSize:24, 
        textTransform: 'uppercase'
    }
})

export default AppButton;