import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import CardSection from '../components/common/CardSection';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const LogInForm = () => {
  return (
    <View>
      <Header headerText="Gotcha the Great!" />
      <Card>
        <CardSection>
          <Input label="Email" placeholder="email@email.com" />
        </CardSection>
        <CardSection>
          <Input label="Password" placeholder="password" />
        </CardSection>
        <CardSection>
          <Button>Log In!</Button>
        </CardSection>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LogInForm;
