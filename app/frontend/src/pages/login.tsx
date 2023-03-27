import { getMessages, MessagesType } from '@lib/messages'
import { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'

const Connect = dynamic(() => import('@components/connect').then((mod) => mod.Connect), {
  ssr: false
})

interface Props {
  messages: MessagesType
}

const Login: NextPage<Props> = () => <Connect />

export const getServerSideProps: GetServerSideProps<Props> = async ({ locale, defaultLocale }) => {
  return Promise.resolve({
    props: {
      messages: getMessages(locale, defaultLocale)
    }
  })
}
export default Login
