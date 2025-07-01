import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function ViewProjectsButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Navigating to /project");
    navigate("/project");
  };

  return (
    <div style={{ zIndex: 10, position: "relative" }}>
    <Button
      variant="primary"
      onClick={handleClick}
      aria-label="Go to projects section"
      style={{
        minWidth: "150px",
        padding: "10px 20px",
        textDecoration: "none",
      }}
    >
      View Projects
    </Button>
    </div>
  );
}

export default ViewProjectsButton;
