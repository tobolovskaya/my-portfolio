import { Code, Database, Layout, Terminal, Cpu, Palette } from "lucide-react";
import {
  SiJavascript,
  SiPython,
  SiTypescript,
  SiHtml5,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiGit,
  SiFigma,
  SiReactrouter,
  SiPostman,
  SiScrumalliance,
} from "react-icons/si";


export const skillCategories = [
  {
    name: "Programming Languages",
    icon: Terminal,
    skills: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "Python", icon: SiPython },
      { name: "TypeScript", icon: SiTypescript },
      { name: "HTML/CSS", icon: SiHtml5 },
    ],
  },
  {
    name: "Frontend Development",
    icon: Layout,
    skills: [
      { name: "React", icon: SiReact },
      { name: "React Native", icon: SiReactrouter },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    name: "Backend Development",
    icon: Code,
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "REST APIs", icon: SiPostman },
    ],
  },
  {
    name: "Databases",
    icon: Database,
    skills: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "MySQL", icon: SiMysql },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
  },
  {
    name: "Tools & Technologies",
    icon: Cpu,
    skills: [
      { name: "Git", icon: SiGit },
      { name: "Agile/Scrum", icon: SiScrumalliance },
    ],
  },
  {
    name: "Design",
    icon: Palette,
    skills: [
      { name: "Figma", icon: SiFigma },
      { name: "UI/UX Design" },
      { name: "Wireframing" },
    ],
  },
];
