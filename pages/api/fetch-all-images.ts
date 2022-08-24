
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const gallery = `/public/galleries/${req.query.gid}.zip`;

  res.redirect(gallery);
}
