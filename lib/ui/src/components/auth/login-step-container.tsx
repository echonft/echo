import { LoginStepIndicator } from '@echo/ui/components/auth/login-step-indicator'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import clsx from 'clsx'
import type { FunctionComponent, ReactNode } from 'react'

interface Props {
  currentStep: number
  totalSteps: number
  stepContainer?: () => ReactNode
}

export const LoginStepContainer: FunctionComponent<Props> = ({ currentStep, totalSteps, stepContainer }) => {
  return (
    <div className={clsx('flex', 'justify-center')}>
      <div className={clsx('flex', 'flex-col', 'pt-40', 'gap-12', 'items-center', 'w-1/2')}>
        <LoginStepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        <HideIfNil checks={stepContainer} render={(render) => render()} />
      </div>
    </div>
  )
}
