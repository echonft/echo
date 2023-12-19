'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import { LoginStepContainer } from '@echo/ui/components/auth/login-step-container'
import { LoginStepSelector } from '@echo/ui/components/auth/login-step-selector'
import { messages } from '@echo/ui/messages/en'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { redirect } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  callbackUrl?: string
  user?: AuthUser
}
export const LoginFlow: FunctionComponent<Props> = ({ callbackUrl, user }) => {
  const [currentStep, setCurrentStep] = useState(0)
  return (
    <NextIntlClientProvider messages={messages} locale={'en'}>
      <LoginStepContainer
        currentStep={currentStep}
        totalSteps={3}
        stepContainer={() => (
          <LoginStepSelector
            currentStep={currentStep}
            onContinue={() => {
              // FIXME Redirect is not working
              if (currentStep === 2) {
                if (!isNil(user)) {
                  if (!isNilOrEmpty(callbackUrl)) {
                    redirect(callbackUrl)
                  } else {
                    redirect('/')
                  }
                }
                // TODO Handle error here
              } else {
                setCurrentStep((prevState) => prevState + 1)
              }
            }}
            user={user}
          />
        )}
      />
    </NextIntlClientProvider>
  )
}
