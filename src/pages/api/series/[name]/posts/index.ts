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
        const { series: seriesName } = req.query;
        const findSeries = (blog.series as unknown as Series[]).find(
          ({ name }) => {
            return name === seriesName;
          }
        );

        if (findSeries) {
          const findPosts = (blog.posts as unknown as Post[]).filter((post) => {
            return post.series?.name === seriesName;
          });
          res.status(200).json({
            ok: true,
            data: { posts: findPosts as unknown as Post[] },
          });
        } else {
          res.status(404).json({
            ok: false,
            error: `Series (name: ${seriesName}) not found.`,
          });
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
