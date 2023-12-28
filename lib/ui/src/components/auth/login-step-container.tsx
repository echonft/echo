import type { AuthUser } from '@echo/model/types/auth-user'
import { LoginStepIndicator } from '@echo/ui/components/auth/login-step-indicator'
import { LoginStepSelector } from '@echo/ui/components/auth/login-step-selector'
import clsx from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  currentStep: number
  totalSteps: number
  onContinue?: VoidFunction
  user?: AuthUser
}

export const LoginStepContainer: FunctionComponent<Props> = ({ currentStep, totalSteps, onContinue, user }) => {
  return (
    <div className={clsx('flex', 'justify-center')}>
      <div className={clsx('flex', 'flex-col', 'pt-40', 'gap-12', 'items-center', 'w-1/2')}>
        <LoginStepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        <LoginStepSelector currentStep={currentStep} onContinue={onContinue} user={user} />
      </div>
    </div>
  )
}
