import React from 'react';
import { User } from '../../types';
import UserTableRow from './UserTableRow';

interface UserTableProps {
  users: User[];
  editingId: string | null;
  editForm: Partial<User>;
  onEdit: (user: User) => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onDelete: (id: string) => void;
  onCheckboxChange: (checked: boolean) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  editingId,
  editForm,
  onEdit,
  onSave,
  onCancel,
  onChange,
  onDelete,
  onCheckboxChange,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Habitación
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Admin
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              isEditing={editingId === user.id}
              editForm={editForm}
              onEdit={onEdit}
              onSave={onSave}
              onCancel={onCancel}
              onChange={onChange}
              onDelete={onDelete}
              onCheckboxChange={onCheckboxChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;