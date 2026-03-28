export const getFeaturedProjects = <T extends { data: { featured?: boolean } }>(items: T[]) =>
  items.filter((item) => item.data.featured);

export const sortPostsByDateDesc = <T extends { data: { pubDate: Date } }>(items: T[]) =>
  [...items].sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
