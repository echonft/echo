'use client'
import { linkProvider } from '@echo/api/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export const HeaderLoginButton: FunctionComponent = () => {
  const t = useTranslations('layout.header.button')
  return (
    <InternalLink path={linkProvider.auth.signIn.get()}>
      <button className={clsx('btn-auth')}>
        <DiscordIconSvg width={24} />
        <span className={clsx('btn-label-auth')}>{t('login')}</span>
      </button>
    </InternalLink>
  )
}
