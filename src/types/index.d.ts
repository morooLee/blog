interface Frontmatter {
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  coverImagePath: string | null;
  coverImageUrl: string | null;
  coverBackgroundColor: string | null;
  category: {
    main: string;
    sub: string;
  };
  tags: string[];
  series: {
    name: string;
    number: number;
  } | null;
  published: boolean;
}

interface BlogData {
  posts: Post[];
  categories: Category[];
  series: Series[];
  tags: Tag[];
}

type BlogDataType = Post | Tag | Category | Series;

interface Tag {
  name: string;
  postIds: number[];
}

interface Series {
  name: string;
  postIds: number[];
}

interface Category {
  name: string;
  parent: string | null;
  children: string[];
  postIds: number[];
}

interface Post {
  id: number;
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  coverImageUrl: string;
  category: {
    main: string;
    sub: string;
  };
  tags: string[];
  series: { name: string; number: number } | null;
  published: boolean;
}
