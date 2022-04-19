// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import util from 'util';
import Blog from 'src/lib/blog';

type Data = {
  ok: boolean;
  data?: {
    posts: { id: number; slug: string }[];
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
      const searchKeywords = req.query.q;
      console.log(searchKeywords);
      if (searchKeywords) {
        const posts = Blog.getPostsContentBySearchKeyword(
          Array.isArray(searchKeywords) ? searchKeywords : [searchKeywords]
        );

        res.status(200).json({ ok: true, data: { posts: [...posts] } });
      } else {
        res.status(400).json({
          ok: false,
          error: `Invalid query: ${util.inspect(req.query)}`,
        });
      }
      break;
    }
  }
}
