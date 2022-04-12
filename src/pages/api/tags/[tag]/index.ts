// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import blog from 'public/blog.json';

type Data = {
  ok: boolean;
  data?: {
    tag: Tag;
  };
  error?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tags = blog.tags;

  switch (req.method?.toUpperCase()) {
    case 'POST': {
      break;
    }
    case 'GET': {
      if (tags) {
        const { tag: tagName } = req.query;
        const findTag = tags.find((tag) => {
          return tag.name === tagName;
        });
        if (findTag) {
          res.status(200).json({ ok: true, data: { tag: findTag } });
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
