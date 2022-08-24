import path from "path";
import fs from 'fs'
import sharp from "sharp";

const generateImages =  () => {
  const galleriesPath = path.join(process.cwd(), `public/galleries`);
  const paths = fs.readdirSync(galleriesPath, "utf8")
  paths.filter(x => !x.startsWith("."))
    .forEach(async (gid) => {
      const gallery = path.join(process.cwd(), `public/galleries/${gid}`);
      const files = fs.readdirSync(gallery, "utf8")
      files.filter(x => x.endsWith(".jpeg"))
        .forEach(async (pid) => {
          const imageFile = path.join(process.cwd(), `public/galleries/${gid}/${pid}`);
          const img = sharp(imageFile);
          ['sm', 'lg'].forEach(async (size) => {
            switch(size) {
              case 'sm': img.resize(600, 600, {fit: 'inside'}); break;
              case 'lg': img.resize(1400, 1400, {fit: 'inside'}); break;
            }

            img.toFile(path.join(process.cwd(), `public/galleries/${gid}/${size}/${pid}.jpeg`), (err) => {
              if(err) {
                console.error(err);
              }
            })
          })
        })
  })
}

export default generateImages;