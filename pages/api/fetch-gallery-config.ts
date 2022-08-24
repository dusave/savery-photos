
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';

interface GalleryConfig {
  keyPhoto: string
  gid: string
  zipLocation: string
}

export async function getData(gid:string): Promise<GalleryConfig> {
  const imageFile = path.join(process.cwd(), `public/galleries/${gid}/config.json`);
  const config = await fs.promises.readFile(imageFile, "utf8")
  const photos = await (await fs.promises.readdir(`public/galleries/${gid}`, "utf8")).filter(x => x.endsWith(".jpeg"))
  return {...JSON.parse(config), gid, files: photos}
}

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const jsonData = await getData(req.query.gid as string);

  res.setHeader('Content-Type', 'text/json')
  res.status(200).json(jsonData)
}