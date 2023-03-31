import { ConnectButton } from '@components/connect-button'
import { Redirect } from '@components/redirect'
import { useFirebaseAuth } from '@echo/firebase-react'
import { isNilOrEmpty } from '@echo/utils'
import { getMessages, MessagesType } from '@lib/messages'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { isNil } from 'ramda'
import { useEffect } from 'react'

interface Props {
  messages: MessagesType
}

const Login: NextPage<Props> = () => {
  const { data: session } = useSession()
  const { auth, signIn } = useFirebaseAuth()
  const router = useRouter()
  const { callbackUrl } = router.query

  useEffect(() => {
    if (isNil(auth.currentUser) && session?.firebaseToken) {
      void signIn(auth, session.firebaseToken)
    }
  }, [auth, session, signIn])
  if (isNil(session)) {
    return <ConnectButton />
  }
  if (isNilOrEmpty(callbackUrl)) {
    return <Redirect to={'/'} />
  }
  return <Redirect to={new URL(callbackUrl as string).pathname} />
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ locale, defaultLocale }) => {
  return Promise.resolve({
    props: {
      messages: getMessages(locale, defaultLocale)
    }
  })
}
export default Login
