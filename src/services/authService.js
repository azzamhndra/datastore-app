import api from './api';

export const AuthService = {
  login: async (email, password) => {
    const res = await api.get(`/users?email=${email}`);
    if (res.data.length === 0) {
      throw new Error('Email tidak ditemukan');
    }

    const user = res.data[0];

    if (user.password !== password) {
      throw new Error('Password Salah');
    }

    return user;
  },
};
