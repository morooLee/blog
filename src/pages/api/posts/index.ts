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
  const posts = blog.posts;

  switch (req.method?.toUpperCase()) {
    case 'POST': {
      break;
    }
    case 'GET': {
      if (posts) {
        res.status(200).json({ ok: true, data: { posts } });
      } else {
        res
          .status(503)
          .json({ ok: false, error: 'Blog data not initialized.' });
      }
      break;
    }
  }
}
