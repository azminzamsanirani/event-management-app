import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/admin/Login";
import RegisterPage from "./pages/admin/Register";
import AdminEvents from "./pages/admin/AdminEvents";
import ProtectedRoute from "./components/ProtectedRoute";
import UserEvents from "./pages/public/UserEvents";

const App = () => {
  return (
    <Routes>
      {/* Authentication Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin Portal (Protected Routes) */}
      <Route
        path="/admin/events"
        element={
          <ProtectedRoute>
            <AdminEvents />
          </ProtectedRoute>
        }
      />

      {/* Public Events Page */}
      <Route path="/events" element={<UserEvents />} />

      {/* Redirect unknown routes to login */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
