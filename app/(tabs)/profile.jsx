import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PieChart } from 'react-native-chart-kit';

const Profile = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const data = [
    { name: 'Food', amount: 50, color: '#f00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Transport', amount: 20, color: '#0f0', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Entertainment', amount: 30, color: '#00f', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  ];

  const handleLogout = () => {
    // Handle logout logic
  };

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(false);
    setStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(false);
    setEndDate(currentDate);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={styles.container}>
        <View className="w-full flex justify-center min-h-[85] px-4 my-6">
          <Image
            style={styles.profileImage}
            source={{ uri: 'https://example.com/profile.jpg' }}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">Username</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">Total Expenses</Text>
          <PieChart
            data={data}
            width={350}
            height={220}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">Select Date Range</Text>
          <View style={styles.datePickerContainer}>
            <Button title="Start Date" onPress={() => setShowStartPicker(true)} />
            <Text style={styles.dateText}>{startDate.toDateString()}</Text>
            {showStartPicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={handleStartDateChange}
              />
            )}
          </View>
          <View style={styles.datePickerContainer}>
            <Button title="End Date" onPress={() => setShowEndPicker(true)} />
            <Text style={styles.dateText}>{endDate.toDateString()}</Text>
            {showEndPicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={handleEndDateChange}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => 'rgba(26, 255, 146, ${opacity})', // Adjusted here
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const styles = {
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'white',
  },
};

export default Profile;