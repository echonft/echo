'use client'
import type { User } from '@echo/model/types/user'
import { LoginStepLayout } from '@echo/ui/components/auth/layout/login-step-layout'
import { LoginDiscordConnect } from '@echo/ui/components/auth/login-discord-connect'
import type { Nullable } from '@echo/utils/types/nullable'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  user: Nullable<User>
  onContinue?: VoidFunction
}

export const LoginDiscordStep: FunctionComponent<Props> = ({ user, onContinue }) => {
  const t = useTranslations('auth.discord')
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
