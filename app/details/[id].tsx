import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useSearchParams } from 'expo-router/build/hooks';
import { Card, Text, Button, Appbar } from 'react-native-paper';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export default function DetailsScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!user) {
    return <Text>User not found</Text>;
  }

  return (
    <>
    <Appbar.Header style={styles.header}>
        <Appbar.Content title="Details" style={{ alignItems: 'center' }}/>
      </Appbar.Header>
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>Email: {user.email}</Text>
          <Text style={styles.phone}>Phone: {user.phone}</Text>
          <Text style={styles.address}>Street: {user.address.street}</Text>
          <Text style={styles.address}>Suite: {user.address.suite}</Text>
          <Text style={styles.address}>City: {user.address.city}</Text>
          <Text style={styles.address}>Zipcode: {user.address.zipcode}</Text>
          <Text style={styles.address}>Geo (Lat, Lng): {user.address.geo.lat}, {user.address.geo.lng}</Text>
          <Text style={styles.company}>Company Name: {user.company.name}</Text>
          <Text style={styles.company}>Catchphrase: {user.company.catchPhrase}</Text>
          <Text style={styles.company}>BS: {user.company.bs}</Text>
        </Card.Content>
      </Card>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {backgroundColor: '',  justifyContent: 'center'},
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  card: { marginBottom: 20, borderRadius: 8 },
  name: { fontSize: 24, fontWeight: 'bold' },
  email: { fontSize: 18, marginTop: 10 },
  phone: { fontSize: 16, marginTop: 5 },
  address: { fontSize: 16, marginTop: 5 },
  company: { fontSize: 16, marginTop: 5 },
});
