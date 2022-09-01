import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Buffer} from "buffer";
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

class App extends Component {

  //React States
  constructor(props){
    super(props);
    this.state = {
      log: "Ready...",
      color: '#ff0000',
      data: ''
    }
  }

  componentDidMount(){ NfcManager.start(); }

  componentWillUnmount(){ this.cleanUp(); }

  cleanUp = () => { NfcManager.cancelTechnologyRequest().catch(() => 0); }

  onChangeText = (text) => { this.setState({text}) }

  //DOES THIS WRITE DATA FUNCTION ACTUALLY WRITE DATA? CAN WE USE IT FOR TRANSFERRING TO NFC?
  writeData = async () => {
    if(!this.state.color){
      Alert.alert("Null");
      return;
    }

    try {
      let tech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.MifareUltralight;
      //Alert.alert(tech);
      let resp = await NfcManager.requestTechnology(tech, {
        alertMessage: "In Range for Transfer"
      });
      //Alert.alert("b");
      console.log("b");
      var myBuffer = [];
      var str = this.state.color;

      //Alert.alert("this state color is fine");
      console.log("this state color is fine");
      var buffer = new Buffer(str, 'utf16le');

      //Alert.alert(buffer);
      console.log(buffer);
      console.log(buffer.length);
      for (var i = 0; i < buffer.length; i++) {
          myBuffer.push(buffer[i]);
      }
      Alert.alert(myBuffer);

      let bytes = myBuffer;
      Alert.alert(this.state.color);
      Alert.alert(bytes);
      if (bytes) {
        await NfcManager.tech.writeNdefMessage(bytes);
        await NfcManager.setAlertMessage('Successful Transfer');
        Alert.alert('succesful transfer');
        Alert.alert(bytes);
      }

    } catch(err){
      this.setState({
        log: err.toString()
      })
      this.cleanUp();
    }
  }

   writeNFC = async() => {
    let result = false;

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      //image data 
      const bytes = Ndef.encodeMessage([Ndef.SmartposterRecord(bytes);

      if (bytes) {
        await NfcManager.ndefHandler
          .writeNdefMessage(bytes);
        result = true;
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }

    return result;
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // //WHY DO WE NEED THIS CHANGE COLOR FUNCTION
  // changeColor = (color) => {
  //   this.setState({
  //     color: color
  //   })
  // }

  // readBitMap = async (file) => {
  //   var temp = 0;
  //   var fileb = 0;
  //   console.log('B')

  //   const getFileArray = (file) => {
  //     console.log('C')
  //     return new Promise((acc, err) => {
  //       console.log('D')
  //       const reader = new FileReader();
  //       reader.onload = (file) => { acc(file.target.result)}
  //       reader.onerror = (err) => { err(err) };
  //       reader.readAsArrayBuffer(file);
  //     });
  //   }

  //   console.log('E')
  //   console.log(file)
  //   temp = await getFileArray(file[0]);
  //   //console.log(temp);
  //   console.log('F')
  //   fileb = new Uint8Array(temp);

  //   ndef.message_decoder(fileb, errors='strict', known_types=Record._known_types)
  // }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //changeColor function is responsible for fetching data from the repo
  changeColor = async (image) => {
    if (image == 1) {
      //Fetch data and storing it in the react state, meaning the app can hold an instance of 1 image at a time
      await fetch('http://localhost:8081/test.txt').then(t => t.text()).then((text) => this.setState({data: text}))
      //Converting the stored state data into bytestream

      //Send data via a function to NFC, need to find one in the NFC manager library

    } else if (image == 2) {
      await fetch('http://localhost:8081/test2.txt').then(t => t.text()).then((text) => this.setState({data: text}))
    }
    console.log(this.state.data);
  }

  render(){
    return (
      <SafeAreaView style={styles.container}>

          {/*style={styles.textInput}
          //onChangeText={this.onChangeText}
          //autoCompleteType="off"
          //autoCapitalize={false}
          //placeholderTextColor="#888888"``
    //placeholder="Enter Text here"  */}

        {/* <View style={styles.header}>
          <Text style={styles.title}>Good morning, Redwan!</Text>
          <Text style={styles.subtitle}>Today, don't let anyone dull your shine.</Text>
        </View>

        <h2 style={{ color: "yellow", marginLeft: "1em"}}> Quick Apply </h2>
        <h4 style={{ color: "white", marginLeft: "2em" }}> PATTERNS </h4> */}

        <View style={styles.parent}>

          <TouchableOpacity
            onPress={()=> this.changeColor(1)}
            style={styles.selectButton1}>
            <Text style={styles.buttonText}>img1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=> this.changeColor(2)}
            style={styles.selectButton2}>
            <Text style={styles.buttonText}>img2</Text>
          </TouchableOpacity>

        </View>

        {/* <h4 style={{ color: "white", marginLeft: "2em" }}> SOLIDS </h4> */}

          {/* <TouchableOpacity
            onPress={this.writeData}
            style={styles.buttonWrite}>
            <Text style={styles.buttonText}>White</Text>
          </TouchableOpacity> */}

          <View style={styles.log}>
            <Text>{this.state.log}</Text>
          </View>

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'dimgrey'
  },
  parent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  logo: {
    height: 80
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "",
    fontSize: "2.5rem",
    fontFamily: "Georgia",
    marginVertical: "1em",
    textAlign: "center",
    color: "white"
  },
  subtitle:{
    fontSize: "1rem",
    textAlign: "center",
    color: "white"
  },
  patTitle:{
    fontSize: "1.5rem"
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
    backgroundColor: '#808080'
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

export default App;