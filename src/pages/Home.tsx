import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-purple-500 text-3xl font-bold">Welcome 👋</h1>
      <p>This is a modern portfolio...</p>
    </motion.div>
  );
}

