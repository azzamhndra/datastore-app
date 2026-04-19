import api from './api';

export const PackageServices = {
  getPackages: async (params) => {
    const res = await api.get('/packages', { params: params });
    return res.data.data;
  },
  getPackageById: async (packageId) => {
    const res = await api.get(`/packages/${packageId}`);
    return res.data;
  },
};
