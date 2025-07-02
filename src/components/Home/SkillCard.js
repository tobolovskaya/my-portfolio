import React from "react";
import { motion } from "framer-motion";

const skillItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

function SkillCard({ category, itemVariants, containerVariants }) {
  return (
    <motion.div
      className="bg-card rounded-lg p-4 shadow-sm border border-border w-100 hover:border-[#c084f5] transition-colors"
      variants={itemVariants}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="d-flex align-items-center gap-3 mb-3">
        <motion.div
          className="p-2 rounded-md"
          style={{ backgroundColor: "rgba(192, 132, 245, 0.1)", color: "#c084f5" }}
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <category.icon className="h-5 w-5" />
        </motion.div>
        <h3 className="text-lg font-semibold m-0">{category.name}</h3>
      </div>

      <motion.div
        className="d-flex flex-wrap gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {category.skills.map((skill) => (
          <motion.span
            key={skill}
            className="px-3 py-1 bg-background border border-border rounded-pill text-sm me-2 mb-2"
            variants={skillItemVariants}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(192, 132, 245, 0.05)", // Fixed color
            }}
            whileTap={{ scale: 0.98 }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default SkillCard;
