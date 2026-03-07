export interface Writing {
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  tags: string[];
  readTime: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}

export interface Recipe {
  title: string;
  slug: { current: string };
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  cuisine: string;
  difficulty: string;
  prepTime: number;
  cookTime: number;
  servings?: number;
  tags: string[];
  ingredients?: { quantity: string; unit: string; ingredient: string; notes?: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  instructions?: any;
  notes?: string;
}

export interface Rant {
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  tags: string[];
  readTime: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}

export interface Photo {
  title: string;
  slug: { current: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  location?: string;
  dateTaken?: string;
  description?: string;
  tags?: string[];
}
