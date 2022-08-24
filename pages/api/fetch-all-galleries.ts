
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';

export const getGalleries = async (): Promise<string[]> => {
  const galleriesPath = path.join(process.cwd(), `public/galleries`);
  const paths = await fs.promises.readdir(galleriesPath, "utf8")
  return paths.filter(x => !x.startsWith("."))
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    res.send(getGalleries())
}
