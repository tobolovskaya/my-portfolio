import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";

function ViewProjectsButton() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="touch-target"
    >
      <Link to="/projects" style={{ textDecoration: "none" }}>
        <Button
          variant="primary"
          className="min-w-[120px] py-3 text-base"
          aria-label="Go to projects section"
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
          }}
        >
          View Projects
        </Button>
      </Link>
    </motion.div>
  );
}

export default ViewProjectsButton;
