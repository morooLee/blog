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
      if (blog) {
        const { tag: tagName } = req.query;
        const findTag = blog.tags.find((tag) => {
          return tag.name === tagName;
        });
        if (findTag) {
          const findPosts = blog.posts.filter((post) => {
            return post.tags.includes(findTag.name);
          });
          res.status(200).json({
            ok: true,
            data: { posts: findPosts as unknown as Post[] },
          });
        } else {
          res.status(404).json({
            ok: false,
            error: `Tag (name: '${tagName}') not found.`,
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
