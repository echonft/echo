'use client'
import { linkProvider } from '@echo/api/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export const ConnectButton: FunctionComponent = () => {
  const t = useTranslations('layout.header.button')
  return (
    <InternalLink path={linkProvider.auth.signIn.get()}>
      <button className={clsx('btn-primary', 'group', 'gap-2.5', 'h-[1.875rem]', 'w-max', 'px-2.5')}>
        <span className={clsx('btn-label-primary')}>
          <DiscordIconSvg />
        </span>
        <span className={clsx('btn-label-primary', 'prose-label-xs', '!tracking-[0.015rem]')}>{t('login')}</span>
      </button>
    </InternalLink>
  )
}
