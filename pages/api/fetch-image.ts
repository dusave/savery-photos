
import fs from 'fs'
import sharp from 'sharp';
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const imageFile = path.join(process.cwd(), `public/galleries/${req.query.gid}/${req.query.pid}.jpeg`);
  //Read the json data file data.json
  await fs.readFile(imageFile, (err, data) => {
    if (err) {
      res.status(404).json({err})
      console.error(err);
      return;
    }
    const img = sharp(data)
  switch (req.query.size) {
    case 'sm': img.resize(600, 600, {fit: 'inside'}); break;
    case 'lg': img.resize(1400, 1400, {fit: 'inside'}); break;
    default: break;
  }

  const galleryName = (req.query.gid as string)?.split("-").filter(x => x.length > 0).map((x) => (x.charAt(0).toUpperCase() + x.slice(1))).join(" ");
  const fileName = `${galleryName} Wedding - ${req.query.pid}.jpeg`;
    
  img.toBuffer((err, data) => {
      if(err) {
        res.status(500).json({msg: err.message, data})
      }
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
      res.setHeader('Content-Type', 'image/jpg')
      res.send(data)
    })
  });

  
}
