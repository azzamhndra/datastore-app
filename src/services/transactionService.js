import api from './api';

export const TransactionService = {
  checkout: async (transactionData) => {
    const res = await api.post('/transactions', transactionData);
    return res.data;
  },
  getTransactionByUserId: async (userId) => {
    const res = await api.get(`/transactions?userId=${userId}`);
    return res.data;
  },
};
