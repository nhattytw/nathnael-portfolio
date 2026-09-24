import { generalData } from "@/lib/generalData";
import { experienceData } from "@/lib/experienceData";
import { projectData } from "@/lib/projectData";

/** Different spellings of the same skill across data files. */
const ALIASES: Record<string, string> = {
  react: "react.js",
  "react (vite)": "react.js",
  reactjs: "react.js",
  "vue": "vue.js",
  "rest api": "restful apis",
  "restful api": "restful apis",
  "jwt auth": "jwt",
  "socket.io": "websockets",
  "git/github": "git",
  github: "git",
  "material ui": "material-ui",
  "shadcn ui": "shadcn/ui",
  "ci/cd pipelines": "ci/cd",
  "javascript (es6+)": "javascript",
  "python 3": "python",
  pyqt5: "python",
  "reverse proxy": "nginx",
  "load balancing": "nginx",
  "technical proposals & bids": "proposal writing",
  "technical proposals": "proposal writing",
  "unit testing": "testing",
  "integration testing": "testing",
};

export function canonicalSkill(name: string): string {
  const key = name.trim().toLowerCase();
  return ALIASES[key] ?? key;
}

export interface SkillUsage {
  companies: string[];
  projects: { id: string; title: string }[];
}

/**
 * For every skill listed on the site, the distinct companies whose roles used it
 * and the distinct projects built with it.
 */
export function buildSkillUsage(): Map<string, SkillUsage> {
  const byCanonical = new Map<string, SkillUsage>();
  const entry = (key: string) => {
    if (!byCanonical.has(key)) byCanonical.set(key, { companies: [], projects: [] });
    return byCanonical.get(key)!;
  };

  for (const company of experienceData) {
    for (const role of company.roles) {
      for (const skill of role.skills) {
        const usage = entry(canonicalSkill(skill));
        if (!usage.companies.includes(company.company)) usage.companies.push(company.company);
      }
    }
  }

  for (const project of projectData) {
    for (const tech of project.technologies) {
      const usage = entry(canonicalSkill(tech));
      if (!usage.projects.some((p) => p.id === project.id)) {
        usage.projects.push({ id: project.id, title: project.title });
      }
    }
    // A project also counts for the company that delivered it.
    if (project.company) {
      for (const tech of project.technologies) {
        const usage = entry(canonicalSkill(tech));
        const company = experienceData.find((c) => c.company.startsWith(project.company!));
        if (company && !usage.companies.includes(company.company)) usage.companies.push(company.company);
      }
    }
  }

  const result = new Map<string, SkillUsage>();
  for (const skill of new Set(Object.values(generalData.skills).flat())) {
    result.set(skill, byCanonical.get(canonicalSkill(skill)) ?? { companies: [], projects: [] });
  }
  return result;
}
