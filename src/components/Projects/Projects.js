import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import energy from "../../Assets/Projects/energy.png";
import BMICalculator from "../../Assets/Projects/BMICalculator.png";
import foodies from "../../Assets/Projects/foodies.png";
import TravelTrucks from "../../Assets/Projects/TravelTrucks.png";
import calculator from "../../Assets/Projects/calculator.png";
import EnglishWebsite from "../../Assets/Projects/English-Website.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={TravelTrucks}
              isBlog={false}
              title="TravelTrucks"
              description="TravelTrucks is a web application for renting campers, allowing users to browse all available vehicles, filter by specific criteria, and view detailed information for each camper."
              ghLink="https://github.com/tobolovskaya/TravelTrucks"
              demoLink="https://travel-trucks-red-six.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={EnglishWebsite}
              isBlog={false}
              title="English-Website"
              description="This is a website for learning English. It includes a variety of resources such as articles, exercises, and quizzes to help users improve their English language skills. The website is designed to be user-friendly and accessible, making it easy for learners of all levels to navigate and find the materials they need."
              ghLink="https://github.com/tobolovskaya/English-Website"
              demoLink="https://tobolovskaya.github.io/English-Website/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={foodies}
              isBlog={false}
              title="Foodies-App"
              description="Foodies is a full-featured platform for culinary enthusiasts, empowering users to discover, create, save, and share delicious recipes. Whether you're a home cook or a professional chef, Foodies brings the culinary community together. 
              The platform is structured into two separate repositories:
backend/ REST API server with authentication, PostgreSQL database, and media uploads;
frontend/ Modern SPA with intuitive UI, animations, and responsive design. "
              ghLink="https://github.com/tobolovskaya/foodies-app"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={energy}
              isBlog={false}
              title="Your Energy"
              description="Your Energy is a web application that allows users to track their energy consumption and production, providing insights into their energy usage patterns. The app features a user-friendly interface for monitoring energy data, setting goals, and receiving recommendations for optimizing energy efficiency."
              ghLink="https://github.com/tobolovskaya/your-energy"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={calculator}
              isBlog={false}
              title="Calculator"
              description="Modern Calculator with History. This is a modern calculator built with HTML, CSS, and JavaScript."
              ghLink="https://github.com/tobolovskaya/Calculator"
              demoLink="https://tobolovskaya.github.io/Calculator/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={BMICalculator}
              isBlog={false}
              title="Advanced BMI Calculator"
              description="This is a modern BMI Calculator built using:
                    HTML — for structuring the form and layout
                    CSS — for styling, dark mode, and responsive design
                    JavaScript — for BMI calculation logic and dynamic UI updates
                    Theme Toggle — switch between light and dark modes
                    BMI Scale — colorful horizontal indicator for BMI categories
                    History Log — stores previous calculations in a scrollable list"
              ghLink="https://github.com/tobolovskaya/BMI-Calculator"
              demoLink="https://tobolovskaya.github.io/BMI-Calculator/"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
