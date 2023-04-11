import { ConnectButton } from '@components/connect-button'
import { useFirebaseUser } from '@components/providers/firebase-user-provider'
import { Redirect } from '@components/redirect'
import { isNilOrEmpty } from '@echo/utils'
import { getMessages, MessagesType } from '@lib/messages'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { isNil } from 'ramda'

interface Props {
  messages: MessagesType
}

const Login: NextPage<Props> = () => {
  const { data: session } = useSession()
  const { loggedInFirebase } = useFirebaseUser()
  const router = useRouter()
  const { callbackUrl } = router.query

  if (isNil(session)) {
    return <ConnectButton />
  } else if (!loggedInFirebase) {
    return <>Logging in...</>
  } else {
    if (isNilOrEmpty(callbackUrl)) {
      return <Redirect to={'/'} />
    }
    return <Redirect to={new URL(callbackUrl as string).pathname} />
  }
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ locale, defaultLocale }) => {
  return Promise.resolve({
    props: {
      messages: getMessages(locale, defaultLocale)
    }
  })
}
export default Login
