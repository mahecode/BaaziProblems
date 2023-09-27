import React, {useState} from 'react';
import {View, Button, StyleSheet, Alert} from 'react-native';
import {TabView} from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#ff4081'}]} />
);
const SecondRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
);
const ThirdRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#4caf50'}]} />
);

const initialRoutes = [
  {key: 'first', title: 'First', component: FirstRoute},
  {key: 'second', title: 'Second', component: SecondRoute},
  {key: 'third', title: 'Third', component: ThirdRoute},
];

export default function CyclicTabView({isAnimated = true, isCyclic = true}) {
  const [routes, setRoutes] = useState(initialRoutes);
  const [index, setIndex] = useState(0);

  const renderScene = ({route}) => {
    return route.component();
  };

  const addTab = () => {
    const newKey = `tab${routes.length + 1}`;
    const newRoute = {
      key: newKey,
      title: `Tab ${routes.length + 1}`,
      component: () => (
        <View style={[styles.scene, {backgroundColor: getRandomColor()}]} />
      ),
    };
    setRoutes([...routes, newRoute]);
  };

  const removeTab = () => {
    if (routes.length > 1) {
      const newRoutes = routes.slice(0, routes.length - 1);
      setRoutes(newRoutes);
    } else {
      Alert.alert("Can't remove all tabs!");
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: 300}}
        swipeEnabled={isAnimated}
      />
      <Button title="Add Tab" onPress={addTab} />
      <Button title="Remove Tab" onPress={removeTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
  },
});
