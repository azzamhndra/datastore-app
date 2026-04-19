import { useEffect, useState } from 'react';
import { PackageServices } from '../services/packageService';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterProvider, setFilterProvider] = useState('');
  const [filterHarga, setFilterHarga] = useState('');
  const [filterKuota, setFilterKuota] = useState('');
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const params = {};

  if (filterHarga) params.price_lte = filterHarga;
  if (filterProvider) params.provider = filterProvider;
  if (filterKuota) params.quota = filterKuota;
  if (limit) params._per_page = limit;
  if (page) params._page = page;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PackageServices.getPackages(params);
        setPackages(data);
      } catch (err) {
        setError('Gagal mengambil data paket');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [filterHarga, filterKuota, filterProvider, page, limit]);

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
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Paket Data</h1>
      <button
        onClick={() => navigate('/dashboard')}
        className="text-blue-600 mb-4 hover:underline text-sm"
      >
        ← Dashboard
      </button>

      {/* Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          onChange={(e) => setFilterProvider(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Semua Provider</option>
          <option value="XL">XL</option>
          <option value="Telkomsel">Telkomsel</option>
          <option value="Indosat">Indosat</option>
          <option value="Tri">Tri</option>
        </select>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Harga Maks</label>
          <input
            type="text"
            value={filterHarga}
            onChange={(e) => setFilterHarga(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="contoh: 50000"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Kuota (GB)</label>
          <input
            type="text"
            value={filterKuota}
            onChange={(e) => setFilterKuota(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="contoh: 10"
          />
        </div>
      </div>

      {/* Package List */}
      {packages.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          Tidak ada paket tersedia
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <Link to={`/packages/${pkg.id}`} key={pkg.id}>
              <div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition">
                <h2 className="font-semibold text-gray-800">{pkg.name}</h2>
                <p className="text-sm text-gray-500">{pkg.provider}</p>
                <p className="text-blue-600 font-bold mt-2">
                  Rp {pkg.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">{pkg.quota} GB</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-600">Halaman {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Packages;
