'use client'
import { LoginFlowContinueButton } from '@echo/ui/components/auth/login-flow-continue-button'
import { LoginFlowSubtitle } from '@echo/ui/components/auth/login-flow-subtitle'
import { LoginFlowTitle } from '@echo/ui/components/auth/login-flow-title'
import { LoginJoinDiscordButton } from '@echo/ui/components/auth/login-join-discord-button'
import { ExternalLink } from '@echo/ui/components/base/link/external-link'
import { DISCORD_INVITE_LINK } from '@echo/utils/constants/discord-invite-link'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  username: string
  onContinue?: VoidFunction
}

export const LoginJoinEchoStep: FunctionComponent<Props> = ({ username, onContinue }) => {
  const t = useTranslations('auth.step1')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-12', 'items-center')}>
      <LoginFlowTitle>{t('title', { username })}</LoginFlowTitle>
      <div className={clsx('flex', 'flex-col', 'gap-12', 'items-center')}>
        <LoginFlowSubtitle>{t('subtitle')}</LoginFlowSubtitle>
        <div className={clsx('w-full')}>
          <ExternalLink href={DISCORD_INVITE_LINK}>
            <LoginJoinDiscordButton>{t('btn.label')}</LoginJoinDiscordButton>
          </ExternalLink>
        </div>
      </div>
      <div className={clsx('flex', 'justify-end', 'w-full')}>
        <LoginFlowContinueButton disabled={false} onClick={onContinue} label={t('continueBtn.label')} />
      </div>
    </div>
  )
}
