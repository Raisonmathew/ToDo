import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Auth/login';
import Home from './components/todo/home';
import Register from './components/Auth/register';
import ProtectedRoute from './components/route/protected.route';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/todo"
          element={<ProtectedRoute element={Home} />}
        />
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/*" element={<Navigate to="" />} />
      </Routes>
    </div>
  );
}

export default App;
