import React from 'react';
import { User } from '../../types';
import { Trash2, Edit2, Save, X } from 'lucide-react';

interface UserTableRowProps {
  user: User;
  isEditing: boolean;
  editForm: Partial<User>;
  onEdit: (user: User) => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onDelete: (id: string) => void;
  onCheckboxChange: (checked: boolean) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  isEditing,
  editForm,
  onEdit,
  onSave,
  onCancel,
  onChange,
  onDelete,
  onCheckboxChange,
}) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={editForm.email || ''}
            onChange={onChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-1"
          />
        ) : (
          <span className="text-gray-900 dark:text-gray-300">{user.email}</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <select
            name="room"
            value={editForm.room || ''}
            onChange={onChange}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-1"
          >
            <option value="Agua">Agua</option>
            <option value="Aire">Aire</option>
            <option value="Fuego">Fuego</option>
            <option value="Tierra">Tierra</option>
            <option value="Éter">Éter</option>
          </select>
        ) : (
          <span className="text-gray-900 dark:text-gray-300">{user.room}</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEditing ? (
          <input
            type="checkbox"
            name="isAdmin"
            checked={editForm.isAdmin || false}
            onChange={(e) => onCheckboxChange(e.target.checked)}
            className="rounded border-gray-300 dark:border-gray-600 text-blue-600"
          />
        ) : (
          <span className="text-gray-900 dark:text-gray-300">{user.isAdmin ? 'Sí' : 'No'}</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {isEditing ? (
          <div className="flex space-x-2">
            <button
              onClick={onSave}
              className="text-green-600 hover:text-green-900 dark:hover:text-green-400"
            >
              <Save className="w-5 h-5" />
            </button>
            <button
              onClick={onCancel}
              className="text-gray-600 hover:text-gray-900 dark:hover:text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(user)}
              className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(user.id)}
              className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default UserTableRow;