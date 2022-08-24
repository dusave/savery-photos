import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import '../styles/globals.css'
import styles from '../styles/root.module.scss'

function MyApp({ Component, pageProps }: AppProps) {
  const {pathname} = useRouter()
  const isRoot = pathname === '/'

  return <div className={styles.root}>
    <header className={isRoot? styles.header : styles.noHeader}>
      <h1>Savery Photography</h1>
    </header>
    <main className={styles.main}>
      <Component {...pageProps} />
    </main>
  </div>
}

export default MyApp
