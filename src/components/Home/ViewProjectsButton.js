
import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function ViewProjectsButton() {
  return (
    <Link to="/projects" style={{ textDecoration: "none" }}>
      <Button
        variant="primary"
        className="fork-btn-inner"
        aria-label="Go to projects section"
        style={{
          minWidth: "150px",
          padding: "10px 20px",
          fontSize: "1rem",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
        }}
      >
        View Projects
      </Button>
    </Link>
  );
}

export default ViewProjectsButton;
