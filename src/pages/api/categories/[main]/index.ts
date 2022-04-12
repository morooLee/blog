// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import blog from 'public/blog.json';

type Data = {
  ok: boolean;
  data?: {
    category: Category;
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
      const { main } = req.query;

      if (categories) {
        const findCategory = categories.find((category) => {
          return category.name === main;
        });
        if (findCategory) {
          res.status(200).json({ ok: true, data: { category: findCategory } });
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
