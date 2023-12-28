'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import { LoginStepContainer } from '@echo/ui/components/auth/login-step-container'
import { messages } from '@echo/ui/messages/en'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { useRouter } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  callbackUrl?: string
  user?: AuthUser
}
export const LoginFlow: FunctionComponent<Props> = ({ callbackUrl, user }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  return (
    <NextIntlClientProvider messages={messages} locale={'en'}>
      <LoginStepContainer
        currentStep={currentStep}
        totalSteps={3}
        onContinue={() => {
          if (currentStep === 2) {
            if (!isNil(user)) {
              if (!isNilOrEmpty(callbackUrl)) {
                router.replace(callbackUrl)
              } else {
                router.replace('/')
              }
            }
            // TODO Handle error here
          } else {
            setCurrentStep((prevState) => prevState + 1)
          }
        }}
        user={user}
      />
    </NextIntlClientProvider>
  )
}
