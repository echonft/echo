'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import { LoginStep } from '@echo/ui/components/auth/login-step'
import { LoginStepIndicator, type LoginStepIndicatorProps } from '@echo/ui/components/auth/login-step-indicator'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { inc, isNil } from 'ramda'
import { type FunctionComponent, type MouseEventHandler, useEffect, useRef, useState } from 'react'

interface Props {
  user: Nullable<AuthUser>
  onFinish?: VoidFunction
  onWalletButtonClick?: MouseEventHandler
}

export const Login: FunctionComponent<Props> = ({ user, onFinish, onWalletButtonClick }) => {
  const [indicatorStep, setIndicatorStep] = useState<1 | 2 | 3>(1)
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [show, setShow] = useState(true)
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    return (): void => {
      if (!isNil(showTimeoutRef.current)) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        clearTimeout(showTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className={clsx('flex', 'flex-col', 'pt-40', 'gap-12', 'items-center', 'w-1/2')}>
      <LoginStepIndicator step={indicatorStep} />
      <div className={clsx('transition-opacity', 'ease-in-out', show ? 'opacity-100' : 'opacity-0')}>
        <LoginStep
          step={step}
          user={user}
          onNext={() => {
            setIndicatorStep(inc as (args: number) => LoginStepIndicatorProps['step'])
            setShow(false)
            setTimeout(() => {
              setShow(true)
              setStep(inc as (args: number) => LoginStepIndicatorProps['step'])
            }, 300)
          }}
          onFinish={onFinish}
          onWalletButtonClick={onWalletButtonClick}
        />
      </div>
    </div>
  )
}
