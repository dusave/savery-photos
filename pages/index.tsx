import { duotone } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@nextui-org/react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import styles from 'styles/wedding.module.scss'
import { useMemo, useRef } from 'react'
import { natSort } from 'utils/sort'
import { getConfig } from 'utils/galleryData'

interface GalleryProps {
  keyPhoto: string
  gid: string
  zipLocation: string
  files: Array<string>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const gid = 'killham-savery'
  const config = await getConfig(gid as string);
  const props: Partial<GalleryProps> = {...config}
  
  return {
    props
  }
}

const Wedding = ({files, gid, keyPhoto, zipLocation}: GalleryProps) => {

  const lazyRoot = useRef(null)
  const items = useMemo(() => {
    return natSort(files)
  }, [files])

  return (
    <div>
      <a className={styles.download} href={zipLocation} download>
        <Button icon={<FontAwesomeIcon icon={duotone('download')} />} auto ghost><span>Download Entire Gallery</span></Button>
      </a>
      {keyPhoto && <div className={styles.keyPhoto}><Image src={`/galleries/${gid}/${keyPhoto}.jpeg`} layout='fill' alt={`${gid} album`} /></div>}
      <div className={styles.galleryView} ref={lazyRoot} style={{}}>
        {items?.map((file, index) => (
          <div key={`${gid}-${index}`} className={styles.photoLink}>
            <Link href={`/photos/${file.split('.')[0]}`}>
              <a href={`/photos/${file.split('.')[0]}`}>
                <Image src={`/galleries/${gid}/${file}`} lazyRoot={lazyRoot} loading="lazy" width={120} height={150} alt={`${gid} Gallery, Photo ${index + 1} of ${files.length}`} className={styles.photo} objectFit='cover' />
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wedding