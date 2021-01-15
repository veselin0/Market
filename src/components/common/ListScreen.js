import React from 'react';
import auth from '@react-native-firebase/auth';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import Card from '../common/Card';
import CardSection from '../common/CardSection';
import Button from './Button';

const ListScreen = () => {
  const gotchas = [
    { name: 'Gotcha 1', age: 20 },
    { name: 'Gotcha 2', age: 21 },
    { name: 'Gotcha 3', age: 22 },
    { name: 'Gotcha 4', age: 23 },
    { name: 'Gotcha 5', age: 24 },
    { name: 'Gotcha 6', age: 25 },
    { name: 'Gotcha 7', age: 26 },
    { name: 'Gotcha 8', age: 27 },
    { name: 'Gotcha 9', age: 28 },
  ];

  return (
    <>
      <Card>
        <CardSection>
          <FlatList
            //horizontal // scrolls the list horizontally
            //showsHorizontalScrollIndicator={false} // keeps the scrollbar from appearing
            //showsVerticalScrollIndicator={false} // keeps the scrollbar from appearing
            keyExtractor={(gotcha) => gotcha.name}
            data={gotchas}
            renderItem={({ item }) => {
              return (
                <Text style={styles.textStyle}>
                  {item.name} - Age {item.age}
                </Text>
              );
            }}
          />
        </CardSection>
        <CardSection>
          <Button onPress={() => auth().signOut()}>Log Out</Button>
        </CardSection>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 10,
  },
});

export default ListScreen;
