// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import blog from 'public/blog.json';

type Data = {
  ok: boolean;
  data?: {
    series: Series;
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
        const { series: seriesName } = req.query;
        const findSeries = (series as unknown as Series[]).find(({ name }) => {
          return name === seriesName;
        });

        if (findSeries) {
          res.status(200).json({ ok: true, data: { series: findSeries } });
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
