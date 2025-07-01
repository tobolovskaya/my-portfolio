import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

function ViewProjectsButton() {
  return (
    <MotionButton
      as={Link}
      to="/projects"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      variant="primary"
      className="min-w-[120px] py-3 text-base view-projects-btn"
      aria-label="Go to projects section"
    >
      View Projects
    </MotionButton>
  );
}

export default ViewProjectsButton;
