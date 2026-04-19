import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div>
      <p>Pembelian berhasil</p>
      <button onClick={() => navigate('/packages')}>Lihat paket lainnya</button>
    </div>
  );
};

export default Success;
