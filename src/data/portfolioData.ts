export type ProjectCategory = "frontend" | "backend" | "fullstack";

export interface Project {
  category: ProjectCategory;
  slug: string;
  name: string;
  subtitle: string;
  shortDescription: string;
  overview: string;
  screenshot: string;
  screenshotWidth: number;
  screenshotHeight: number;
  mainStack: string[];
  supportedFeatures: string[];
  challengeAndApproach: string;
  potentialImprovements: string[];
  liveUrl: string;
  repoUrl: string;
  verificationNote: string;
}

export interface SkillCategory {
  title: string;
  contextNote?: string;
  skills: {
    name: string;
    icon: string;
    description?: string;
  }[];
}

export const PERSONAL_INFO = {
  name: "Foysal Hossien",
  designation: "Full Stack Web Developer",
  location: "Dhaka, Bangladesh",
  availability: "Open to jobs and internships",
  email: "foysalhossien77@gmail.com",
  phoneDisplay: "+880 1880 975734",
  phoneLink: "tel:+8801880975734",
  whatsappUrl: "https://wa.me/8801880975734",
  githubUrl: "https://github.com/foysaliio",
  linkedinUrl: "https://www.linkedin.com/in/foysaliio/",
  portrait: "/foysal_hossien.png",
  resumePath: "/Foysal_Hossien_MERN_Stack_Developer_CV.pdf",
  resumeDownloadName: "Foysal_Hossien_MERN_Stack_Developer_CV.pdf",
  heroIntroduction:
    "I build web apps with React and Next.js. Right now, I’m getting deeper into backend development and databases so I can build the features behind the interface too.",
  aboutParagraphs: [
    "My interest in software started when I was younger. Someone from my neighborhood worked as a game developer, and seeing what he did made me want to become a software engineer.",
    "I started learning programming around 2021. There were interruptions, and I lost consistency more than once. In 2026, I returned with a clearer direction and a commitment to keep building.",
    "I’ve learned through YouTube, Udemy, freeCodeCamp, MDN, W3Schools, Stack Overflow, and offline courses in Bangladesh. Building projects has helped me connect what I study with problems I can actually solve.",
    "I enjoy working on useful web apps. My long term goal is to build a SaaS product and grow a company around something that makes everyday life easier for thousands of people.",
    "Outside programming, I like traveling, reading, playing sports, and exploring new technology.",
  ],
  education: {
    degree: "Diploma in Engineering",
    technology: "Electronics Technology",
    institution: "Dhaka Polytechnic Institute",
    period: "2021 to 2025",
    cgpa: "CGPA: 3.41 out of 4.00",
  },
  contactIntro:
    "Have a role or internship in mind? I’d be happy to hear about it.",
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    contextNote:
      "Core technologies for creating accessible, responsive user interfaces",
    skills: [
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
    ],
  },
  {
    title: "Backend and Database",
    contextNote:
      "Current learning focus with hands-on project experience in MongoDB",
    skills: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "express" },
      { name: "MongoDB", icon: "mongodb" },
    ],
  },
  {
    title: "Tools",
    contextNote:
      "Development workflow and productivity tools supporting daily programming",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Figma", icon: "figma" },
      { name: "VS Code", icon: "vscode" },
      { name: "Postman", icon: "postman" },
      { name: "Antigravity", icon: "terminal" },
      { name: "Codex", icon: "bot" },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "bazar-dor",
    category: "fullstack",
    name: "Bazar Dor",
    subtitle: "Bengali Market Price Tracker & Comparison Platform",
    shortDescription:
      "A Bengali market price app for browsing everyday products, comparing prices across markets, and checking price changes.",
    overview:
      "Bazar Dor is a localized daily commodity and grocery price tracking platform designed for consumers in Bangladesh. It aggregates everyday staple goods, displays live price shifts in native Bengali typography and numerals, enables market-to-market comparisons, and provides protected product details backed by secure session authentication.",
    screenshot: "/projects/bazar-dor.png",
    screenshotWidth: 1280,
    screenshotHeight: 800,
    mainStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Better Auth",
      "MongoDB Atlas",
    ],
    supportedFeatures: [
      "Essential daily grocery product listings fetched via API",
      "Native Bengali date presentation and localized numeral formatting",
      "Category-based browsing with dedicated category routes",
      "Price sorting from low-to-high and high-to-low",
      "Market-wise price comparison with min, max, and average indicators",
      "Email/password, Google, and GitHub social login through Better Auth",
      "Protected product detail routes requiring authenticated user session",
      "User profile management with persistence in MongoDB Atlas",
    ],
    challengeAndApproach:
      "Getting authentication and the database connection working together took the most effort. Protected routes were another difficult part. I broke the problems into smaller pieces and worked through them one at a time until the flow started working.",
    potentialImprovements: [
      "Saved products collection for quick access to frequent groceries",
      "Automated price change alerts and notifications when costs fluctuate",
    ],
    liveUrl: "https://bazardor-market.vercel.app/",
    repoUrl: "https://github.com/foysaliio/bazar_dor",
    verificationNote:
      "Repository code and architecture verified. Live application running on Vercel.",
  },
  {
    slug: "fitlog",
    category: "frontend",
    name: "FitLog",
    subtitle: "Workout Library & Personal Training Planner",
    shortDescription:
      "A workout library and planner for finding exercises, organizing a daily plan, and saving workouts for later.",
    overview:
      "FitLog is a focused fitness planner that assists users in discovering exercises by muscle group or name, reviewing structured instructions, and creating an organized daily routine. It maintains workout persistence across page refreshes and enforces predictable interaction constraints.",
    screenshot: "/projects/fitlog.png",
    screenshotWidth: 1280,
    screenshotHeight: 800,
    mainStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "React Context",
      "localStorage",
    ],
    supportedFeatures: [
      "Workout library search by exercise title and target muscle groups",
      "Dynamic workout detail routes with equipment, sets, reps, and instructions",
      "Today's Plan builder with a disciplined five workout daily limit",
      "Independent Saved Workouts collection without daily restrictions",
      "Live exercise count, session duration, and estimated calorie statistics",
      "Multi-criteria workout sorting by duration, calories, and user rating",
      "Mark-as-done workout tracking for completed training items",
      "Persistent plan, saved list, and completion status stored in localStorage",
    ],
    challengeAndApproach:
      "Keeping the daily plan, saved workouts, and completed exercises consistent is a central challenge in this app. React Context manages the shared state, and localStorage keeps the selections after a refresh. Duplicate checks and the daily plan limit help keep the interactions predictable.",
    potentialImprovements: [
      "User accounts with workout plans synced across multiple devices in the cloud",
      "Custom routine builder and personal exercise history charts",
    ],
    liveUrl: "https://fitlog-fit.vercel.app/",
    repoUrl: "https://github.com/foysaliio/fitlog",
    verificationNote:
      "Repository implementation verified. Live application running on Vercel.",
  },
  {
    slug: "dev-stack",
    category: "frontend",
    name: "Dev Stack",
    subtitle: "Interactive Technology Explorer & Stack Builder",
    shortDescription:
      "An interactive technology explorer where users can browse development tools and build their own stack.",
    overview:
      "Dev Stack is an interactive catalog application where developers browse web technologies, inspect framework classifications and ratings, and dynamically assemble custom tech stacks with instant sidebar updates and visual action feedback.",
    screenshot: "/projects/dev-stack.png",
    screenshotWidth: 3512,
    screenshotHeight: 4562,
    mainStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "React Toastify",
      "Vite",
    ],
    supportedFeatures: [
      "Curated technology catalog loaded from structured JSON data",
      "Responsive card grid displaying category badges, ratings, and descriptions",
      "Interactive sidebar panel showing selected technologies and dynamic counts",
      "Duplicate selection prevention with live button feedback",
      "Single technology removal and one-click stack clearing",
      "Visual action notifications via React Toastify feedback alerts",
    ],
    challengeAndApproach:
      "The main interaction challenge is keeping the technology cards and selection panel in sync. Shared React state connects the two, while selection checks prevent duplicates and keep the count and button states consistent.",
    potentialImprovements: [
      "Persist selected stacks across sessions",
      "Generate shareable stack links to share custom configurations with others",
    ],
    liveUrl: "https://dev-staaack.vercel.app/",
    repoUrl: "https://github.com/foysaliio/Dev-Stack",
    verificationNote:
      "Repository implementation and desktop preview verified. Live application running on Vercel.",
  },
];
