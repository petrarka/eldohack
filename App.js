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
  let [state, setState] = React.useState({
    statsState: {name: null, status: null, date: null},
    page: 'scanner',
    selectedIndex: 1,
  });

  function setStats(ok) {
    console.log(state);
    let state2 = Object.assign({}, state);
    state2.statsState = !state.statsState;
    setState(state2);
  }

  function setPage(page) {
    console.log(state);
    let state2 = Object.assign({}, state);
    state2.page = page;
    setState(state2);
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
          <Stats style={{flex: 2}} state={state} />
          <ScanScreen style={{flex: 1}} />
        </View>
      ),
      todo: <ToDo />,
    };
    return menu[state.page];
  }

  return (
    <ctx.Provider value={{setStats, setPage}}>
      <View
        style={{
          flex: 1,
        }}>
        {currentPage()}
        <MyMenu state={state} />
      </View>
    </ctx.Provider>
  );
}

export default App;
