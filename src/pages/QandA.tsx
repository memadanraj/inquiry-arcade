
import React from 'react';
import { motion } from 'framer-motion';
import QuestionList from '@/components/qa/QuestionList';

const QandA = () => {
  return (
    <div className="container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Questions & Answers</h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Ask questions, share your knowledge, and engage with other students in discussions about study topics.
          </p>
        </div>
        
        <QuestionList />
      </motion.div>
    </div>
  );
};

export default QandA;
