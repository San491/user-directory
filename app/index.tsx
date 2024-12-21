import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Appbar, Card, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';




interface User {
  id: number;
  name: string;
  email: string;
}

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const renderItem = ({ item }: { item: User }) => (
    <Card
      style={styles.card}
      onPress={() => router.push(`/details/${item.id}`)}
    >
      <Card.Content>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <>
    <Appbar.Header style={styles.header}>
        <Appbar.Content title="User Directory"/>
      </Appbar.Header>
    <FlatList
      style={styles.list}
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      />
      </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '',
  },
  list: {backgroundColor: 'black'},
  card: { margin: 10, borderRadius: 8 },
  name: { fontSize: 18, fontWeight: 'bold' },
  email: { fontSize: 14 },
});
