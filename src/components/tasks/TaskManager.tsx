import React, { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import TaskList from './TaskList';
import { useTask } from '../../contexts/TaskContext';
import { Zone } from '../../types';

interface TaskManagerProps {
  zoneName: Zone;
}

const TaskManager: React.FC<TaskManagerProps> = ({ zoneName }) => {
  const { getZoneTasks, addTask, toggleTask, getZoneProgress, initializeZoneTasks } = useTask();
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    initializeZoneTasks(zoneName);
  }, [zoneName, initializeZoneTasks]);

  const tasks = getZoneTasks(zoneName);
  const progress = getZoneProgress(zoneName);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return filter === 'completed' ? task.completed : !task.completed;
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(zoneName, newTask.trim());
      setNewTask('');
    }
  };

  const handleToggleTask = (taskId: string) => {
    toggleTask(zoneName, taskId);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {zoneName}
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {progress}%
          </span>
        </div>
      </div>

      <div className="mb-4 flex items-center space-x-4">
        <Filter className="w-5 h-5 text-gray-500" />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white py-1 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todas las tareas</option>
          <option value="pending">Pendientes</option>
          <option value="completed">Completadas</option>
        </select>
      </div>

      {filteredTasks.length > 0 ? (
        <TaskList tasks={filteredTasks} onToggleTask={handleToggleTask} zone={zoneName} />
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-500 dark:text-gray-400">
            No hay tareas disponibles en esta categoría.
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskManager;