import React, {useContext} from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';
import ctx from '../lib/context';

export default function Stats({state}) {
  console.log(state);
  const {setPage} = useContext(ctx);
  function goToDo() {
    setPage('todo');
  }
  let styles = {
    stats: {
      display: 'flex',
      color: '#000',
      textAlign: 'center',
      fontSize: 20,
    },
    view: {
      backgroundColor: '#ffcc00',
      alignSelf: 'stretch',
      minHeight: 150,
      justifyContent: 'center',
    },
  };

  let text = 'Наведи на ценник';
  if (state.statsState === true) {
    text = 'Ценник верен!';
    styles.view.backgroundColor = '#009933';
  }
  if (state.statsState === false) {
    text = 'Ценник не верен!';
    styles.view.backgroundColor = '#cc0000';
  }
  let stylesComp = StyleSheet.create(styles);
  return (
    <View style={stylesComp.view}>
      <Text style={stylesComp.stats}>{text}</Text>
    </View>
  );
}
