import { LoginToFirebase } from '@components/login-to-firebase'
import { useIsLoggedIn } from '@echo/firebase-react'
import { signIn, useSession } from 'next-auth/react'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export const Connect: FunctionComponent = () => {
  const { data: session } = useSession()
  const isLoggedInToFirebase = useIsLoggedIn()

  if (isNil(session)) {
    return (
      <button
        onClick={() => {
          void signIn('discord')
        }}
      >
        Sign in with Discord
      </button>
    )
  } else {
    if (!isLoggedInToFirebase) {
      return <LoginToFirebase firebaseToken={session.firebaseToken} />
    }
    return <>{JSON.stringify(session)}</>
  }
}
