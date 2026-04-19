import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-blue-600 font-bold text-xl">PaketData.id</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:underline"
        >
          Logout
        </button>
      </nav>

      {/* Content */}
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-1">
            Selamat datang, {user?.name}! 👋
          </h2>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/packages')}
            className="bg-blue-600 text-white rounded-xl p-6 text-left hover:bg-blue-700 transition shadow"
          >
            <p className="text-2xl mb-2">📦</p>
            <p className="font-semibold text-lg">Lihat Paket</p>
            <p className="text-sm text-blue-100">Browse paket data tersedia</p>
          </button>

          <button
            onClick={() => navigate('/transactions')}
            className="bg-white text-gray-800 rounded-xl p-6 text-left hover:shadow-md transition shadow border border-gray-200"
          >
            <p className="text-2xl mb-2">🧾</p>
            <p className="font-semibold text-lg">Riwayat Transaksi</p>
            <p className="text-sm text-gray-500">Lihat pembelian kamu</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
