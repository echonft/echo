'use client'
import { LoginStepLayout } from '@echo/ui/components/base/auth/layout/login-step-layout'
import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import { discordOAuthUrl } from '@echo/ui/constants/discord-oauth-url'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import type { FunctionComponent } from 'react'

interface Props {
  discordClientId: string
}

export const LoginDiscordStep: FunctionComponent<Props> = ({ discordClientId }) => {
  const router = useRouter()
  const t = useTranslations('auth.discord')
  return (
    <LoginStepLayout title={t('title')}>
      <button
        className={clsx('btn-primary', 'group')}
        onClick={() => {
          router.push(discordOAuthUrl(discordClientId))
        }}
      >
        <div className={clsx('btn-label-with-icon-layout', 'btn-label-primary')}>
          <DiscordIconSvg height={18} />
          <span>{t('btn')}</span>
        </div>
      </button>
    </LoginStepLayout>
  )
}
