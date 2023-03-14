import { FunctionComponent } from 'react'

interface Props {
  accessToken: string | undefined
  tokenType: string | undefined
  signature: string | undefined
  message: string | undefined
  hasLoggedIn?: (isLoggedIn: boolean, error: Error | undefined) => void
}

export const LoginFirebase: FunctionComponent<Props> = () => {
  // const { address } = useAccount()
  // const { data: loginData, error: loginError } = useLogin(accessToken, tokenType, address, message, signature)
  // FIXME no can do.....
  // const { data, error } = useSignInWithFirebase(loginData?.apiKey)
  // if (error || loginError) {
  //   logger.error('Error login in,', error || loginError)
  //   return <span>Error logging you in</span>
  // }
  // if (data) {
  //   return <span>Successfully logged you in, you&apos;re all set</span>
  // }
  return <span>Logging in...</span>
}
