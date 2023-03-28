import { signIn } from 'next-auth/react'
import { FunctionComponent } from 'react'

export const ConnectButton: FunctionComponent = () => (
  <button
    onClick={() => {
      void signIn('discord')
    }}
  >
    Sign in with Discord
  </button>
)
