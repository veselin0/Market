import React, { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Appbar, TextInput, Button } from 'react-native-paper';
import Todo from './Todo';
import Spinner from './Spinner';

const ref = firestore().collection('todos');

function Todos() {
  const [todo, setTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  async function addTodo() {
    await ref.add({ title: todo, complete: false });
    setTodo('');
  }

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });

      setTodos(list);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Appbar>
        <Appbar.Content title={'Какво да купим?'} />
      </Appbar>
      <FlatList
        style={{ flex: 1 }}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Todo {...item} />}
      />
      <TextInput label={'Gocho Todo'} value={todo} onChangeText={setTodo} />
      <Button onPress={() => addTodo()}>добави покупка</Button>
      <Button onPress={() => auth().signOut()}>излез!</Button>
    </>
  );
}

export default Todos;
