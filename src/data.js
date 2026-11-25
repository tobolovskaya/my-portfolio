import travelTrucks from "./assets/projects/TravelTrucks.webp";
import foodies from "./assets/projects/foodies.webp";
import energy from "./assets/projects/energy.webp";
import english from "./assets/projects/English-Website.webp";

export const links = {
  github: "https://github.com/tobolovskaya",
  linkedin: "https://www.linkedin.com/in/yevheniia-tobolovska",
  platform: "https://github.com/tobolovskaya/my-microservice-project",
};

export const tracks = [
  {
    no: "01",
    title: "IT Operations & Security",
    text: "Microsoft 365, Entra ID, Intune and Autopilot in daily operations. Cloud infrastructure as code, hardened and checked in CI.",
  },
  {
    no: "02",
    title: "Front-End & Mobile",
    text: "React and React Native apps with real payments and sign-in, and websites that pull live data from APIs.",
  },
  {
    no: "03",
    title: "UX/UI",
    text: "Interfaces designed in Figma, mobile first, built so people understand them without a manual.",
  },
];

/* Real pull requests in tobolovskaya/my-microservice-project */
export const hardeningLog = [
  {
    pr: 8,
    title: "fix: make Terraform configuration valid",
    why: "The project did not pass terraform validate. Fixed module paths, HCL syntax and deprecated arguments.",
    tag: "terraform validate ✓",
  },
  {
    pr: 9,
    title: "ci: add Terraform fmt, validate and Checkov workflow",
    why: "Every push is now formatted, validated and scanned for misconfigurations before review.",
    tag: "GitHub Actions",
  },
  {
    pr: 10,
    title: "security(eks): private API endpoint and KMS encryption for secrets",
    why: "The Kubernetes API was reachable from 0.0.0.0/0. Now private by default, and secrets are encrypted with a dedicated KMS key.",
    tag: "CKV_AWS_38 · 39 · 58",
  },
  {
    pr: 11,
    title: "security(rds,s3): enforce TLS, safer query logging, protect access-logs bucket",
    why: "Database rejects unencrypted connections. Query logging no longer writes passwords to logs. The log bucket is private and versioned.",
    tag: "CKV2_AWS_6 · CKV_AWS_21",
  },
  {
    pr: 12,
    title: "security(eks): Kubernetes 1.35, AL2023 nodes, remove custom user_data",
    why: "Moved off an unsupported Kubernetes version. Removed a node script that piped curl into bash and added SSH keys.",
    tag: "CKV_AWS_339",
  },
  {
    pr: 13,
    title: "security(eks): IMDS hop limit 1, remove EBS CSI policy from node role",
    why: "Pods can no longer reach instance metadata and steal node credentials. Node role keeps only what nodes need.",
    tag: "CKV_AWS_341",
  },
  {
    pr: 14,
    title: "security(jenkins): IRSA role for build agents with ECR push to one repository",
    why: "Build agents get short-lived credentials for exactly one registry, instead of borrowing the node's role.",
    tag: "least privilege",
  },
];

export const labs = [
  {
    title: "CI/CD pipeline with security gates",
    repo: "https://github.com/tobolovskaya/CICD_DevSecOps",
    text: "GitLab pipeline for a Flask API that fails fast: secret scanning, SAST, tests, SCA and DAST stages around build and deploy.",
    tools: ["GitLab CI", "SAST", "SCA", "DAST", "Python"],
  },
  {
    title: "Dockerfile security analysis",
    repo: "https://github.com/tobolovskaya/Dockerfile-GitLab-CI-CD",
    text: "An insecure and a hardened Dockerfile side by side, scanned in CI, with a written comparison and security checklist.",
    tools: ["Hadolint", "Dockle", "Trivy"],
  },
  {
    title: "REST API assessment: OWASP Juice Shop",
    repo: "https://github.com/tobolovskaya/REST-API-OWASP-Juice-Shop",
    text: "Five API vulnerabilities found and documented, including IDOR, SQL injection and mass assignment, mapped to STRIDE and CWE.",
    tools: ["OWASP API Top 10", "Postman", "JWT", "STRIDE"],
  },
  {
    title: "Cryptography configuration review",
    repo: "https://github.com/tobolovskaya/secure_dz5",
    text: "Found and fixed dangerous crypto settings: unsigned JWTs, SHA-1 password hashing, fixed IVs and tokens that never expire.",
    tools: ["JWT", "Argon2id", "AES-GCM", "YAML"],
  },
  {
    title: "Secure architecture review",
    repo: "https://github.com/tobolovskaya/secure-arch-lab",
    text: "Architecture report for a FastAPI service: what scanners miss and why, with fixes for typing, validation and deployment.",
    tools: ["FastAPI", "Semgrep", "Kubernetes", "Terraform"],
  },
];

export const builds = [
  {
    kind: "Mobile app",
    title: "Freight marketplace",
    text: "Connects people and businesses who need something moved with carriers. Stripe payments, Vipps and Google sign-in.",
    stack: "React Native · Expo · Stripe",
  },
  {
    kind: "Learning app",
    title: "Driving theory test practice",
    text: "Practice by topic and traffic sign, built to help people pass the Norwegian theory test on the first try.",
    stack: "React Native · Expo",
  },
  {
    kind: "Web platform",
    title: "A guide to life in Norway",
    text: "Public holidays and flag days, weather, courses, AI tools, a moving guide and practical articles in one place.",
    stack: "Web · Content · AI tools",
  },
  {
    kind: "Website",
    title: "Energy company website",
    text: "WordPress site with REST API integrations that show live electricity price data.",
    stack: "WordPress · REST APIs",
  },
];

export const frontEnd = [
  {
    title: "TravelTrucks",
    text: "Camper rental app: browse, filter by criteria and open details for each vehicle.",
    img: travelTrucks,
    repo: "https://github.com/tobolovskaya/TravelTrucks",
    demo: "https://travel-trucks-red-six.vercel.app/",
  },
  {
    title: "Foodies",
    text: "Recipe platform to discover, create, save and share recipes.",
    img: foodies,
    repo: "https://github.com/tobolovskaya/foodies-app",
  },
  {
    title: "Your Energy",
    text: "Track energy consumption and production, with goals and insights into usage patterns.",
    img: energy,
    repo: "https://github.com/tobolovskaya/your-energy",
  },
  {
    title: "English Website",
    text: "Learning site with articles, exercises and quizzes for every level.",
    img: english,
    repo: "https://github.com/tobolovskaya/English-Website",
    demo: "https://tobolovskaya.github.io/English-Website/",
  },
];

export const skills = [
  {
    group: "Operations",
    items: ["Microsoft 365", "Entra ID", "Intune", "Autopilot", "Conditional Access", "Windows imaging", "User support"],
  },
  {
    group: "Cloud & Security",
    items: ["AWS", "EKS", "IAM / IRSA", "KMS", "Terraform", "Kubernetes", "Helm", "Checkov", "gitleaks", "GitHub Actions", "Jenkins", "Argo CD"],
  },
  {
    group: "Development",
    items: ["JavaScript", "TypeScript", "React", "React Native", "Expo", "Redux", "WordPress", "REST APIs", "Python"],
  },
  {
    group: "Design & Data",
    items: ["Figma", "Adobe", "Mobile-first UX", "Power BI"],
  },
];
