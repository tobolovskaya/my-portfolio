import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import { FaRocket, FaPalette } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { MdComputer } from "react-icons/md";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              <MdComputer style={{ marginRight: "6px" }} />
              I specialize in building responsive, user-friendly web and mobile interfaces using modern technologies.
              <br />
              <br />
              <FaPalette style={{ marginRight: "6px" }} />
              I'm passionate about clean design, intuitive user experiences, and continuous learning in the tech industry.
              <br />
              <br />
              <GoLocation style={{ marginRight: "6px" }} />
              Based in <b className="purple">Norway</b> | Open to <b className="purple">remote opportunities</b> and collaborations.
              <br />
              <br />
              <FaRocket style={{ marginRight: "6px" }} />
              Looking forward to connecting and exploring the tech world together!
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
