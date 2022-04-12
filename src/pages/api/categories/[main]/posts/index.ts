// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import blog from 'public/blog.json';

type Data = {
  ok: boolean;
  data?: {
    posts: Post[];
  };
  error?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method?.toUpperCase()) {
    case 'POST': {
      break;
    }
    case 'GET': {
      const { main } = req.query;

      if (blog) {
        const findCategory = blog.categories.find((category) => {
          return category.name === main;
        });
        if (findCategory) {
          const findPosts = blog.posts.filter((post) => {
            return post.category.main === main;
          });
          res.status(200).json({
            ok: true,
            data: { posts: findPosts as unknown as Post[] },
          });
        } else {
          res.status(404).json({
            ok: false,
            error: `Main Category (name: '${main}') not found.`,
          });
        }
      } else {
        res.status(503).json({
          ok: false,
          error: 'Blog data not initialized.',
        });
      }

      break;
    }
  }
}
