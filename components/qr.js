'use strict';

import React, {Component, useContext} from 'react';
import ctx from '../lib/context';
import {StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export default function ScanScreen() {
  const {setStats} = useContext(ctx);
  function onSuccess() {
    console.log('Засканило');
    setStats(true);
  }

  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.torch}
      //topContent={<Text>Направь камеру на ценник</Text>}
      reactivate={true}
      reactivateTimeout={3}
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
