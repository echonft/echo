'use client'
import type { User } from '@echo/model/types/user'
import { LoginStep as LoginStepComponent } from '@echo/ui/components/auth/login-step'
import { LoginStepIndicator } from '@echo/ui/components/auth/login-step-indicator'
import { useLoginStep } from '@echo/ui/hooks/use-login-step'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  user: Nullable<User>
  onFinish?: VoidFunction
  onWalletButtonClick?: MouseEventHandler
}

export const Login: FunctionComponent<Props> = ({ user, onFinish, onWalletButtonClick }) => {
  const { indicatorStep, step, show, onNext } = useLoginStep()
  return (
    <div className={clsx('flex', 'flex-col', 'pt-40', 'gap-12', 'items-center', 'w-1/2')}>
      <LoginStepIndicator step={indicatorStep} />
      <div className={clsx('transition-opacity', 'ease-in-out', show ? 'opacity-100' : 'opacity-0')}>
        <LoginStepComponent
          step={step}
          user={user}
          onNext={onNext}
          onFinish={onFinish}
          onWalletButtonClick={onWalletButtonClick}
        />
      </div>
    </div>
  )
}
