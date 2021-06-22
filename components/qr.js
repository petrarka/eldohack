'use strict';

import React, {Component, useContext} from 'react';
import ctx from '../lib/context';
import {StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export default function ScanScreen() {
  const {setStats, updToDo} = useContext(ctx);
  async function onSuccess(e) {
    try {
      console.log('Засканило');
      console.log(e.data);
      let prom = await fetch(e.data + '&seller=1');
      let json = await prom.json();

      updToDo(json);
      setStats(json);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.torch}
      //topContent={<Text>Направь камеру на ценник</Text>}
      reactivateTimeout={5}
      reactivate={true}
      showMarker={true}
    />
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
