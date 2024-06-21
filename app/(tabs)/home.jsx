import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddExpense = () => {
    if (category === '') {
      alert('Please select a category');
      return;
    }
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (date === '') {
      alert('Please select a date');
      return;
    }

    const newExpense = { category, amount: Number(amount), date: date.toLocaleDateString('en-GB') };
    if (isEditing) {
      const updatedExpenses = expenses.map((expense, index) =>
        index === editIndex ? newExpense : expense
      );
      setExpenses(updatedExpenses);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setExpenses([...expenses, newExpense]);
    }
    setTotalAmount(prevAmount => prevAmount + Number(amount));

    // Clear input fields
    setCategory('');
    setAmount('');
    setDate(new Date());
  };

  const handleDeleteExpense = (expense) => {
    const filteredExpenses = expenses.filter(exp => exp !== expense);
    setExpenses(filteredExpenses);
    setTotalAmount(totalAmount - expense.amount);
  };

  const handleEditExpense = (index) => {
    const expense = expenses[index];
    setCategory(expense.category);
    setAmount(expense.amount.toString());
    setDate(new Date(expense.date));
    setIsEditing(true);
    setEditIndex(index);
  };

  const renderExpenseItem = ({ item, index }) => (
    <View className='flex flex-row justify-between items-center p-2 border-b border-gray-300'>
      <Text>{item.category}</Text>
      <Text>{item.amount}</Text>
      <Text>{item.date}</Text>
      <View className='flex flex-row'>
        <TouchableOpacity onPress={() => handleEditExpense(index)}>
          <Text className='text-blue-500 mr-2'>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteExpense(item)}>
          <Text className='text-red-500'>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className='flex-1 p-5 justify-center items-center'>
      <View className='w-full mb-5'>
        <TextInput
          className='border border-gray-400 p-2 mb-2'
          placeholder="Category"
          value={category}
          onChangeText={text => setCategory(text)}
        />
        <TextInput
          className='border border-gray-400 p-2 mb-2'
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={text => setAmount(text)}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            className='border border-gray-400 p-2 mb-2'
            placeholder="Date"
            value={date.toLocaleDateString('en-GB')}
            editable={false}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;
              setShowDatePicker(Platform.OS === 'ios');
              setDate(currentDate);
            }}
          />
        )}
        <Button title={isEditing ? "Update Expense" : "Add Expense"} onPress={handleAddExpense} />
      </View>
      <View className='w-full'>
        <FlatList
          data={expenses}
          renderItem={renderExpenseItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text className = 'text-lg font-bold mt-4'>Total Amount: {totalAmount}</Text>
      </View>
    </View>
  );
};

export default Home;