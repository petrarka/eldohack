import React, {useContext} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import ctx from '../lib/context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  bad: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: '#af4f4f',
  },
  good: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: '#46A165FF',
  },
  empty: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: '#030303',
  },
});

async function sendToDo(st) {
  let s = `Отчет по списку с Id:${st.text} \n`;
  for (let step = 0; step < st.todos.length; step++) {
    let item = st.todos[step];
    let tmp = `${step}. Скуд:${item.skud} Название: ${item.name} Состояние: ${item.typeText} \n`;
    s += tmp;
  }
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  s += `Дата проверки: ${today}`;
  let data = {chat_id: '-560363628', text: s};
  let response = await fetch(
    'https://api.telegram.org/bot1837036569:AAGDRbzDmT0Jhv3Xkb4vQf7x3koJKqanQhM/sendMessage',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    },
  );

  let result = await response.json();
  console.log(result);
}
function ToDo({state}) {
  const {getToDo, setText} = useContext(ctx);
  state.items;
  console.log('ffffffffffff');
  console.log(state.todos);
  console.log('ddddddddddd');
  return (
    <View style={styles.container}>
      <Button title={'Отослать отчет'} onPress={() => sendToDo(state)} />
      <TextInput
        placeholder="Введите id списка"
        onChangeText={text => setText(text)}
        defaultValue={state.text}
      />
      <Button
        style={styles.button}
        title="Загрузить список"
        onPress={() => getToDo()}
      />

      <FlatList
        data={state.todos}
        renderItem={({item}) => (
          <Text style={styles[item.type]}>
            {item.skud} - {item.name} - {item.typeText}
          </Text>
        )}
      />
    </View>
  );
}

export default ToDo;
