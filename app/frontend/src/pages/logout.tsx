import { getMessages, MessagesType } from '@lib/messages'
import { GetServerSideProps, NextPage } from 'next'
import { signOut } from 'next-auth/react'

interface Props {
  messages: MessagesType
}

const Logout: NextPage<Props> = () => <button onClick={() => void signOut()}>Sign out</button>

export const getServerSideProps: GetServerSideProps<Props> = async ({ locale, defaultLocale }) => {
  return Promise.resolve({
    props: {
      messages: getMessages(locale, defaultLocale)
    }
  })
}
export default Logout
