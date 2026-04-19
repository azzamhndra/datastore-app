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
        setError('Gagal mengambil data');
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
        onClick={() => navigate('/packages')}
        className="text-blue-600 mb-4 hover:underline text-sm"
      >
        ← Kembali
      </button>

      <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {packageById?.name}
        </h1>
        <p className="text-sm text-gray-500 mb-4">{packageById?.provider}</p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-blue-600 text-2xl font-bold">
            Rp {packageById?.price.toLocaleString()}
          </span>
          <span className="text-gray-500 text-sm">{packageById?.quota} GB</span>
        </div>

        <p className="text-gray-600 mb-4">{packageById?.description}</p>

        <ul className="mb-6 space-y-1">
          {packageById?.features?.map((f, i) => (
            <li key={i} className="text-sm text-gray-600">
              ✅ {f}
            </li>
          ))}
        </ul>

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
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Beli Sekarang
        </button>
      </div>
    </div>
  );
};

export default PackageDetail;
