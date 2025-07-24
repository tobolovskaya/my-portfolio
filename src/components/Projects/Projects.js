import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import energy from "../../Assets/Projects/energy.png";
import emotion from "../../Assets/Projects/emotion.png";
import foodies from "../../Assets/Projects/foodies.png";
import TravelTrucks from "../../Assets/Projects/TravelTrucks.png";
import suicide from "../../Assets/Projects/suicide.png";
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
              imgPath={suicide}
              isBlog={false}
              title="Ai For Social Good"
              description="Using 'Natural Launguage Processing' for the detection of suicide-related posts and user's suicide ideation in cyberspace  and thus helping in sucide prevention."
              ghLink="https://github.com/soumyajit4419/AI_For_Social_Good"
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
              title="Face Recognition and Emotion Detection"
              description="Trained a CNN classifier using 'FER-2013 dataset' with Keras and tensorflow backened. The classifier sucessfully predicted the various types of emotions of human. And the highest accuracy obtained with the model was 60.1%.
              Then used Open-CV to detect the face in an image and then pass the face to the classifer to predict the emotion of a person."
              ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
              // demoLink="https://blogs.soumya-jit.tech/"      <--------Please include a demo link here 
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
