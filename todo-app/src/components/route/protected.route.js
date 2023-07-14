import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const tokenValue = localStorage.getItem("token");
  return tokenValue ? element() : <Navigate to="/login" />;
}
export default ProtectedRoute