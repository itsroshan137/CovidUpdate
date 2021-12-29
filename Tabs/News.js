import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Image, ScrollView, Text, Alert } from 'react-native';
import { Input } from 'react-native-elements';

import { Entypo } from '@expo/vector-icons';
import AppPicker from '../Components/AppPicker';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };

    this.genderCategories = [
      { label: 'Bytecode is executed by JVM', value: 1 },
      { label: 'The applet makes the Java code secure and portable', value: 2 },
      { label: 'Use of exception handling', value: 3 },
      { label: 'Dynamic binding between objects', value: 4 }
    ]

    this.playerLevel = [
      { label: 'Dynamic', value: 1 },
      { label: 'Architecture Neutral', value: 2 },
      { label: 'Use of pointers', value: 3 },
      { label: 'Object-oriented', value: 4 }
    ]

    this.handSwing = [
      { label: 'Unicode escape sequence', value: 1 },
      { label: 'Octal escape', value: 2 },
      { label: 'Hexadecimal', value: 3 },
      { label: 'Line feed', value: 4 }
    ]

    this.preferredCourt = [
      { label: 'JVM', value: 1 },
      { label: 'JRE', value: 2 },
      { label: 'JDK', value: 3 },
      { label: 'JDB', value: 4 },
    ]

    this.fifthOne = [
        { label: "char ch = 'utea'", value: 1 },
        { label: "char ca = 'tea';", value: 2 },
        { label: "char cr = \u0223;", value: 3 },
        { label: "char cc = '\itea';", value: 4 },
    ]

    this.sixthOne = [
      { label: 'Object', value: 1 },
      { label: 'Int', value: 2 },
      { label: 'Long', value: 3 },
      { label: 'Void', value: 4 },
    ]

    this.seventhOne = [
      { label: 'ABH8097', value: 1 },
      { label: 'L990023', value: 2 },
      { label: '904423', value: 3 },
      { label: '0xnf029L', value: 4 },
    ]

    this.eighthOne = [
      { label: '0', value: 1 },
      { label: 'NAN', value: 2 },
      { label: 'Infinity', value: 3 },
      { label: 'Run time exception', value: 4 },
    ]
    
  }

  save = () => {
    Alert.alert("You are in Basic Level. You Should go Back and read the Chapters.");
  }

  render() {
    return (
      <ScrollView>
        <View style = {{marginTop:50}} />
        <View style={styles.container}>
          
          <AppPicker
            type="1) Which of the following option leads to the portability and security of Java?"
            value={this.state.gender}
            selecteditem={this.genderCategories}
            onSelectItem={item => this.setState({ gender: item })}
            items={this.genderCategories}
          />

          <AppPicker
            type="2) Which of the following is not a Java features?"
            value={this.state.playerLevel}
            selecteditem={this.playerLevel}
            onSelectItem={item => this.setState({ playerLevel: item })}
            items={this.playerLevel}
          />

          <AppPicker
            type="3. The \u0021 article referred to as a"
            value={this.state.handSwing}
            selecteditem={this.handSwing}
            onSelectItem={item => this.setState({ handSwing: item })}
            items={this.handSwing}
          />

          <AppPicker
            type="4) _____ is used to find and fix bugs in the Java programs."
            value={this.state.preferredCourt}
            selecteditem={this.preferredCourt}
            onSelectItem={item => this.setState({ preferredCourt: item })}
            items={this.preferredCourt}
          />
          <AppPicker
            type="5) Which of the following is a valid declaration of a char?"
            value={this.state.fifthOne}
            selecteditem={this.fifthOne}
            onSelectItem={item => this.setState({ fifthOn: item })}
            items={this.fifthOne}
          />
          <AppPicker
            type="6) What is the return type of the hashCode() method in the Object class?"
            value={this.state.sixthOne}
            selecteditem={this.sixthOne}
            onSelectItem={item => this.setState({ sixthOne: item })}
            items={this.sixthOne}
          />
          <AppPicker
            type="7) Which of the following is a valid long literal?"
            value={this.state.seventhOne}
            selecteditem={this.seventhOne}
            onSelectItem={item => this.setState({ seventhOne: item })}
            items={this.seventhOne}
          />
          <AppPicker
            type="8) What does the expression float a = 35 / 0 return?"
            value={this.state.eighthOne}
            selecteditem={this.eighthOne}
            onSelectItem={item => this.setState({ eighthOne: item })}
            items={this.eighthOne}
          />
        
          <View style={{ height: 20 }} />
        </View>

        <View style={styles.topContainer}>
          <TouchableOpacity style={styles.backChevronContainer} onPress={() => this.save()}>
            <Text style={styles.saveText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    );
  }
}

export default News;

const styles = StyleSheet.create({
  backChevronContainer: {
    marginBottom: 10,
  },
  container: {
    marginHorizontal: 20
  },
  inputText: {
    paddingLeft: 15,
    fontSize: 17,

  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 15
  },
  saveText: {
    fontSize: 20,
    color:'blue'
  },
  topContainer: {
    justifyContent: 'center',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },
  textInput: {
    borderRadius: 4,
    borderColor: '#b5b5b5',
    borderWidth: 1,
    margin: 5,
    height: 40,
    padding: 5
  },
  inputPicker: {
    borderBottomWidth: 1,
    marginBottom: 30,
    borderColor: 'grey',
    marginHorizontal: 10,
  }
})