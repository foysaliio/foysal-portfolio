import type { IconType } from "react-icons";
import {
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiGithub,
  SiFigma,
  SiPostman,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { FiTerminal, FiCpu, FiCode } from "react-icons/fi";

type TechIconProps = {
  name: string;
  className?: string;
};

const icons: Record<string, IconType> = {
  html: SiHtml5,
  html5: SiHtml5,
  css: FaCss3Alt,
  css3: FaCss3Alt,
  javascript: SiJavascript,
  js: SiJavascript,
  typescript: SiTypescript,
  ts: SiTypescript,
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  react: SiReact,
  reactjs: SiReact,
  next: SiNextdotjs,
  nextjs: SiNextdotjs,
  node: SiNodedotjs,
  nodejs: SiNodedotjs,
  express: SiExpress,
  expressjs: SiExpress,
  mongodb: SiMongodb,
  mongodbatlas: SiMongodb,
  git: SiGit,
  github: SiGithub,
  figma: SiFigma,
  vscode: VscVscode,
  visualstudiocode: VscVscode,
  postman: SiPostman,
  terminal: FiTerminal,
  antigravity: FiTerminal,
  bot: FiCpu,
  codex: FiCpu,
};

export function TechIcon({ name, className = "w-6 h-6" }: TechIconProps) {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const Icon = icons[key] ?? FiCode;

  return <Icon className={className} aria-hidden="true" focusable="false" />;
}
