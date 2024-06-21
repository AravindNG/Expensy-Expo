import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CreateExpense from '../../components/CreateExpense'; // Adjust the path if needed

const Create = ({ token }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Expense</Text>
      <CreateExpense token={token} />
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
