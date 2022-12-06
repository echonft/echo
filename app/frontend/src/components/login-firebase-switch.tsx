import { LoginFirebase } from '@components/login-firebase'
import { LoginFirebaseNoDiscord } from '@components/login-firebase-no-discord'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  accessToken: string | undefined
  tokenType: string | undefined
  signature: string | undefined
  message: string | undefined
  hasLoggedIn?: (isLoggedIn: boolean, error: Error | undefined) => void
}

export const LoginFirebaseSwitch: FunctionComponent<Props> = ({
  accessToken,
  tokenType,
  signature,
  message,
  hasLoggedIn
}) => {
  if (isNil(accessToken) && isNil(tokenType)) {
    return <LoginFirebaseNoDiscord signature={signature} message={message} hasLoggedIn={hasLoggedIn} />
  } else {
    return <LoginFirebase accessToken={accessToken} tokenType={tokenType} signature={signature} message={message} />
  }
}
