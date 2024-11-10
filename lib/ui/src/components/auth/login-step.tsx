'use client'
import type { User } from '@echo/model/types/user'
import { LoginConnectWalletStep } from '@echo/ui/components/auth/login-connect-wallet-step'
import { LoginDiscordStep } from '@echo/ui/components/auth/login-discord-step'
import { LoginJoinEchoStep } from '@echo/ui/components/auth/login-join-echo-step'
import { LoginStep as LoginStepEnum } from '@echo/ui/constants/login-step'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  step: LoginStepEnum
  user: Nullable<User>
  onNext?: VoidFunction
  onFinish?: VoidFunction
  onWalletButtonClick?: MouseEventHandler
}

export const LoginStep: FunctionComponent<Props> = ({ step, user, onNext, onFinish, onWalletButtonClick }) => {
  if (step === LoginStepEnum.Discord) {
    return <LoginDiscordStep user={user} onContinue={onNext} />
  }
  if (step === LoginStepEnum.Wallet) {
    return <LoginConnectWalletStep onContinue={onNext} onWalletButtonClick={onWalletButtonClick} />
  }
  if (isNil(user)) {
    return <LoginDiscordStep user={user} onContinue={onNext} />
  }
  return <LoginJoinEchoStep username={user.username} onSkip={onFinish} />
}
