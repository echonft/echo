import { useLogger } from '@components/providers/logger-provider'
import { useLogin } from '@lib/hooks/use-login'
import { useSignInWithFirebase } from '@lib/hooks/use-sign-in-with-firebase'
import React from 'react'
import { useAccount } from 'wagmi'

interface Props {
  accessToken: string | undefined
  tokenType: string | undefined
  signature: string | undefined
  message: string | undefined
  hasLoggedIn?: (isLoggedIn: boolean, error: any | undefined) => void
}

export const LoginFirebase: React.FunctionComponent<Props> = ({ accessToken, tokenType, signature, message }) => {
  const logger = useLogger()
  const { address } = useAccount()
  const { data: loginData, error: loginError } = useLogin(accessToken, tokenType, address, message, signature)
  const { data, error } = useSignInWithFirebase(loginData?.apiKey)
  if (error || loginError) {
    logger.error('Error login in,', error || loginError)
    return <span>Error logging you in</span>
  }
  if (data) {
    return <span>Successfully logged you in, you&apos;re all set</span>
  }
  return <span>Logging in...</span>
}
