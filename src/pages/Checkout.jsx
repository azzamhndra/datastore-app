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
  return (
    <div>
      <p>Nama paket: {packageName}</p>
      <p>Provider: {provider}</p>
      <p>Price: {price}</p>
      <button onClick={handleCheckout}>Konfirmasi Beli</button>
    </div>
  );
};

export default Checkout;
