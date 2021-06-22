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
    smallText: {
      display: 'flex',
      color: '#000',
      textAlign: 'center',
    },
  };

  let text = 'Наведи на ценник';
  if (state.outdated === false) {
    text = 'Ценник верен!';
    styles.view.backgroundColor = '#46a165';
  }
  if (state.outdated === true) {
    text = 'Ценник не верен!';
    styles.view.backgroundColor = '#af4f4f';
  }
  let stylesComp = StyleSheet.create(styles);
  let data = <Text />;
  if (state.outdated != null) {
    data = (
      <Text style={stylesComp.smallText}>
        {state.item_name} СКУД: {state.item_id} {'\n'}
        Дата создания этого ценника ценника:{'\n'} {state.this_tag_date} {'\n'}
        Последняя версия ценника:{'\n'} {state.latest_tag_date} {'\n'}
      </Text>
    );
  }
  return (
    <View style={stylesComp.view}>
      <Text style={stylesComp.stats}>{text}</Text>
      {data}
    </View>
  );
}
