import React, { useEffect } from 'react';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { Task } from '../../types';
import { useTask } from '../../contexts/TaskContext';
import { useAuth } from '../../contexts/AuthContext';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
  const { user } = useAuth();
  const isAdmin = user?.isAdmin;

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-start space-x-3 p-3 bg-gray-800/60 backdrop-blur-md rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-colors"
        >
          <button
            onClick={() => onToggleTask(task.id)}
            className="mt-1 focus:outline-none"
            aria-label={task.completed ? "Marcar como incompleta" : "Marcar como completada"}
          >
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
          </button>
          
          <span className={`flex-1 text-sm ${
            task.completed
              ? 'text-gray-400 line-through'
              : 'text-gray-200'
          }`}>
            {task.description}
          </span>

          {isAdmin && (
            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
              aria-label="Eliminar tarea"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;