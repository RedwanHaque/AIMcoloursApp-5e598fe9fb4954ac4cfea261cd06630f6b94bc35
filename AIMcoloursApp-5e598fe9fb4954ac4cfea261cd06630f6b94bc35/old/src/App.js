import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager'; 

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

    //if (!this.state.text){
    //  Alert.alert("Nothing to Write");
    //  return;
    //}

    if(!this.state.color){
      Alert.alert("Null");
      return;
    }

    try {
      let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.mifareUltralightHandlerAndroid;
      let resp = await NfcManager.requestTechnology(tech, {
        alertMessage: "In Range for Transfer"
      });

      let bytes;

      if (Platform.OS === 'android') {
         bytes = mifareUltralightHandlerAndroid.encodeMessage([mifareUltralightHandlerAndroid.textRecord(this.state.color)]);
      }
      else {
         bytes = mifareIOS.encodeMessage([mifareIOS.textRecord(this.state.color)]);
      }

      if (bytes && Platform.OS === 'android') {
        await NfcManager.mifareUltralightHandlerAndroid.writeNdefMessage(bytes);
        await NfcManager.setAlertMessage('Successful Transfer');
      }
      else {
        await NfcManager.mifareIOS.writeNdefMessage(bytes);
        await NfcManager.setAlertMessageIOS('Successful Transfer');
      }

    } catch(err){
      this.setState({
        log: err.toString()
      })
      this.cleanUp();
    }
  }

  changeColor = (color) => {
    this.setState({
      color: color
    })
  }

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <TextInput>

          {/*style={styles.textInput}
          //onChangeText={this.onChangeText}
          //autoCompleteType="off"
          //autoCapitalize={false}
          //placeholderTextColor="#888888"
    //placeholder="Enter Text here"  */}

          <TouchableOpacity
            onPress={()=> this.changeColor('#ff0000')}
            style={styles.selectButton1}>
            <Text style={styles.buttonText}>Red</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=> this.changeColor('#0000ff')}
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
  //textInput: {
    //marginLeft: 20,
    //marginRight: 20,
    //height: 50,
    //marginBottom: 10,
    //textAlign: 'center',
    //color: 'black'
  //},
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
  },
  buttonText: {
    color: '#ffffff'
  },
  log: {
    marginTop : 30,
    height: 50,
    justifyContent: 'center',
    alightItems: 'center',
  }
})

//import './App.css';

export default App;
