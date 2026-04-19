import { useLocation, useNavigate } from 'react-router-dom';
import { TransactionService } from '../services/transactionService';
import { useState } from 'react';

const Checkout = () => {
  const location = useLocation();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { packageId, packageName, provider, userId, price, status, createdAt } =
    location.state;

  const handleCheckout = async () => {
    navigate('/success');
    try {
      await TransactionService.checkout({
        packageId,
        packageName,
        provider,
        userId,
        price,
        status,
        createdAt,
      });
    } catch (err) {
      setError('Gagal membeli paket');
      navigate('/checkout');
    }
  };

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate('/packages')}
        className="text-blue-600 mb-4 hover:underline text-sm"
      >
        ← Kembali
      </button>

      <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Konfirmasi Pembelian
        </h1>

        <div className="border border-gray-200 rounded-lg p-4 mb-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Paket</span>
            <span className="font-semibold text-gray-800">{packageName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Provider</span>
            <span className="font-semibold text-gray-800">{provider}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Harga</span>
            <span className="font-bold text-blue-600">
              Rp {price.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Konfirmasi Beli
        </button>
      </div>
    </div>
  );
};

export default Checkout;
