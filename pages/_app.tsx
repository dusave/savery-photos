import type { AppProps } from 'next/app'
import '../styles/globals.css'
import styles from '../styles/root.module.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <div className={styles.root}>
    <header className={styles.header}>
      <h1>Savery Photography</h1>
    </header>
    <main className={styles.main}>
      <Component {...pageProps} />
    </main>
  </div>
}

export default MyApp
