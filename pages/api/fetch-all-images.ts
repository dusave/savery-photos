
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const gallery = path.join(process.cwd(), `public/galleries/${req.query.gid}.zip`);

  fs.readFile(gallery, (err, data) => {
    if(err) {
      res.status(500).json({msg: err.message, data})
    }

    res.send(data)

  })
}
