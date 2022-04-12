// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import blog from 'public/blog.json';

type Data = {
  ok: boolean;
  data?: {
    categories: Category[];
  };
  error?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const categories = blog.categories;

  switch (req.method?.toUpperCase()) {
    case 'POST': {
      break;
    }
    case 'GET': {
      if (categories) {
        res.status(200).json({ ok: true, data: { categories } });
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
