import React from "react";
import { motion } from "framer-motion";

const Developer = ({
  name = "Yevheniia Tobolovska",
  skills = ["React.js", "Python", "TypeScript"],
  focuses = ["Front-End", "Full-Stack", "UI/UX"],
  learning = "Always",
}) => {
  return (
    <motion.div
      className="developer-container"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
    >
      <motion.div
        className="developer-glow"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="developer-card" role="region" aria-label="Developer code block">
        <div className="developer-header">
          <div className="dev-dots">
            <span className="dev-dot red" />
            <span className="dev-dot yellow" />
            <span className="dev-dot green" />
          </div>
          <span className="dev-title">developer.js</span>
        </div>

        <pre className="dev-code">
          <span className="dev-comment">// Software Engineer</span>{"\n"}
          <span className="dev-const">const</span>{" "}
          <span className="dev-name">developer</span> = {"{"}
          {"\n"}
          &nbsp;&nbsp;<span className="dev-key">name</span>:{" "}
          <span className="dev-string">'{name}'</span>,{"\n"}
          &nbsp;&nbsp;<span className="dev-key">skills</span>: [<span className="dev-string">'{skills.join("', '")}'</span>],{"\n"}
          &nbsp;&nbsp;<span className="dev-key">focuses</span>: [<span className="dev-string">'{focuses.join("', '")}'</span>],{"\n"}
          &nbsp;&nbsp;<span className="dev-key">learning</span>:{" "}
          <span className="dev-string">'{learning}'</span>
          {"\n"}
          {"};"}
        </pre>
      </div>
    </motion.div>
  );
};

export default Developer;
