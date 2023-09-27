import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TrySwipeModal from './src/TrySwipeModal';
import CyclicTabView from './src/CyclicTabView';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/* <TrySwipeModal /> */}
      <CyclicTabView />
    </GestureHandlerRootView>
  );
};

export default App;
