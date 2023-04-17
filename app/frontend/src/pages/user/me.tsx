import { UserProfile } from '@components/user-profile'
import { getMessages, MessagesType } from '@lib/messages'
import { GetServerSideProps } from 'next'

interface Props {
  messages: MessagesType
}
const Me: PageWithAuth<Props> = () => {
  return <UserProfile />
}

Me.authenticationEnabled = true

export const getServerSideProps: GetServerSideProps<Props> = async ({ locale, defaultLocale }) => {
  return Promise.resolve({
    props: {
      messages: getMessages(locale, defaultLocale)
    }
  })
}

export default Me
