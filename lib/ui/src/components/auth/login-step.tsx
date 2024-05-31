'use client'
import { LoginConnectWalletStep } from '@echo/ui/components/auth/login-connect-wallet-step'
import { LoginDiscordStep } from '@echo/ui/components/auth/login-discord-step'
import { LoginJoinEchoStep } from '@echo/ui/components/auth/login-join-echo-step'
import type { Nullable } from '@echo/utils/types/nullable'
import type { User } from 'next-auth'
import { isNil } from 'ramda'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  step: 1 | 2 | 3
  user: Nullable<User>
  onNext?: VoidFunction
  onFinish?: VoidFunction
  onWalletButtonClick?: MouseEventHandler
}

export const LoginStep: FunctionComponent<Props> = ({ step, user, onNext, onFinish, onWalletButtonClick }) => {
  if (step === 1) {
    return <LoginDiscordStep user={user} onContinue={onNext} />
  }
  if (step === 2) {
    return <LoginConnectWalletStep onContinue={onNext} onWalletButtonClick={onWalletButtonClick} />
  }
  if (isNil(user)) {
    throw Error
  }
  return <LoginJoinEchoStep username={user.username} onSkip={onFinish} />
}
