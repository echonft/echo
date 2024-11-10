import type { LoginStepIndicatorProps } from '@echo/ui/components/auth/login-step-indicator'
import { LoginStep } from '@echo/ui/constants/login-step'
import { inc, isNil } from 'ramda'
import { useEffect, useRef, useState } from 'react'

export function useLoginStep() {
  const [indicatorStep, setIndicatorStep] = useState<1 | 2 | 3>(1)
  const [step, setStep] = useState<LoginStep>(LoginStep.Discord)
  const [show, setShow] = useState(true)
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const onNext = () => {
    setIndicatorStep(inc as (args: number) => LoginStepIndicatorProps['step'])
    setShow(false)
    showTimeoutRef.current = setTimeout(() => {
      setShow(true)
      setStep((step) => {
        if (step === LoginStep.Discord) {
          return LoginStep.Wallet
        }
        if (step === LoginStep.Wallet) {
          return LoginStep.JoinDiscord
        }
        return step
      })
    }, 300)
  }

  useEffect(() => {
    return (): void => {
      if (!isNil(showTimeoutRef.current)) {
        clearTimeout(showTimeoutRef.current)
      }
    }
  }, [])

  return { indicatorStep, step, show, onNext }
}
