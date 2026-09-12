// All the copy shown in the experience lives here.
// Placeholder text is marked — swap in your own words before shipping.

export type StationId = "about" | "project-apticore" | "project-uccops" | "skills" | "contact";

export interface StationContent {
  id: StationId;
  label: string; // shown on the HUD prompt + minimap
  position: [number, number, number]; // where the object sits in the room
  interactRadius: number; // how close the player must be to interact
}

export const stations: StationContent[] = [
  { id: "about", label: "About & Experience", position: [-8, 0, -3], interactRadius: 3.2 },
  { id: "project-apticore", label: "Project — AptiCore", position: [-3, 0, -8.5], interactRadius: 3 },
  { id: "project-uccops", label: "Projects & Repos", position: [3, 0, -8.5], interactRadius: 3 },
  { id: "skills", label: "Skills & Stack", position: [8, 0, -3], interactRadius: 3.2 },
  { id: "contact", label: "Contact", position: [0, 0, 8], interactRadius: 3 },
];

export const about = {
  name: "Noman Patel",
  title: "Full-Stack Developer",
  tagline: "I build full-stack products that feel fast, clear, and finished.",
  bio: [
    "I'm Noman Patel, a Full-Stack Developer focused on building modern web applications using Next.js, React, TypeScript, and MongoDB.",
    "From responsive user interfaces to secure backend APIs, I enjoy turning ideas into polished products that solve real problems with high performance and maintainable architecture.",
    "Whether it's an aptitude exam platform, an AI chatbot, an expense tracker, or a management system, I create experiences that people actually enjoy using.",
  ],
  stats: [
    { label: "Projects Completed", value: "10+" },
    { label: "Internships", value: "3" },
    { label: "Tech Mastered", value: "15+" },
    { label: "B.Sc IT CGPI", value: "8.23 / 10" },
  ],
  experience: [
    {
      role: "Full-Stack Next.js Intern",
      company: "Autowhat.ai",
      period: "August 2026 – Present",
      description:
        "Developing scalable backend microservices, robust REST APIs, and full-stack integrations utilizing Next.js, Node.js, and TypeScript architecture.",
    },
    {
      role: "Full-Stack Developer",
      company: "Saiket Systems",
      period: "May 2026 - June 2026",
      description:
        "Designing and building end-to-end apps with a focus on UX, reusable architecture, and clean handoff points using Next.js, React, TypeScript, MongoDB, Tailwind CSS, and Shadcn UI.",
    },
    {
      role: "Graduation — B.Sc IT",
      company: "University Degree",
      period: "2023 - 2026",
      description:
        "Bachelor of Science in Information Technology (CGPI: 8.23 / 10). Focused on software engineering, database management, and modern web application development.",
    },
  ],
};

export const projects = {
  apticore: {
    name: "AptiCore",
    subtitle: "Aptitude Test Platform",
    description:
      "A complete full-stack aptitude preparation platform designed for students to practice quantitative aptitude, logical reasoning, verbal ability, and programming questions with live performance analytics.",
    stack: ["Next.js 15", "TypeScript", "MongoDB", "Tailwind CSS", "Shadcn UI", "JWT Auth", "REST APIs"],
    highlights: [
      "Practice & assessment test engine with timed tests and anti-cheat guards",
      "User dashboard with progress tracking, test history, and score analytics",
      "Role-based admin management to manage questions, categories, and tests",
      "XP / streak gamification with live competitive leaderboards",
    ],
    github: "https://github.com/Noman2604/AptiCore",
    demo: "https://nomanpatel.vercel.app",
  },
  uccops: {
    name: "Featured Projects & Repos",
    subtitle: "Full-Stack & AI Showcase",
    description:
      "Collection of production-ready full-stack applications and open-source tools spanning AI conversational agents, financial dashboards, and management portals.",
    stack: ["Next.js 15", "TypeScript", "React", "MongoDB", "Tailwind CSS", "Gemini AI"],
    highlights: [
      "Chatbot Nova: AI conversational assistant powered by Google Gemini API",
      "Expense Tracker: Financial tracking dashboard with analytics and categorization",
      "Hospital & Library Management Systems: End-to-end RBAC administration portals",
    ],
    github: "https://github.com/Noman2604",
    demo: "https://nomanpatel.vercel.app",
    extraProjects: [
      {
        name: "Chatbot Nova",
        desc: "AI conversational assistant with Gemini API integration",
        link: "https://github.com/Noman2604/Chatbot-Nova",
        tech: ["Next.js", "Gemini API", "Tailwind CSS"],
      },
      {
        name: "Expense Tracker",
        desc: "Interactive financial dashboard for tracking income & expenses",
        link: "https://github.com/Noman2604/expence-tracer",
        tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        name: "Hospital Management",
        desc: "Secure patient, appointment, and doctor administration portal",
        link: "https://github.com/Noman2604/Hospital-Management-System",
        tech: ["Next.js", "TypeScript", "MongoDB"],
      },
      {
        name: "Library Management",
        desc: "Book borrowing, inventory catalog, and member tracking",
        link: "https://github.com/Noman2604/Library-Management-System",
        tech: ["Next.js", "TypeScript", "MongoDB"],
      },
    ],
  },
};

export const skills = {
  categories: [
    {
      label: "Frontend",
      items: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "Shadcn UI", "HTML5 / CSS3", "Three.js / R3F"],
    },
    {
      label: "Backend & APIs",
      items: ["Next.js API Routes", "Node.js", "REST APIs", "Auth & RBAC", "JWT Authentication"],
    },
    {
      label: "Database & Architecture",
      items: ["MongoDB", "Mongoose", "Schema Design", "Analytics Pipelines", "Aggregation"],
    },
    {
      label: "Tools & Integrations",
      items: ["Git", "GitHub", "Vercel", "Google Gemini API", "Postman", "VS Code"],
    },
  ],
};

export const contact = {
  email: "nomanpatel07059@gmail.com",
  github: "https://github.com/Noman2604",
  linkedin: "https://linkedin.com/in/noman-patel",
  portfolio: "https://nomanpatel.vercel.app",
};
