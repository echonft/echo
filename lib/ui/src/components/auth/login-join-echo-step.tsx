'use client'
import { LoginStepLayout } from '@echo/ui/components/auth/layout/login-step-layout'
import { LoginJoinDiscordButton } from '@echo/ui/components/auth/login-join-discord-button'
import { ExternalLink } from '@echo/ui/components/base/external-link'
import { DISCORD_INVITE_LINK } from '@echo/utils/constants/discord-invite-link'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  username: string
  onSkip?: VoidFunction
}

export const LoginJoinEchoStep: FunctionComponent<Props> = ({ username, onSkip }) => {
  const t = useTranslations('auth.step1')
  return (
    <LoginStepLayout
      title={t('title', { username })}
      subtitle={t('subtitle')}
      btnLabel={t('continueBtn')}
      onBtnClick={onSkip}
    >
      <div className={clsx('w-full')}>
        <ExternalLink href={DISCORD_INVITE_LINK} onClick={onSkip}>
          <LoginJoinDiscordButton>{t('joinBtn')}</LoginJoinDiscordButton>
        </ExternalLink>
      </div>
    </LoginStepLayout>
  )
}
