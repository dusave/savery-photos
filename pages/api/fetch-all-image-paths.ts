
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';

export const getGalleryFiles = async (gid:string): Promise<string[]> => {
  const gallery = path.join(process.cwd(), `public/galleries/${gid}`);
  const files = await fs.promises.readdir(gallery, "utf8")
  return files.filter(x => x.endsWith(".jpeg"))
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    res.send(getGalleryFiles(req.query.gid as string))
}
