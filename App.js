import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View, Text } from 'react-native';
import LogInForm from './src/screens/LogInForm';
import ListScreen from './src/components/common/ListScreen';

const App = () => {
  return (
    <View>
      <LogInForm />
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
