import Image from 'next/image'
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { duotone } from '@fortawesome/fontawesome-svg-core/import.macro'
import Link from 'next/link';
import { useEffect } from 'react';
import { useTheme } from '@nextui-org/react';
import { GetStaticPropsContext } from 'next';
import styles from 'styles/photo.module.scss'
import { useSwipeable } from 'react-swipeable';
import { getGalleries, getGalleryFiles } from 'utils/galleryData';

export async function getStaticPaths() {
  const galleries = await getGalleries();
  const paths = await Promise.all(await galleries.map(async (g) => {
    const files = await getGalleryFiles(g)
    return [...files.map((f) => ({ params: { gid: g, pid: f.split('.')[0]} }))]
  }));

  return {
    paths: paths.flat(),
    fallback: false,
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const images = await getGalleryFiles('killham-savery')
  return {
    // Passed to the page component as props
    props: { 
      pid: context.params?.pid,
      gid: 'killham-savery',
      galleryCount: images.length,
    },
  }
}

interface WeddingProps {
  pid: string
  gid: string
  galleryCount: number
}

const Wedding = ({pid, gid, galleryCount}: WeddingProps) => {
  const {theme} = useTheme()
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === 'ArrowLeft' && pid && parseInt(pid as string) > 1) {
        router.push(`/photos/${parseInt(pid as string) - 1}`)
      } else if(e.key === 'ArrowRight' && parseInt(pid as string) < galleryCount) {
        router.push(`/photos/${parseInt(pid as string) + 1}`)
      } else if(e.key === 'Escape') {
        router.push(`/`)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [gid, pid, router, galleryCount])

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      router.push(`/photos/${parseInt(pid as string) + 1}`)
    },
    onSwipedRight: () => {
      router.push(`/photos/${parseInt(pid as string) - 1}`)
    }
  })

  if(!gid || !pid) return <p>Not a valid id</p>
  return (
    <section className={styles.container} {...handlers}>
      <div className={styles.closeButton}><Link href={`/`}><a><FontAwesomeIcon icon={duotone('x')} /></a></Link></div>
      <div className={styles.photoContainer}>
        <div className={styles.leftArrow}><Link href={`/photos/${parseInt(pid as string) - 1}`}><Button rounded auto ghost icon={<FontAwesomeIcon icon={duotone('chevron-left')} />}></Button></Link></div>
        <div className={styles.photo}>
            <Image src={`/galleries/${gid}/${pid}.jpeg`} priority loading="eager" layout='fill' alt={`The ${gid} wedding, photo ${pid}`} objectFit={'contain'} />
        </div>
        <div className={styles.rightArrow}><Link href={`/photos/${parseInt(pid as string) + 1}`}><Button rounded auto ghost icon={<FontAwesomeIcon icon={duotone('chevron-right')} color={theme?.colors.primary.value} /> } css={{color: '$primary'}}></Button></Link></div>
      </div>
      <div className={styles.buttonContainer}>
        <a href={`/api/fetch-image?gid=${gid}&pid=${pid}&size=sm`} download><Button icon={<FontAwesomeIcon icon={duotone('download')} />} auto ghost>Small Image</Button></a>
        <a href={`/api/fetch-image?gid=${gid}&pid=${pid}&size=lg`} download><Button icon={<FontAwesomeIcon icon={duotone('download')} />} auto ghost>Large Image</Button></a>
        <a href={`/api/fetch-image?gid=${gid}&pid=${pid}&size=full`} download><Button icon={<FontAwesomeIcon icon={duotone('download')} />} auto ghost>Fullsize Image</Button></a>
      </div>
    </section>
  )
}

export default Wedding