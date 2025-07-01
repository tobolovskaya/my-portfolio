import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Front-End & Full-Stack Developer",
          "Freelancer",
          "Web & UI/UX Design",
          "Microsoft Intune & IT System Administration",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
