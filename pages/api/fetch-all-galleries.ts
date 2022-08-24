
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';

export const getGalleries = async (): Promise<string[]> => {
  const galleriesPath = path.join(process.cwd(), `public/galleries`);
  return await (await fs.promises.readdir(galleriesPath, "utf8")).filter(x => !x.startsWith(".") && !x.endsWith(".zip"))
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    res.send(getGalleries())
}
