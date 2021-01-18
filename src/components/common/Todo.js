import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

function Todo({ id, title, complete }) {
  async function toggleComplete() {
    await firestore().collection('todos').doc(id).update({
      complete: !complete,
    });
  }

  async function del() {
    await firestore().collection('todos').doc(id).delete();
  }

  return (
    <View style={styles.container}>
      <View style={styles.listStyle}>
        <List.Item
          title={title}
          onPress={() => toggleComplete()}
          left={(props) => (
            <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
          )}
        />
      </View>
      <TouchableOpacity style={styles.iconStyle} onPress={() => del()}>
        <Icon name="trash" size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listStyle: {
    flex: 8,
  },
  iconStyle: {
    flex: 1,
  },
});

export default React.memo(Todo);
