import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Plus, Trash2, Edit2, Save, X, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { Zone, Task, CleaningZone } from '../../types';
import { getTasks, addTask, updateTask, deleteTask } from '../../hooks/useDatabase';
import { useZones } from '../../hooks/useZones';

const ZoneManagement: React.FC = () => {
  const { getZones, addZone, updateZone, deleteZone } = useZones();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [zones, setZones] = useState<CleaningZone[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Task>>({});
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [expandedZones, setExpandedZones] = useState<Record<Zone, boolean>>({});
  const [newTask, setNewTask] = useState<Partial<Task>>({
    description: '',
    completed: false
  });
  const [newZone, setNewZone] = useState<Partial<CleaningZone>>({
    name: '',
    description: '',
    isActive: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const getWeekDateRange = (weekOffset: number) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + weekOffset * 7 - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    };

    return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
  };

  const handleToggleComplete = async (taskId: string) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(taskId, updatedTask);
      
      setTasks(prev => prev.map(t => 
        t.id === taskId ? updatedTask : t
      ));
    } catch (error) {
      console.error('Error toggling task:', error);
      setError('Error al actualizar la tarea');
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [loadedZones, loadedTasks] = await Promise.all([
        getZones(),
        getTasks()
      ]);
      setZones(loadedZones);
      setTasks(loadedTasks);
      
      // Inicializar expandedZones
      const expanded: Record<Zone, boolean> = {};
      loadedZones.forEach(zone => {
        expanded[zone.name] = false;
      });
      setExpandedZones(expanded);
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddZone = async () => {
    if (!newZone.name) return;

    try {
      await addZone(newZone.name, newZone.description);
      await loadData();
      setNewZone({
        name: '',
        description: '',
        isActive: true
      });
    } catch (error) {
      console.error('Error adding zone:', error);
      setError('Error al añadir la zona');
    }
  };

  const handleDeleteZone = async (zoneId: string) => {
    try {
      await deleteZone(zoneId);
      await loadData();
    } catch (error) {
      console.error('Error deleting zone:', error);
      setError('Error al eliminar la zona');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Error al eliminar la tarea');
    }
  };

  const handleAddTask = async () => {
    if (!newTask.zone || !newTask.description) return;

    try {
      const id = await addTask({
        description: newTask.description,
        zone: newTask.zone as Zone,
        completed: false,
        createdAt: new Date()
      });

      setTasks(prev => [...prev, {
        id: id.toString(),
        description: newTask.description!,
        zone: newTask.zone as Zone,
        completed: false,
        createdAt: new Date()
      }]);

      setNewTask({
        zone: zones[0]?.name,
        description: '',
        completed: false
      });

      setExpandedZones(prev => ({
        ...prev,
        [newTask.zone as Zone]: true
      }));
    } catch (error) {
      console.error('Error adding task:', error);
      setError('Error al añadir la tarea');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Week Navigation */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-semibold text-white">
          Gestión de Zonas
        </h3>
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

      {/* Add Zone Form */}
      <div className="bg-gray-800/60 backdrop-blur-md rounded-lg border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Añadir Nueva Zona
        </h3>
        <div className="flex gap-4">
          <input
            type="text"
            value={newZone.name}
            onChange={(e) => setNewZone({ ...newZone, name: e.target.value })}
            placeholder="Nombre de la zona"
            className="flex-1 rounded-lg bg-gray-700/50 border border-gray-600 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newZone.description || ''}
            onChange={(e) => setNewZone({ ...newZone, description: e.target.value })}
            placeholder="Descripción (opcional)"
            className="flex-1 rounded-lg bg-gray-700/50 border border-gray-600 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddZone}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Add Task Form */}
      <div className="mb-8">
        <div className="flex gap-4">
          <select
            value={newTask.zone}
            onChange={(e) => setNewTask({ ...newTask, zone: e.target.value as Zone })}
            className="rounded-lg bg-gray-700/50 border border-gray-600 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar zona</option>
            {zones.map((zone) => (
              <option key={zone.id} value={zone.name}>
                {zone.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Descripción de la tarea"
            className="flex-1 rounded-lg bg-gray-700/50 border border-gray-600 text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Zones List */}
      <div className="space-y-4">
        {zones.map((zone) => {
          const zoneTasks = tasks.filter((task) => task.zone === zone.name);
          const completedTasks = zoneTasks.filter(task => task.completed).length;
          const progress = zoneTasks.length > 0 ? (completedTasks / zoneTasks.length) * 100 : 0;

          return (
            <div key={zone.id} className="bg-gray-800/60 backdrop-blur-md rounded-lg border border-gray-700/50 overflow-hidden">
              <div className="flex items-center justify-between p-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {zone.name}
                  </h3>
                  {zone.description && (
                    <p className="text-sm text-gray-400 mt-1">
                      {zone.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleDeleteZone(zone.id!)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setExpandedZones(prev => ({
                      ...prev,
                      [zone.name]: !prev[zone.name]
                    }))}
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {expandedZones[zone.name] ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {expandedZones[zone.name] && (
                <div className="px-6 pb-6">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">
                        Progreso de tareas
                      </span>
                      <span className="text-sm text-gray-400">
                        {completedTasks} de {zoneTasks.length} tareas completadas
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-700/50 rounded-full">
                      <div
                        className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {zoneTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between bg-gray-700/50 p-4 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleToggleComplete(task.id)}
                            className={`transition-colors ${
                              task.completed ? 'text-green-400' : 'text-gray-400 hover:text-green-400'
                            }`}
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                          <span className={`text-gray-200 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                            {task.description}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ZoneManagement;