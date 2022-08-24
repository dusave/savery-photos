import Image from 'next/image'
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { duotone } from '@fortawesome/fontawesome-svg-core/import.macro'
import Link from 'next/link';
import { useEffect } from 'react';
import { useTheme } from '@nextui-org/react';
import { getGalleries } from 'pages/api/fetch-all-galleries';
import { getGalleryFiles } from 'pages/api/fetch-all-image-paths';
import { GetStaticPropsContext } from 'next';
import styles from 'styles/photo.module.scss'
import { useSwipeable } from 'react-swipeable';

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
  return {
    // Passed to the page component as props
    props: { pid: context.params?.pid, gid: 'killham-savery' },
  }
}

const Wedding = () => {
  const {theme} = useTheme()
  const router = useRouter()
  const gid = 'killham-savery'
  const { pid } = router.query

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === 'ArrowLeft') {
        router.push(`/${parseInt(pid as string) - 1}`)
      } else if(e.key === 'ArrowRight') {
        router.push(`/${parseInt(pid as string) + 1}`)
      } else if(e.key === 'Escape') {
        router.push(`/`)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [gid, pid, router])

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      router.push(`/${parseInt(pid as string) - 1}`)
    },
    onSwipedRight: () => {
      router.push(`/${parseInt(pid as string) + 1}`)
    }
  })

  if(!gid || !pid) return <p>Not a valid id</p>
  return (
    <section className={styles.container} {...handlers}>
      <div className={styles.closeButton}><Link href={`/`}><Button rounded auto ghost icon={<FontAwesomeIcon icon={duotone('x')} />}></Button></Link></div>
      <div className={styles.photoContainer}>
        <div className={styles.leftArrow}><Link href={`/${parseInt(pid as string) - 1}`}><Button rounded color="secondary" auto ghost icon={<FontAwesomeIcon icon={duotone('chevron-left')} />}></Button></Link></div>
        <div className={styles.photo}>
            <Image src={`/galleries/${gid}/${pid}.jpeg`} priority loading="eager" layout='fill' alt={`The ${gid} wedding, photo ${pid}`} objectFit={'contain'} />
        </div>
        <div className={styles.rightArrow}><Link href={`/${parseInt(pid as string) + 1}`}><Button rounded color="secondary" auto ghost icon={<FontAwesomeIcon icon={duotone('chevron-right')} color={theme?.colors.primary.value} /> } css={{color: '$primary'}}></Button></Link></div>
      </div>
      <div className={styles.buttonContainer}>
        <Link href={`/api/fetch-image?gid=${gid}&pid=${pid}&size=sm`}><Button icon={<FontAwesomeIcon icon={duotone('download')} />} auto ghost>Small Image</Button></Link>
        <Link href={`/api/fetch-image?gid=${gid}&pid=${pid}&size=lg`}><Button icon={<FontAwesomeIcon icon={duotone('download')} />} auto ghost>Large Image</Button></Link>
        <Link href={`/api/fetch-image?gid=${gid}&pid=${pid}&size=full`}><Button icon={<FontAwesomeIcon icon={duotone('download')} />} auto ghost>Fullsize Image</Button></Link>
      </div>
    </section>
  )
}

export default Wedding