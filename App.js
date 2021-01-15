import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import LogInForm from './src/screens/LogInForm';
import Header from './src/components/common/Header';
import Button from './src/components/common/Button';
import Spinner from './src/components/common/Spinner';

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
          <View style={{ height: 60 }}>
            <Button onPress={() => auth().signOut()}>Log Out</Button>
          </View>
        );
      case false:
        return <LogInForm />;
      default:
        return <Spinner size="large" />;
    }
  };

  return (
    <View>
      <Header headerText="Authentification" />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
