import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Droplets, Wind, Flame, Mountain, Star } from 'lucide-react';
import WeeklySchedule from './WeeklySchedule';
import ParticleBackground from './ui/ParticleBackground';
import TaskList from './tasks/TaskList';
import { useRoom } from '../contexts/RoomContext';
import { useAuth } from '../contexts/AuthContext';
import { useTask } from '../contexts/TaskContext';
import { Element, Zone } from '../types';

const Dashboard = () => {
  const { rooms } = useRoom();
  const { user } = useAuth();
  const { getZoneTasks, toggleTask, getZoneProgress } = useTask();
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

  const getWeekDateRange = (weekOffset: number) => {
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - now.getDay() + 1 + (weekOffset * 7));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const formatDate = (date: Date) => {
      return date.toLocaleString('es-ES', { 
        day: 'numeric',
        month: 'short'
      });
    };

    return `${formatDate(monday)} - ${formatDate(sunday)} ${sunday.getFullYear()}`;
  };

  const getZoneEmoji = (zone: string) => {
    switch (zone) {
      case 'Cocina': return '🍳';
      case 'Terraza': return '🌺';
      case 'Azotea': return '☀️';
      case 'Pasillos': return '🚶';
      case 'Escaleras': return '🪜';
      default: return '🏠';
    }
  };

  const getElementIcon = (element: Element) => {
    switch (element) {
      case 'Agua': return <Droplets className="w-6 h-6 text-blue-400" />;
      case 'Aire': return <Wind className="w-6 h-6 text-gray-400" />;
      case 'Fuego': return <Flame className="w-6 h-6 text-red-400" />;
      case 'Tierra': return <Mountain className="w-6 h-6 text-green-400" />;
      case 'Éter': return <Star className="w-6 h-6 text-purple-400" />;
    }
  };

  const getElementGradient = (element: Element) => {
    switch (element) {
      case 'Agua': return 'from-blue-500 to-cyan-400';
      case 'Aire': return 'from-gray-500 to-gray-400';
      case 'Fuego': return 'from-red-500 to-orange-400';
      case 'Tierra': return 'from-green-500 to-emerald-400';
      case 'Éter': return 'from-purple-500 to-violet-400';
    }
  };

  const getZoneGradient = (zone: string) => {
    switch (zone) {
      case 'Cocina': return 'from-amber-500 to-orange-600';
      case 'Terraza': return 'from-pink-500 to-rose-600';
      case 'Azotea': return 'from-yellow-400 to-orange-500';
      case 'Pasillos': return 'from-indigo-500 to-blue-600';
      case 'Escaleras': return 'from-emerald-500 to-teal-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  // Si es admin, mostrar todas las zonas
  if (user?.isAdmin) {
    const zones: Zone[] = ['Cocina', 'Terraza', 'Azotea', 'Pasillos', 'Escaleras'];
    
    return (
      <>
        <ParticleBackground />
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Panel de Control</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedWeek(prev => prev - 1)}
                className="p-2 rounded-lg hover:bg-gray-700/50 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="text-gray-300 min-w-[200px] text-center">
                {getWeekDateRange(selectedWeek)}
              </span>
              <button
                onClick={() => setSelectedWeek(prev => prev + 1)}
                className="p-2 rounded-lg hover:bg-gray-700/50 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {zones.map((zone) => {
              const tasks = getZoneTasks(zone);
              const progress = getZoneProgress(zone);
              const currentRoom = Object.entries(rooms).find(([_, r]) => r.currentZone === zone)?.[0] as Element;

              return (
                <div
                  key={zone}
                  className="relative overflow-hidden bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-20 blur-3xl"
                       style={{ background: `linear-gradient(to bottom right, var(--${zone.toLowerCase()}-gradient))` }} />
                  
                  <div className="relative p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <span className="text-4xl">{getZoneEmoji(zone)}</span>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{zone}</h3>
                          <div className="flex items-center space-x-2 text-gray-300">
                            {getElementIcon(currentRoom)}
                            <span>Habitación {currentRoom}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 bg-gray-900/50 rounded-xl px-4 py-2">
                        <CheckCircle2 className={`w-5 h-5 ${
                          progress >= 80 ? 'text-green-400' :
                          progress >= 50 ? 'text-yellow-400' :
                          progress >= 20 ? 'text-orange-400' :
                          'text-red-400'
                        }`} />
                        <span className="text-xl font-bold text-white">{progress}%</span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-2 bg-gray-700/50 rounded-full mb-6">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${getZoneGradient(zone)} transition-all duration-500`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {/* Lista de Tareas */}
                    <TaskList tasks={tasks} onToggleTask={toggleTask} zone={zone} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Planificación Semanal */}
          <section className="bg-gray-800/60 backdrop-blur-md rounded-xl shadow-lg border border-gray-700/50 p-6">
            <h3 className="text-xl font-bold text-white mb-6">Planificación Semanal</h3>
            <WeeklySchedule weekOffset={selectedWeek} />
          </section>
        </div>
      </>
    );
  }

  // Vista normal para usuarios
  const userRoom = user?.room || 'Agua';
  const currentZone = rooms[userRoom]?.currentZone;
  const zoneTasks = getZoneTasks(currentZone);
  const zoneProgress = getZoneProgress(currentZone);

  return (
    <>
      <ParticleBackground />
      <div className="space-y-8">
        {/* Mi Habitación */}
        <section className="relative overflow-hidden bg-gray-800/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-20 blur-3xl"
               style={{ background: `linear-gradient(to bottom right, var(--${userRoom.toLowerCase()}-gradient))` }} />
          
          <div className="relative p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-6">
                <span className="text-6xl">{getZoneEmoji(currentZone)}</span>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    {getElementIcon(userRoom)}
                    <h2 className="text-3xl font-bold text-white">
                      {currentZone}
                    </h2>
                  </div>
                  <p className="text-lg text-gray-300">
                    Habitación {userRoom}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gray-900/50 rounded-xl px-5 py-3">
                <CheckCircle2 className={`w-6 h-6 ${
                  zoneProgress >= 80 ? 'text-green-400' :
                  zoneProgress >= 50 ? 'text-yellow-400' :
                  zoneProgress >= 20 ? 'text-orange-400' :
                  'text-red-400'
                }`} />
                <span className="text-2xl font-bold text-white">{zoneProgress}%</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-700/50 rounded-full mb-8">
              <div
                className={`h-2 rounded-full bg-gradient-to-r ${getZoneGradient(currentZone)} transition-all duration-500`}
                style={{ width: `${zoneProgress}%` }}
              />
            </div>

            {/* Lista de Tareas */}
            <div className="mt-6">
              <TaskList tasks={zoneTasks} onToggleTask={toggleTask} zone={currentZone} />
            </div>
          </div>
        </section>

        {/* Planificación Semanal */}
        <section className="bg-gray-800/60 backdrop-blur-md rounded-xl shadow-lg border border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Otras Habitaciones</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedWeek(prev => prev - 1)}
                className="p-2 rounded-lg hover:bg-gray-700/50 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span className="text-gray-300 min-w-[200px] text-center">
                {getWeekDateRange(selectedWeek)}
              </span>
              <button
                onClick={() => setSelectedWeek(prev => prev + 1)}
                className="p-2 rounded-lg hover:bg-gray-700/50 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <WeeklySchedule weekOffset={selectedWeek} />
        </section>
      </div>
    </>
  );
};

export default Dashboard;