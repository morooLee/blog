// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import blog from 'public/blog.json';

type Data = {
  ok: boolean;
  data?: {
    series: Series[];
  };
  error?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const series = blog.series;

  switch (req.method?.toUpperCase()) {
    case 'POST': {
      break;
    }
    case 'GET': {
      if (series) {
        res.status(200).json({ ok: true, data: { series } });
      } else {
        res
          .status(503)
          .json({ ok: false, error: 'Blog data not initialized.' });
      }
      break;
    }
  }
}
