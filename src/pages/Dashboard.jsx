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
    <div>
      <h1>Selamat datang, {user?.name}</h1>
      <button onClick={() => navigate('/packages')}>Lihat Paket</button>
      <button onClick={() => navigate('/transactions')}>
        Riwayat Transaksi
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
