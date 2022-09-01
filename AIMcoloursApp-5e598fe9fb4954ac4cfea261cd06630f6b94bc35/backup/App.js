/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import 'App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      log: "Ready...",
      text: ""
    }
  }

  componentDidMount(){ NfcManager.start(); }

  componentWillUnmount(){ this.cleanUp(); }

  cleanUp = () => { NfcManager.cancelTechnologyRequest().catch(() => 0); }

  onChangeText = (text) => { this.setState({text}) }

  writeData = async () => {
    try {
      let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
      let resp = await NfcManager.requestTechnology(tech, {
        alertMessage: "In Range for Transfer"
      });
      //sendMifareCommandIOS
    } catch(err){
      this.setState({
        log: err.toString()
      })
      this.cleanUp();
    }
  }

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <TextInput>
          style={styles.textInput}
          onChangeText={this.onChangeText}
          autoCompleteType="off"
          autoCapitalize={false}
          placeholderTextColor="#888888"
          placeholder="Enter Text here" />

          <TouchableOpacity
            onPress={this.writeData}
            style={styles.selectButton1}>
            <Text style={styles.buttonText}>Red</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.writeData}
            style={styles.selectButton2}>
            <Text style={styles.buttonText}>Blue</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.writeData}
            style={styles.buttonWrite}>
            <Text style={styles.buttonText}>Write</Text>
          </TouchableOpacity>

          <View style={styles.log}>
            <Text>{this.state.log}</Text>
          </View>

        </TextInput>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textInput: {
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    marginBottom: 10,
    textAlign: 'center',
    color: 'black'
  },
  selectButton1:{
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#FF0000'
  },
  selectButton2:{
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#0000FF'
  },
  buttonWrite:{
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#9D2235'
  }
})

export default App;
