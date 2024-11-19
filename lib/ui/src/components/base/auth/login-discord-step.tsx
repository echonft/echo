'use client'
import { LoginStepLayout } from '@echo/ui/components/base/auth/layout/login-step-layout'
import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import { discordOAuthUrl } from '@echo/ui/constants/discord-oauth-url'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import type { FunctionComponent } from 'react'

export const LoginDiscordStep: FunctionComponent = () => {
  const router = useRouter()
  const t = useTranslations('auth.discord')
  return (
    <LoginStepLayout title={t('title')}>
      <button
        className={clsx('btn-auth')}
        onClick={() => {
          router.push(discordOAuthUrl())
        }}
      >
        <span className={'text-white'}>
          <DiscordIconSvg width={24} height={24} />
        </span>
        <span className={clsx('btn-label-auth')}>{t('btn')}</span>
      </button>
    </LoginStepLayout>
  )
}
