'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import { LoginStepContainer } from '@echo/ui/components/auth/login-step-container'
import { LoginStepSelector } from '@echo/ui/components/auth/login-step-selector'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { redirect } from 'next/navigation'
import { isNil } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  callbackUrl?: string
  user?: AuthUser
}
export const LoginFlow: FunctionComponent<Props> = ({ callbackUrl, user }) => {
  const [currentStep, setCurrentStep] = useState(0)
  return (
    <LoginStepContainer
      currentStep={currentStep}
      totalSteps={3}
      stepContainer={() => (
        <LoginStepSelector
          currentStep={currentStep}
          onContinue={() => {
            if (currentStep === 2) {
              // TODO Handle error here
              if (!isNil(user)) {
                if (!isNilOrEmpty(callbackUrl)) {
                  redirect(callbackUrl)
                } else {
                  redirect('/')
                }
              }
            } else {
              setCurrentStep((prevState) => prevState + 1)
            }
          }}
          user={user}
        />
      )}
    />
  )
}
