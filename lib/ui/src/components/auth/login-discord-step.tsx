'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import { LoginStepLayout } from '@echo/ui/components/auth/layout/login-step-layout'
import { LoginDiscordConnect } from '@echo/ui/components/auth/login-discord-connect'
import type { Nullable } from '@echo/utils/types/nullable'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  user: Nullable<AuthUser>
  onContinue?: VoidFunction
}

export const LoginDiscordStep: FunctionComponent<Props> = ({ user, onContinue }) => {
  const t = useTranslations('auth.step0')
  return (
    <LoginStepLayout
      title={t('title')}
      subtitle={t('subtitle')}
      btnLabel={t('continueBtn')}
      btnDisabled={isNil(user)}
      onBtnClick={onContinue}
    >
      <LoginDiscordConnect user={user} />
    </LoginStepLayout>
  )
}
