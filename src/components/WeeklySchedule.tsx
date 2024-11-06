import React from 'react';
import { Droplets, Wind, Flame, Mountain, Star, CheckCircle2 } from 'lucide-react';
import { useRoom } from '../contexts/RoomContext';
import { useTask } from '../contexts/TaskContext';
import { Element, Zone } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface WeeklyScheduleProps {
  weekOffset?: number;
}

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ weekOffset = 0 }) => {
  const { rooms } = useRoom();
  const { getZoneProgress } = useTask();
  const { user } = useAuth();
  const currentUserElement = user?.room;

  const getRotatedZone = (currentZone: Zone, weeksAhead: number): Zone => {
    const zones: Zone[] = ['Cocina', 'Terraza', 'Azotea', 'Pasillos', 'Escaleras'];
    const currentIndex = zones.indexOf(currentZone);
    return zones[(currentIndex + weeksAhead) % zones.length];
  };

  const getElementIcon = (element: Element) => {
    switch (element) {
      case 'Agua': return <Droplets className="w-5 h-5 text-blue-400" />;
      case 'Aire': return <Wind className="w-5 h-5 text-gray-400" />;
      case 'Fuego': return <Flame className="w-5 h-5 text-red-400" />;
      case 'Tierra': return <Mountain className="w-5 h-5 text-green-400" />;
      case 'Éter': return <Star className="w-5 h-5 text-purple-400" />;
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

  // Obtener todas las habitaciones y sus zonas asignadas
  const allRooms = Object.entries(rooms).map(([element, room]) => {
    const futureZone = weekOffset !== 0 ? getRotatedZone(room.currentZone, weekOffset) : room.currentZone;
    const progress = getZoneProgress(weekOffset === 0 ? room.currentZone : futureZone);
    
    return {
      element: element as Element,
      currentZone: weekOffset === 0 ? room.currentZone : futureZone,
      progress
    };
  });

  // Obtener el rango de fechas para la semana
  const getWeekDates = () => {
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - now.getDay() + 1 + (weekOffset * 7));
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="space-y-4">
      {/* Fechas de la semana */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {weekDates.map((date, index) => (
          <div
            key={index}
            className={`text-center p-2 rounded-lg ${
              date.getDay() === 0 || date.getDay() === 6
                ? 'bg-gray-800/40 text-gray-400'
                : 'bg-gray-800/60'
            }`}
          >
            <div className="text-xs text-gray-400 capitalize">
              {date.toLocaleDateString('es-ES', { weekday: 'short' })}
            </div>
            <div className="text-sm font-medium text-white">
              {date.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Asignaciones */}
      <div className="grid grid-cols-1 gap-4">
        {allRooms.map(({ element, currentZone, progress }) => (
          <div
            key={element}
            className="bg-gray-800/60 backdrop-blur-md rounded-lg border border-gray-700/50 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getElementIcon(element)}
                <h3 className="text-lg font-semibold text-white">
                  {element}
                </h3>
              </div>
              {weekOffset === 0 && (
                <div className="flex items-center space-x-2 bg-gray-900/50 rounded-xl px-3 py-1">
                  <CheckCircle2 className={`w-4 h-4 ${
                    progress >= 80 ? 'text-green-400' :
                    progress >= 50 ? 'text-yellow-400' :
                    progress >= 20 ? 'text-orange-400' :
                    'text-red-400'
                  }`} />
                  <span className="text-sm font-bold text-white">{progress}%</span>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center space-x-3">
              <span className="text-2xl">{getZoneEmoji(currentZone)}</span>
              <div className="flex-1">
                <span className="text-gray-300 block mb-2">{currentZone}</span>
                {weekOffset === 0 && (
                  <div className="w-full h-1.5 bg-gray-700/50 rounded-full">
                    <div
                      className={`h-1.5 rounded-full bg-gradient-to-r ${getElementGradient(element)} transition-all duration-500`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;