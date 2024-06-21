import api from './api';

export const createExpense = async (expenseData, token) => {
  const response = await api.post('/expenses', expenseData, {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data;
};

export const getExpenses = async (token) => {
  const response = await api.get('/expenses', {
    headers: {
      'x-auth-token': token,
    },
  });
  return response.data;
};
