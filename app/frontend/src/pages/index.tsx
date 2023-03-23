import { clsx } from 'clsx'
import { NextPage } from 'next'
import { Nunito } from 'next/font/google'
import localFont from 'next/font/local'
import Head from 'next/head'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito'
})
const akira = localFont({ src: './akira.otf', variable: '--font-akira' })

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Echo</title>
        <meta name="description" content="Echo" />
      </Head>

      <main className={clsx(nunito.variable, akira.variable)}>
        <h1 className={'font-akira'}>Hello World!</h1>
        <footer></footer>
      </main>
    </>
  )
}

export default Home
