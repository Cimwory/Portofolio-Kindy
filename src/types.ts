export type Language = 'en' | 'id';

export interface ProjectItem {
  id: string;
  title: {
    en: string;
    id: string;
  };
  subtitle: {
    en: string;
    id: string;
  };
  period: string;
  category: 'industrial' | 'agriculture' | 'automation' | 'embedded';
  description: {
    en: string;
    id: string;
  };
  keyFeatures: {
    en: string[];
    id: string[];
  };
  hardware: string[];
  protocols: string[];
  techStack: string[];
  metrics?: {
    label: { en: string; id: string };
    value: string;
  }[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: {
    en: string;
    id: string;
  };
  company: string;
  period: {
    en: string;
    id: string;
  };
  location: string;
  type: 'internship' | 'organization' | 'training';
  categoryLabel: {
    en: string;
    id: string;
  };
  description: {
    en: string;
    id: string;
  };
  achievements: {
    en: string[];
    id: string[];
  };
  skills: string[];
}

export interface SkillCategory {
  title: {
    en: string;
    id: string;
  };
  iconName: string;
  skills: {
    name: string;
    level: string;
    tags: string[];
  }[];
}

export interface TelemetryNode {
  id: string;
  name: string;
  badge: string;
  protocol: string;
  ipAddress: string;
  status: 'ONLINE' | 'ACTIVE' | 'TRANSMITTING';
  sensors: {
    key: string;
    label: string;
    value: number;
    unit: string;
    min: number;
    max: number;
    nominalRange: [number, number];
    status: 'NORMAL' | 'OPTIMAL' | 'WARNING';
    description: string;
  }[];
  actuators: {
    id: string;
    name: string;
    state: boolean;
    type: 'pump' | 'valve' | 'dosing' | 'relay';
  }[];
}
