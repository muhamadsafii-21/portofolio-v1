export type Profile = {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar_url: string | null;
  email: string | null;
  github: string | null;
  linkedin: string | null;
  updated_at: string;
};

export type Skill = {
  id: string;
  category: string;
  name: string;
  order: number;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  tags: string[];
  link: string | null;
  repo: string | null;
  featured: boolean;
  order: number;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
};
