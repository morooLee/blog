// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import blog from 'public/blog.json';

type Data = {
  ok: boolean;
  data?: {
    post: Post;
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
        const { postId } = req.query;
        const findPost = posts.find((post) => {
          return post.id === Number(postId);
        });
        if (findPost) {
          res.status(200).json({ ok: true, data: { post: findPost } });
        } else {
          res
            .status(404)
            .json({ ok: false, error: `Post (id: ${postId}) not found.` });
        }
      } else {
        res
          .status(503)
          .json({ ok: false, error: 'Blog data not initialized.' });
      }

      break;
    }
  }
}
