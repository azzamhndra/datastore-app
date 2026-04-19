# E-Commerce Paket Data Internet

## Cara Menjalankan

1. `npm install`
2. `json-server --watch db.json --port 3001`
3. `npm run dev`

## Struktur Project

- `src/pages` — halaman utama
- `src/components` — komponen reusable
- `src/services` — API abstraction layer
- `src/context` — global state (AuthContext)

## Design Decision

- **useContext** untuk auth state — menghindari prop drilling
- **Service pattern** untuk abstraksi API call
- **Server-side filter & pagination** — lebih efisien untuk data besar
- **Protected & Public Route** — keamanan navigasi

## Trade-off

- Filter real-time tanpa debounce — bisa ditambah debounce untuk optimasi
- Tidak ada token JWT — menggunakan localStorage sebagai dummy auth
