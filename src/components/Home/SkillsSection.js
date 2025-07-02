import React from "react";
import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { skillCategories } from "./SkillCategories";
import SkillCard from "./SkillCard";

const SkillsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section id="skills">
      <div className="about-section">
        <motion.h2
          className="project-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </motion.h2>

        <motion.p
          className="home-about-body mb-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          I've worked with a range of technologies in the web development world,
          from frontend to backend and everything in between.
        </motion.p>

        <Row className="justify-content-center">
          {skillCategories.map((category) => (
            <Col
              key={category.name}
              xs={12}
              md={6}
              lg={4}
              className="mb-4 d-flex align-items-stretch"
            >
              <SkillCard
                category={category}
                itemVariants={itemVariants}
                containerVariants={containerVariants}
              />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default SkillsSection;
