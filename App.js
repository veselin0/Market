import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import LogInForm from './src/screens/LogInForm';
import Header from './src/components/common/Header';
import Button from './src/components/common/Button';
import Spinner from './src/components/common/Spinner';
import ListScreen from './src/components/common/ListScreen';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  const renderContent = () => {
    switch (loggedIn) {
      case true:
        return (
          <View>
            <ListScreen />
          </View>
        );
      case false:
        return <LogInForm />;
      default:
        return (
          <View style={styles.spinnerStyle}>
            <Spinner size="large" />
          </View>
        );
    }
  };

  return (
    <View>
      <Header headerText="Да отидем на пазар!" />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
  },
  buttonStyle: {
    marginVertical: 50,
  },
});

export default App;
