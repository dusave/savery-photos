import { NextUIProvider } from '@nextui-org/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { lightTheme, darkTheme } from 'styles/theme'
import '../styles/globals.css'
import styles from '../styles/root.module.scss'
import { ThemeProvider as NextThemesProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppProps) {
  const {pathname} = useRouter()
  const isRoot = pathname === '/'

  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}
    >
      <NextUIProvider>
        <div className={styles.root}>
        <Head>
          <title>Savery Photos</title>
        </Head>
        <header className={isRoot? styles.header : styles.noHeader}>
          <h1>Savery Photos</h1>
        </header>
        <main className={styles.main}>
          <Component {...pageProps} />
        </main>
      </div>
    </NextUIProvider>
  </NextThemesProvider>
  )
}

export default MyApp
