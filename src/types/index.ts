export interface ProjectFrontmatter {
  title: string;
  description: string;
  role: string;
  date: string;
  featured: boolean;
  metrics?: string[];
  tech: string[];
  github?: string;
  live?: string;
  image?: string;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  tags: string[];
  draft: boolean;
  image?: string;
}
