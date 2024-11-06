import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Inicio from './components/Dashboard';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Header from './components/Header';
import SuggestionsPage from './components/suggestions/SuggestionsPage';
import Settings from './components/Settings';
import AdminPanel from './components/admin/AdminPanel';
import SuperAdminPanel from './components/superadmin/SuperAdminPanel';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="absolute bottom-8 text-sm text-blue-400 hover:text-blue-300"
        >
          {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-gray-800/80 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
              CleaningElements
            </span>
          </div>
          <Header />
        </div>
      </header>

      <main className="container mx-auto px-4 pt-20 pb-8">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/suggestions" element={<SuggestionsPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route 
            path="/admin/*" 
            element={
              user.role === 'admin' ? <AdminPanel /> : <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/superadmin/*" 
            element={
              user.role === 'superadmin' ? <SuperAdminPanel /> : <Navigate to="/" replace />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;