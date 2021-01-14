import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import Header from '../components/common/Header';
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
    setError('');
    setLoading('');

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(onLoginSuccess)
      .catch(() => {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .then(onLoginSuccess)
          .catch(onLoginFail);
      });
  };

  const onLoginFail = (e) => {
    setError(`Authentication failed: ${e.message}`);
    setLoading(false);
  };

  const onLoginSuccess = () => {
    setEmail('');
    setPassword('');
    setLoading(false);
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
      <Header headerText="Gotcha the Great!" />
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@email.com"
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
