import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createExpense } from '../services/expenses'; // Adjust the path if needed

const CreateExpense = ({ token }) => {
  const [form, setForm] = useState({
    amount: '',
    description: '',
  });

  const submit = async () => {
    try {
      const data = await createExpense(form, token);
      console.log('Expense created:', data);
      // Handle successful expense creation
    } catch (error) {
      console.error('Expense creation failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={form.amount}
        onChangeText={(text) => setForm({ ...form, amount: text })}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={form.description}
        onChangeText={(text) => setForm({ ...form, description: text })}
      />
      <Button title="Submit" onPress={submit} />
    </View>
  );
};

export default CreateExpense;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
