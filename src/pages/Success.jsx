import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Pembelian Berhasil!
        </h1>
        <p className="text-gray-500 mb-6">
          Paket data kamu sudah aktif. Selamat menikmati!
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/packages')}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Lihat Paket Lainnya
          </button>
          <button
            onClick={() => navigate('/transactions')}
            className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition font-semibold"
          >
            Riwayat Transaksi
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full text-gray-500 py-2 rounded-lg hover:underline text-sm"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
