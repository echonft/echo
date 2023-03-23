import { signIn, useSession } from 'next-auth/react'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export const Connect: FunctionComponent = () => {
  const { data: session, status } = useSession()

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
    return <>{status}</>
  }
}
