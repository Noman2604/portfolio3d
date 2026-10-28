export interface SocialLinks {
  github: string;
  linkedin: string;
}

export interface CTA {
  label: string;
  href: string;
}

export interface HeroContent {
  headline: string;
  sub: string;
  ctas: CTA[];
  chips: string[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AboutContent {
  title: string;
  body: string[];
  stats: StatItem[];
}

export interface FeaturedProject {
  title: string;
  repo: string;
  desc: string;
  stack: string[];
  features: string[];
}

export interface ProjectItem {
  name: string;
  desc: string;
  stack: string[];
  href: string;
}

export interface ExperienceItem {
  period: string;
  title: string;
  org: string;
  desc: string;
  skills?: string[];
}

export interface ContactContent {
  title: string;
  body: string;
}

export interface SiteContent {
  name: string;
  shortName: string;
  role: string;
  status: string;
  email: string;
  socials: SocialLinks;
  nav: string[];
  hero: HeroContent;
  about: AboutContent;
  skills: Record<string, string[]>;
  skillsMeta: {
    title: string;
    sub: string;
  };
  featured: FeaturedProject;
  projects: ProjectItem[];
  experience: ExperienceItem[];
  contact: ContactContent;
}

export const content: SiteContent = {
  name: "Noman Patel",
  shortName: "Noman",
  role: "Full-Stack Developer",
  status: "Available for full-time.",
  email: "nomanpatel07059@gmail.com",
  socials: {
    github: "https://github.com/Noman2604",
    linkedin: "https://linkedin.com/in/noman-patel",
  },
  nav: ["About", "Skills", "Projects", "Experience", "Resume", "Contact"],
  hero: {
    headline: "Full-stack developer building practical web applications with Next.js, TypeScript, and MongoDB.",
    sub: "I build responsive web software with structured component architectures, secure REST APIs, and clean data modeling. Experienced in building exam engines, dashboards, and SaaS prototypes.",
    ctas: [
      { label: "View Projects", href: "#projects" },
      { label: "Contact Me", href: "#contact" },
    ],
    chips: ["Next.js 15", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
  },
  about: {
    title: "Engineering software with clean structure, reliable APIs, and maintainable code.",
    body: [
      "I am a full-stack developer with experience shipping end-to-end web applications using Next.js, TypeScript, React, and MongoDB.",
      "Currently working as a Full-Stack Intern at Autowhat.ai, building scalable backend services and REST APIs. Previously at Saiket Systems where I designed and delivered production apps including the AptiCore exam platform, an expense tracker, and management portals.",
      "Graduated with a B.Sc in Information Technology with an 8.23 / 10 CGPI, grounded in core database design, operating systems, and object-oriented software engineering.",
    ],
    stats: [
      { value: "7+", label: "Completed Projects" },
      { value: "2", label: "Industry Internships" },
      { value: "12+", label: "Technologies in Production" },
      { value: "8.23 / 10", label: "B.Sc IT CGPI" },
    ],
  },
  skills: {
    Frontend: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "HTML5 / CSS3", "Shadcn UI", "Three.js / WebGL"],
    "Backend & APIs": ["Node.js", "Next.js API Routes", "REST APIs", "Role-Based Access Control", "JWT Authentication"],
    "Database & Modeling": ["MongoDB", "Mongoose", "Schema Design", "Aggregation Pipelines"],
    "Tools & Workflow": ["Git", "GitHub", "Vercel", "Postman", "VS Code", "Gemini API"],
  },
  skillsMeta: {
    title: "Technical Stack",
    sub: "Core technologies and libraries used across production codebases.",
  },
  featured: {
    title: "AptiCore — Aptitude Preparation & Testing Platform",
    repo: "https://github.com/Noman2604/AptiCore",
    desc: "A full-stack examination and practice platform for students preparing for campus placement aptitude exams, featuring timed test sessions, anti-cheat visibility tracking, user dashboards, and role-based test administration.",
    stack: ["Next.js 15", "TypeScript", "MongoDB", "Tailwind CSS", "Shadcn UI", "JWT Authentication", "REST APIs"],
    features: [
      "Assessment engine with randomized question sets, timed countdowns, and tab-switch detection",
      "User dashboard with historical test performance analytics, category scores, and review summaries",
      "Administrative portal for creating questions, organizing question banks, and monitoring student scores",
      "XP progression and leaderboard system driving daily practice consistency",
    ],
  },
  projects: [
    {
      name: "Logistics & Gate Management Platform",
      desc: "Full-stack supply chain and gate operations system for creating shipments, generating gate passes, verifying shipping documentation, and tracking dock movements.",
      stack: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
      href: "https://github.com/Noman2604/Logistics-Gate-Management",
    },
    {
      name: "Course Selling Platform",
      desc: "E-learning platform allowing instructors to manage curricula and students to enroll, track progress, and complete payments via Stripe.",
      stack: ["Next.js", "TypeScript", "MongoDB", "Stripe"],
      href: "https://github.com/Noman2604/Course-Selling-Platform",
    },
    {
      name: "Chatbot Nova",
      desc: "Conversational interface integrating the Google Gemini API with context-aware session handling and markdown rendering.",
      stack: ["Next.js", "JavaScript", "Gemini API", "Tailwind CSS"],
      href: "https://github.com/Noman2604/Chatbot-Nova",
    },
    {
      name: "Expense Tracker",
      desc: "Personal finance and cashflow application with categorized expense logging, monthly breakdowns, and tabular export.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
      href: "https://github.com/Noman2604/expence-tracer",
    },
    {
      name: "Hospital Management System",
      desc: "Healthcare portal supporting patient record management, appointment bookings, doctor schedules, and department logs.",
      stack: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
      href: "https://github.com/Noman2604/Hospital-Management-System",
    },
    {
      name: "Library Management System",
      desc: "Inventory and circulation system for book cataloging, borrowing schedules, member cards, and overdue fines.",
      stack: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
      href: "https://github.com/Noman2604/Library-Management-System",
    },
    {
      name: "Portfolio Architecture",
      desc: "Minimal, performant personal portfolio built with Next.js, clean semantic typography, and WebGL accents.",
      stack: ["Next.js", "TypeScript", "Tailwind CSS"],
      href: "https://github.com/Noman2604/portfolio3d",
    },
  ],
  experience: [
    {
      period: "Aug 2026 – Present",
      title: "Full-Stack Next.js Intern",
      org: "Autowhat.ai",
      desc: "Developing backend services, authenticated REST APIs, and full-stack interfaces in Next.js, Node.js, and TypeScript.",
      skills: ["Next.js 15", "TypeScript", "Node.js", "REST APIs", "Microservices"],
    },
    {
      period: "May 2026 – Jun 2026",
      title: "Full-Stack Developer",
      org: "Saiket Systems",
      desc: "Engineered core modules for AptiCore, financial tracker applications, and client management dashboards with reusable component architectures.",
      skills: ["Next.js", "TypeScript", "AptiCore", "State Architecture", "Dashboards"],
    },
    {
      period: "2023 – 2026",
      title: "B.Sc in Information Technology",
      org: "University",
      desc: "Graduated with 8.23 / 10 CGPI. Core curriculum covered software architecture, database management, computer networks, and algorithms.",
      skills: ["8.23 / 10 CGPI", "Data Structures", "Database Systems", "Software Architecture"],
    },
  ],
  contact: {
    title: "Get in touch",
    body: "Available for full-time engineering positions, internships, and freelance projects. Reach out via email or connect on LinkedIn and GitHub.",
  },
};
