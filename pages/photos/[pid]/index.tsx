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
import { getConfig, getGalleryFiles } from 'utils/galleryData';

export async function getStaticPaths() {

  const gid = 'killham-savery'
  const config = await getConfig(gid as string);
  const paths: Array<string> = []

  for (let i = 0; i < config.length; i++) {
    paths.push(`/photos/${i + 1}`)
  }

  return {
    paths,
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
        <div className={styles.leftArrow}><Link href={`/photos/${parseInt(pid as string) - 1}`}><FontAwesomeIcon icon={duotone('chevron-left')} /></Link></div>
        <div className={styles.photo}>
            <Image src={`https://saveryphotos.file.core.windows.net/photos/galleries/${gid}/${pid}.jpeg?sv=2021-06-08&ss=f&srt=o&sp=r&se=2025-08-25T11:26:51Z&st=2022-08-25T03:26:51Z&spr=https&sig=kyP%2BAERDdeaFgaEOCurdbSM5a9sjURrXF0bJV5OmGuI%3D`} priority loading="eager" layout='fill' alt={`The ${gid} wedding, photo ${pid}`} objectFit={'contain'} />
        </div>
        <div className={styles.rightArrow}><Link href={`/photos/${parseInt(pid as string) + 1}`}><FontAwesomeIcon icon={duotone('chevron-right')}/></Link></div>
      </div>
      <div className={styles.buttonContainer}>
        <a href={`https://saveryphotos.file.core.windows.net/photos/galleries/${gid}/sm/${pid}.jpeg?sv=2021-06-08&ss=f&srt=o&sp=r&se=2025-08-25T11:26:51Z&st=2022-08-25T03:26:51Z&spr=https&sig=kyP%2BAERDdeaFgaEOCurdbSM5a9sjURrXF0bJV5OmGuI%3D`} download><Button icon={<FontAwesomeIcon icon={duotone('download')} />} auto ghost>Small Image</Button></a>
        <a href={`https://saveryphotos.file.core.windows.net/photos/galleries/${gid}/lg/${pid}.jpeg?sv=2021-06-08&ss=f&srt=o&sp=r&se=2025-08-25T11:26:51Z&st=2022-08-25T03:26:51Z&spr=https&sig=kyP%2BAERDdeaFgaEOCurdbSM5a9sjURrXF0bJV5OmGuI%3D`} download><Button icon={<FontAwesomeIcon icon={duotone('download')} />} auto ghost>Large Image</Button></a>
        <a href={`https://saveryphotos.file.core.windows.net/photos/galleries/${gid}/${pid}.jpeg?sv=2021-06-08&ss=f&srt=o&sp=r&se=2025-08-25T11:26:51Z&st=2022-08-25T03:26:51Z&spr=https&sig=kyP%2BAERDdeaFgaEOCurdbSM5a9sjURrXF0bJV5OmGuI%3D`} download><Button icon={<FontAwesomeIcon icon={duotone('download')} />} auto ghost>Fullsize Image</Button></a>
      </div>
    </section>
    
  )
}

export default Wedding