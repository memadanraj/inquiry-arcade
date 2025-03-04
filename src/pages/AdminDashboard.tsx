
import React from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminDashboard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto py-8"
    >
      <AdminLayout />
    </motion.div>
  );
};

export default AdminDashboard;
