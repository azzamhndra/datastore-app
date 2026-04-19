import { useEffect, useState } from 'react';
import { PackageServices } from '../services/packageService';
import { Link } from 'react-router-dom';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterProvider, setFilterProvider] = useState('');
  const [filterHarga, setFilterHarga] = useState('');
  const [filterKuota, setFilterKuota] = useState('');
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);

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
        setError('Ggal mengambil data paket');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filterHarga, filterKuota, filterProvider, page, limit]);

  if (isLoading) return <div>is loading...</div>;

  return (
    <div>
      <select onChange={(e) => setFilterProvider(e.target.value)}>
        <option value="">Select Provider</option>
        <option value="XL">XL</option>
        <option value="Telkomsel">Telkomsel</option>
        <option value="Indosat">Indosat</option>
        <option value="Tri">Tri</option>
      </select>

      <label htmlFor="">Harga</label>
      <input
        type="text"
        value={filterHarga}
        onChange={(e) => setFilterHarga(e.target.value)}
      />

      <label htmlFor="">Kuota</label>
      <input
        type="text"
        value={filterKuota}
        onChange={(e) => setFilterKuota(e.target.value)}
      />

      {packages.length === 0 ? (
        <p>Tidak ada paket tersedia</p>
      ) : (
        packages.map((pkg) => (
          <Link to={`/packages/${pkg.id}`} key={pkg.id}>
            <p>{pkg.name}</p>
          </Link>
        ))
      )}

      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>

      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default Packages;
