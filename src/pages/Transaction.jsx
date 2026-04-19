import { useState, useEffect } from 'react';
import { TransactionService } from '../services/transactionService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Transaction = () => {
  const [transaction, setTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TransactionService.getTransactionByUserId(user.id);
        setTransaction(data);
      } catch (err) {
        setError('Gagal mengambil data transaksi');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Memuat data...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate('/dashboard')}
        className="text-blue-600 mb-4 hover:underline text-sm"
      >
        ← Kembali
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Riwayat Transaksi
      </h1>

      {transaction.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-4xl mb-3">🧾</p>
          <p>Belum ada transaksi</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transaction.map((trx, index) => (
            <div
              key={trx.id}
              className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-800">{trx.packageName}</p>
                <p className="text-sm text-gray-500">{trx.provider}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(trx.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-600">
                  Rp {trx.price.toLocaleString()}
                </p>
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  {trx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transaction;
