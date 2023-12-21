import type { AuthUser } from '@echo/model/types/auth-user'
import { LoginConnectWalletStep } from '@echo/ui/components/auth/login-connect-wallet-step'
import { LoginDiscordStep } from '@echo/ui/components/auth/login-discord-step'
import { LoginJoinEchoStep } from '@echo/ui/components/auth/login-join-echo-step'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  currentStep: number
  onContinue?: VoidFunction
  user?: AuthUser
}

export const LoginStepSelector: FunctionComponent<Props> = ({ currentStep, onContinue, user }) => {
  if (currentStep === 0) {
    return <LoginDiscordStep onContinue={onContinue} user={user} />
  }
  // If there is no session after step 0, then there is an error
  if (isNil(user)) {
    return null
  }
  if (currentStep === 1) {
    return <LoginJoinEchoStep username={user.username} onContinue={onContinue} />
  }
  if (currentStep === 2) {
    return <LoginConnectWalletStep onContinue={onContinue} user={user} />
  }
  return null
}
