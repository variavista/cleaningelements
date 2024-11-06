import React, { useState } from 'react';
import { Mail, Lock, Droplets, Wind, Flame, Mountain, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Element } from '../../types';
import AnimatedLogo from '../ui/AnimatedLogo';
import ParticleBackground from '../ui/ParticleBackground';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [room, setRoom] = useState<Element>('Agua');
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const { register } = useAuth();

  const rooms: { element: Element; icon: React.ReactNode; description: string; gradient: string }[] = [
    {
      element: 'Agua',
      icon: <Droplets className="w-5 h-5" />,
      description: 'Fluye con calma y adaptabilidad',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      element: 'Aire',
      icon: <Wind className="w-5 h-5" />,
      description: 'Libertad y pensamiento claro',
      gradient: 'from-slate-500 to-gray-400'
    },
    {
      element: 'Fuego',
      icon: <Flame className="w-5 h-5" />,
      description: 'Pasión y transformación',
      gradient: 'from-red-500 to-orange-400'
    },
    {
      element: 'Tierra',
      icon: <Mountain className="w-5 h-5" />,
      description: 'Estabilidad y crecimiento',
      gradient: 'from-green-500 to-emerald-400'
    },
    {
      element: 'Éter',
      icon: <Star className="w-5 h-5" />,
      description: 'Conexión y equilibrio',
      gradient: 'from-purple-500 to-violet-400'
    }
  ];

  const handleRoomSelect = (selectedRoom: Element, description: string) => {
    setRoom(selectedRoom);
    setToast(description);
    setTimeout(() => setToast(''), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, room);
    } catch (err) {
      setError('Error al registrar usuario');
    }
  };

  return (
    <>
      <ParticleBackground />
      <div className="bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700/50">
        <AnimatedLogo />
        
        {error && (
          <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full h-12 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                placeholder="ejemplo@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full h-12 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-200 mb-3">
              Selecciona tu Habitación
            </label>
            <div className="grid grid-cols-5 gap-2">
              {rooms.map(({ element, icon, description, gradient }) => (
                <button
                  key={element}
                  type="button"
                  onClick={() => handleRoomSelect(element, description)}
                  className={`relative p-4 rounded-lg transition-all duration-300 ${
                    room === element
                      ? `bg-gradient-to-b ${gradient} shadow-lg shadow-${gradient.split('-')[2]}/20`
                      : 'bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600'
                  }`}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className={room === element ? 'text-white' : 'text-gray-300'}>
                      {icon}
                    </div>
                    <span className={`text-xs font-medium ${
                      room === element ? 'text-white' : 'text-gray-300'
                    }`}>
                      {element}
                    </span>
                  </div>
                  {room === element && (
                    <div className="absolute inset-0 rounded-lg ring-2 ring-white/50 animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* Toast Notification */}
            <div className={`fixed top-4 right-4 transition-all duration-300 transform ${
              toast ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}>
              <div className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm shadow-xl border border-gray-700">
                {toast}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium"
          >
            Registrarse
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;