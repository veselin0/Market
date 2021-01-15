import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import Card from '../components/common/Card';
import CardSection from '../components/common/CardSection';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Spinner from '../components/common/Spinner';

const LogInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onButonPress = () => {
    if (!email || !password) {
      setError('Please fill in the form');
      return;
    }

    setError('');
    setLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(onLoginSuccess)
      .catch((e) => {
        if (e.code === 'auth/user-not-found') {
          return promptToCreateNewAccount()
            .then(onLoginSuccess)
            .catch(onLoginFail);
        } else {
          onLoginFail(e);
        }
      })
      .finally(() => setLoading(false));
  };

  const promptToCreateNewAccount = () =>
    new Promise((res, rej) => {
      Alert.alert(
        'This account does not exist',
        'Do you want to create an account with these credentials?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: res(),
          },
          {
            text: 'OK',
            onPress: () => {
              console.log(
                'Not an existing user. Attempting to create new user',
              );

              auth()
                .createUserWithEmailAndPassword(email, password)
                .then(res)
                .catch(rej);
            },
          },
        ],
        { cancelable: false },
      );
    });

  const onLoginFail = (e) => {
    setError(`Authentication failed: ${e.message}`);
  };

  const onLoginSuccess = () => {
    setEmail('');
    setPassword('');
    setError('');
  };

  const renderButton = () => {
    if (loading) {
      return <Spinner size="small" />;
    }

    return <Button onPress={onButonPress}>Log In!</Button>;
  };

  return (
    <View>
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="user@email.com"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{error}</Text>

        <CardSection>{renderButton()}</CardSection>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
});

export default LogInForm;
