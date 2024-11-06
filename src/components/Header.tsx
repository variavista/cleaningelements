import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut, Settings, Home, MessageSquarePlus, Shield, Building2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderDropdownProps {
  onClose: () => void;
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ onClose }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  return (
    <div className="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg py-1 border border-gray-700/50">
      <button
        onClick={() => handleNavigation('/')}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50"
      >
        <Home className="mr-3 h-4 w-4" />
        Inicio
      </button>

      <button
        onClick={() => handleNavigation('/suggestions')}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50"
      >
        <MessageSquarePlus className="mr-3 h-4 w-4" />
        Sugerencias
      </button>

      <button
        onClick={() => handleNavigation('/settings')}
        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50"
      >
        <Settings className="mr-3 h-4 w-4" />
        Configuración
      </button>

      {user?.role === 'superadmin' && (
        <>
          <div className="border-t border-gray-700/50 my-1"></div>
          <button
            onClick={() => handleNavigation('/superadmin')}
            className="flex items-center w-full px-4 py-2 text-sm text-purple-400 hover:bg-gray-700/50"
          >
            <Building2 className="mr-3 h-4 w-4" />
            Panel SuperAdmin
          </button>
        </>
      )}

      {user?.role === 'admin' && (
        <>
          <div className="border-t border-gray-700/50 my-1"></div>
          <button
            onClick={() => handleNavigation('/admin')}
            className="flex items-center w-full px-4 py-2 text-sm text-purple-400 hover:bg-gray-700/50"
          >
            <Shield className="mr-3 h-4 w-4" />
            Panel Admin
          </button>
        </>
      )}

      <div className="border-t border-gray-700/50 my-1"></div>

      <button
        onClick={handleLogout}
        className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-900/20"
      >
        <LogOut className="mr-3 h-4 w-4" />
        Cerrar Sesión
      </button>
    </div>
  );
};

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
        aria-label="Menu"
      >
        <Menu className="w-5 h-5 text-gray-300" />
      </button>

      {isOpen && <HeaderDropdown onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default Header;