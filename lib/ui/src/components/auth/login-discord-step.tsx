'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import { LoginDiscordConnect } from '@echo/ui/components/auth/login-discord-connect'
import { LoginFlowContinueButton } from '@echo/ui/components/auth/login-flow-continue-button'
import { LoginFlowSubtitle } from '@echo/ui/components/auth/login-flow-subtitle'
import { LoginFlowTitle } from '@echo/ui/components/auth/login-flow-title'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  user: AuthUser | undefined
  onContinue?: VoidFunction
}

export const LoginDiscordStep: FunctionComponent<Props> = ({ user, onContinue }) => {
  const t = useTranslations('auth.step0')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-12', 'items-center')}>
      <LoginFlowTitle>{t('title')}</LoginFlowTitle>
      <div className={clsx('flex', 'flex-col', 'gap-2.5', 'items-center', 'px-2')}>
        <LoginFlowSubtitle>{t('subtitle')}</LoginFlowSubtitle>
        <LoginDiscordConnect user={user} />
      </div>
      <div className={clsx('flex', 'justify-end', 'w-full')}>
        <LoginFlowContinueButton
          disabled={isNil(onContinue) || isNil(user)}
          onClick={onContinue}
          label={t('continueBtn.label')}
        />
      </div>
    </div>
  )
}
