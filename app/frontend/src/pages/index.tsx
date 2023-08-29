import { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Echo</title>
        <meta name="description" content="Echo" />
      </Head>

      <main>
        <h1>Hello Botto!</h1>
        <footer></footer>
      </main>
    </>
  )
}

export default Home
