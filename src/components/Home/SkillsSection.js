import React from "react";
import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { skillCategories } from "./SkillCategories";

// React Icons
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiPython,
  DiGit,
  DiJava,
} from "react-icons/di";
import {
  SiRedis,
  SiFirebase,
  SiNextdotjs,
  SiSolidity,
  SiPostgresql,
} from "react-icons/si";
import { TbBrandGolang } from "react-icons/tb";

// Icon list for bottom section
const icons = [
  { icon: <DiJavascript1 />, name: "JavaScript" },
  { icon: <TbBrandGolang />, name: "Go" },
  { icon: <DiNodejs />, name: "Node.js" },
  { icon: <DiReact />, name: "React" },
  { icon: <SiSolidity />, name: "Solidity" },
  { icon: <DiMongodb />, name: "MongoDB" },
  { icon: <SiNextdotjs />, name: "Next.js" },
  { icon: <DiGit />, name: "Git" },
  { icon: <SiFirebase />, name: "Firebase" },
  { icon: <SiRedis />, name: "Redis" },
  { icon: <SiPostgresql />, name: "PostgreSQL" },
  { icon: <DiPython />, name: "Python" },
  { icon: <DiJava />, name: "Java" },
];

function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
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

        <div className="w-full max-w-screen-xl mx-auto px-4 py-10">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {skillCategories.map((category) => (
              <motion.div
                key={category.name}
                className="bg-card rounded-lg p-6 shadow-sm border border-border hover:border-primary/20 transition-colors"
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="p-2 bg-primary/10 text-primary rounded-md"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    <category.icon className="h-5 w-5" />
                  </motion.div>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </div>

                <motion.div
                  className="flex flex-wrap gap-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className="inline-block px-3 py-1 bg-background border border-border rounded-full text-sm"
                      variants={skillItemVariants}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(128, 90, 213, 0.05)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          {icons.map((tech, index) => (
            <Col
              xs={4}
              md={2}
              key={index}
              className="tech-icons"
              title={tech.name}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {tech.icon}
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default SkillsSection;
