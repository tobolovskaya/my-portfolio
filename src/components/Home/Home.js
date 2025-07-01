import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import Developer from "./Developer";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> Yevheniia Tobolovska</strong>
              </h1>

                <p className="home-about-body">
                  Front-End & Full-Stack Developer
                  <br />
                  Web & UI/UX Design
                  <br />
                  Microsoft Intune & IT System Administration
                </p>

                <a href="#projects" aria-label="Go to projects section">
                  <button className="btn btn-outline-primary project-button">
                    View Projects
                  </button>
                </a>
                
            </Col>
            
            <Col md={5} style={{ paddingBottom: 20 }}>
            <Developer/>

            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
