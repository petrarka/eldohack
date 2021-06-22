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
} from 'react-native';

import ScanScreen from './components/qr';
import Stats from './components/stats';
import MyMenu from './components/menu';
import ToDo from './components/todo';
import ctx from './lib/context';

function App() {
  console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
  let [state, setState] = React.useState({
    page: 'scanner',
    selectedIndex: 1,
  });
  let [StatsState, setStatsState] = React.useState({
    error: null,
    item_id: null,
    item_name: null,
    latest_tag_date: null,
    outdated: null,
    this_tag_date: null,
  });

  let [TodoState, setTodoState] = React.useState({
    text: null,
    todos: [],
  });

  function setStats(ok) {
    console.log(StatsState);
    console.log(ok);
    setStatsState(ok);
  }

  function setPage(page) {
    console.log(state);
    let state2 = Object.assign({}, state);
    state2.page = page;
    setState(state2);
  }

  function setText(text) {
    console.log(TodoState);
    let state2 = Object.assign({}, TodoState);
    state2.text = text;
    setTodoState(state2);
  }

  async function getToDo(id) {
    console.log(TodoState);
    let state2 = Object.assign({}, TodoState);
    let prom = await fetch(
      'http://45.138.72.27:5000' + '/get_items_from_group/' + TodoState.text,
    );
    let json = await prom.json();
    let arr = [];
    let items = json.items;
    for (let step = 0; step < items.length; step++) {
      let item = items[step];
      arr.push({
        key: item.item_id,
        skud: item.item_id,
        type: 'empty',
        typeText: 'не отсканирован',
        name: item.item_name,
      });
    }
    state2.todos = arr;
    setTodoState(state2);
  }

  function updToDo(item) {
    let id = item.item_id;
    let state2 = Object.assign({}, TodoState);
    for (let step = 0; step < state2.todos.length; step++) {
      if (id === state2.todos[step].key) {
        if (item.outdated) {
          state2.todos[step].type = 'bad';
          state2.todos[step].typeText = 'не верен';
        } else {
          state2.todos[step].type = 'good';
          state2.todos[step].typeText = 'верен';
        }
      }
    }
    setTodoState(state2);
  }

  function currentPage() {
    const menu = {
      scanner: (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Stats style={{flex: 2}} state={StatsState} />
          <ScanScreen style={{flex: 1}} />
        </View>
      ),
      todo: <ToDo state={TodoState} />,
    };
    return menu[state.page];
  }

  return (
    <ctx.Provider
      value={{setStats, setPage, setTodoState, setText, getToDo, updToDo}}>
      <View
        style={{
          flex: 1,
        }}>
        {currentPage()}
        <MyMenu />
      </View>
    </ctx.Provider>
  );
}

export default App;
