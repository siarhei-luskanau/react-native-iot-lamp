'use strict';

import React, { Component } from 'react';
import ReactNative, {
  StyleSheet,
  Text,
  Switch,
  View
} from 'react-native';
import Firebase from "firebase";

Firebase.initializeApp({
 apiKey: "AIzaSyA5rK5JDZFjY5SpIL5FwlXhx8Sty-k9FBs",
    authDomain: "fir-database-f6b5a.firebaseapp.com",
    databaseURL: "https://fir-database-f6b5a.firebaseio.com",
    storageBucket: "fir-database-f6b5a.appspot.com",
    messagingSenderId: "443316178527"
});

export default class ReactNativeIotLamp extends Component {

  state = {
    lampSwitch: false,
  };

  lampRef = Firebase.database().ref('lamp');

  listenForLampRef() {
    this.lampRef.on('value', (snapshot) => {
      this.setState({lampSwitch: snapshot.val()});
      console.log(`lamp state:${snapshot.val()}`)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Switch
          onValueChange={(value) => this.lampRef.set(value)}
          value={this.state.lampSwitch} />
      </View>
    );
  }

  componentDidMount() {
    this.listenForLampRef();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

module.exports = ReactNativeIotLamp;
