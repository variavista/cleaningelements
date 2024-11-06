import React from 'react';
import UserManagement from '../components/admin/UserManagement';
import ZoneManagement from '../components/admin/ZoneManagement';
import SystemSettings from '../components/admin/SystemSettings';

const AdminPanel: React.FC = () => {
  return (
    <div className="space-y-8">
      <UserManagement />
      <ZoneManagement />
      <SystemSettings />
    </div>
  );
};

export default AdminPanel;