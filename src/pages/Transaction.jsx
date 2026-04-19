import { useState, useEffect } from 'react';
import { TransactionService } from '../services/transactionService';
import { useAuth } from '../context/AuthContext';

const Transaction = () => {
  const [transaction, setTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

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

  if (isLoading) return <div>Is loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {transaction.map((trx, index) => (
        <div key={trx.id}>
          <p>Transaksi ke {index + 1}</p>
          <p>{trx.packageName}</p>
          <p>{trx.price}</p>
          <p>{trx.status}</p>
          <p>{trx.createdAt}</p>
        </div>
      ))}
    </div>
  );
};

export default Transaction;
