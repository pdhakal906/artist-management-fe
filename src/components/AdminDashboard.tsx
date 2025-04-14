import React from 'react'
import CustomTab from './CustomTab';

interface AdminDashboardPropsType {
  children: React.ReactNode;
}

const AdminDashboard = () => {
  return (
    <div>
      <CustomTab />
    </div>
  )
}

export default AdminDashboard
