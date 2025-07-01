import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import { AiOutlineCheck } from "react-icons/ai";
import { FaRocket, FaPalette } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { MdComputer } from "react-icons/md";

import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

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
              🔧 <b className="purple">Tech stack:</b>
              <br />
              <AiOutlineCheck style={{ marginRight: "6px" }} /> HTML5, CSS3, JavaScript
              <br />
              <AiOutlineCheck style={{ marginRight: "6px" }} /> React, React Native, Redux
              <br />
              <AiOutlineCheck style={{ marginRight: "6px" }} /> Figma, Adobe (UI/UX design)
              <br />
              <AiOutlineCheck style={{ marginRight: "6px" }} /> Git, GitHub, REST APIs
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
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/soumyajit4419"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://twitter.com/Soumyajit4419"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/soumyajit4419/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/soumyajit4419"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
