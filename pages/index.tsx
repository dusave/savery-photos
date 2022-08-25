import { Button } from '@nextui-org/react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import styles from 'styles/wedding.module.scss'
import { useMemo, useRef } from 'react'
import { GalleryConfig, getConfig } from 'utils/galleryData'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const gid = 'killham-savery'
  const config = await getConfig(gid as string);
  const props: Partial<GalleryConfig> = {...config}
  
  return {
    props
  }
}

interface WeddingProps extends GalleryConfig {
  gid: string
}

const Wedding = ({length, gid, keyPhoto, zipLocation}: WeddingProps) => {

  const lazyRoot = useRef(null)
  const items = useMemo(() => {
    return new Array(length).fill(0)
  }, [length])

  return (
    <div>
      <a className={styles.download} href={zipLocation} download>
        <Button icon={<i className="fa-duotone fa-download fa-lg"></i>} rounded auto ghost><span className={styles.downloadText}>Download Entire Gallery</span></Button>
      </a>
      {keyPhoto && <div className={styles.keyPhoto}><Image src={`https://saveryphotos.file.core.windows.net/photos/galleries/${gid}/${keyPhoto}.jpeg?sv=2021-06-08&ss=f&srt=o&sp=r&se=2025-08-25T11:26:51Z&st=2022-08-25T03:26:51Z&spr=https&sig=kyP%2BAERDdeaFgaEOCurdbSM5a9sjURrXF0bJV5OmGuI%3D`} layout='fill' alt={`${gid} album`} /></div>}
      <div className={styles.galleryView} ref={lazyRoot}>
        {items?.map((file, index) => (
          <div key={`${gid}-${index}`} className={styles.photoLink}>
            <Link href={`/photos/${index + 1}`}>
              <a href={`/photos/${index + 1}`}>
                <Image
                  src={`https://saveryphotos.file.core.windows.net/photos/galleries/${gid}/${index + 1}.jpeg?sv=2021-06-08&ss=f&srt=o&sp=r&se=2025-08-25T11:26:51Z&st=2022-08-25T03:26:51Z&spr=https&sig=kyP%2BAERDdeaFgaEOCurdbSM5a9sjURrXF0bJV5OmGuI%3D`}
                  lazyRoot={lazyRoot}
                  loading="lazy"
                  width={120}
                  height={150}
                  alt={`${gid} Gallery, Photo ${index + 1} of ${length}`}
                  className={styles.photo}
                  objectFit='cover'
                />
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wedding