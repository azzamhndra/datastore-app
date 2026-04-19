import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PackageServices } from '../services/packageService';
import { useAuth } from '../context/AuthContext';

const PackageDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [packageById, setPackageById] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PackageServices.getPackageById(id);
        setPackageById(data);
      } catch (err) {
        setError('gagal mengambil data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(packageById);

  if (isLoading) return <div>Is Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <p>{packageById?.name}</p>
      <p>{packageById?.provider}</p>
      <p>{packageById?.price}</p>
      <p>{packageById?.quota}</p>
      <button
        onClick={() =>
          navigate('/checkout', {
            state: {
              packageId: packageById.id,
              packageName: packageById.name,
              userId: Number(user.id),
              provider: packageById.provider,
              price: packageById.price,
              status: 'success',
              createdAt: new Date().toISOString(),
            },
          })
        }
      >
        Beli
      </button>
    </div>
  );
};

export default PackageDetail;
