import { ConnectButton } from '@components/connect-button'
import { useFirebaseUser } from '@components/providers/firebase-user-provider'
import { Redirect } from '@components/redirect'
import { useFirebaseAuth } from '@echo/firebase-react'
import { isNilOrEmpty } from '@echo/utils'
import { useGetFirebaseToken } from '@lib/hooks/use-get-firebase-token'
import { getMessages, MessagesType } from '@lib/messages'
import { R } from '@mobily/ts-belt'
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
  const { loggedInFirebase } = useFirebaseUser()
  const firebaseTokenResult = useGetFirebaseToken(isNil(session))
  const router = useRouter()
  const { callbackUrl } = router.query

  useEffect(() => {
    if (isNil(auth.currentUser) && !isNil(firebaseTokenResult) && R.isOk(firebaseTokenResult)) {
      void signIn(auth, R.getExn(firebaseTokenResult).firebaseToken)
    }
  }, [auth, firebaseTokenResult, signIn])

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
