import path from "path";
import fs from 'fs'

export interface GalleryConfig {
  keyPhoto: string
  zipLocation: string
  length: number
}

export const getGalleries = async (): Promise<string[]> => {
  const galleriesPath = path.join(process.cwd(), `public/galleries`);
  const paths = await fs.promises.readdir(galleriesPath, "utf8")
  return paths.filter(x => !x.startsWith("."))
}

export const getGalleryFiles = async (gid:string): Promise<string[]> => {
  const gallery = path.join(process.cwd(), `public/galleries/${gid}`);
  const files = await fs.promises.readdir(gallery, "utf8")
  return files.filter(x => x.endsWith(".jpeg"))
}

export const getConfig = async (gid:string): Promise<GalleryConfig> =>{
  const imageFile = path.join(process.cwd(), `public/galleries/${gid}/config.json`);
  const config = await fs.promises.readFile(imageFile, "utf8")
  const photos = await (await fs.promises.readdir(`public/galleries/${gid}`, "utf8")).filter(x => x.endsWith(".jpeg"))
  return {...JSON.parse(config), gid, files: photos}
}
