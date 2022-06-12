import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Provider} from 'react-redux';
import {store} from './store';

import Message from './components/Message';
import MessageClass from './components/MessageClass';
import Users from './components/Users';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Message />
          <MessageClass isDarkMode={isDarkMode} />
          <Users />
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
