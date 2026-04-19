import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import PublicRoute from './components/PublicRoute';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Transaction from './pages/Transaction';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/packages/:id"
          element={
            <ProtectedRoute>
              <PackageDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/packages"
          element={
            <ProtectedRoute>
              <Packages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transaction />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
