import React, {useContext} from 'react';
import {ButtonGroup, Button, View, StyleSheet} from 'react-native';
import ctx from '../lib/context';

export default function MyMenu({state}) {
  const {setPage} = useContext(ctx);
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Сканнер"
          onPress={() => setPage('scanner')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title="Обход"
          onPress={() => setPage('todo')}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 'auto',
  },
  buttonContainer: {
    flex: 1,
    borderWidth: 0,
  },
  button: {
    borderRadius: 0,
    backgroundColor: '#ffcc00',
  },
});
