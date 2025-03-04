
import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import ResultsList from '@/components/profile/activity/ResultsList';

const Results = () => {
  return (
    <div className="container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Exam Results</h1>
          <p className="text-muted-foreground">
            View and download your academic performance records
          </p>
        </div>
        
        <GlassCard className="p-6">
          <ResultsList />
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Results;
