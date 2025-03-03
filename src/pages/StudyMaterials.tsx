
import React from 'react';
import { motion } from 'framer-motion';
import StudyMaterialsList from '@/components/study/StudyMaterialsList';

const StudyMaterials = () => {
  return (
    <div className="container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Study Materials</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Browse through our comprehensive collection of notes, solutions, and exam questions organized by course and semester.
          </p>
        </div>
        
        <StudyMaterialsList />
      </motion.div>
    </div>
  );
};

export default StudyMaterials;
