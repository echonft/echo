'use client'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { useSettingsStore } from '@echo/ui/hooks/use-settings-store'
import { clsx } from 'clsx'
import { usePathname } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { stringify } from 'querystring'
import { concat } from 'ramda'
import { type FunctionComponent, useState } from 'react'

export const ConnectButton: FunctionComponent = () => {
  const t = useTranslations('layout.header.button')
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const { hasLoggedInOnce } = useSettingsStore()
  // If user has never logged in, take them to the login flow
  if (!hasLoggedInOnce) {
    return (
      <InternalLink
        path={
          pathname === linkProvider.auth.signIn.get()
            ? '/auth/signin'
            : concat('/auth/signin?', stringify({ callbackUrl: pathname }))
        }
      >
        <button className={clsx('btn-gradient', 'group', 'btn-size-alt')}>
          <span className={clsx('prose-label-sm-semi', 'btn-label-gradient')}>{t('connect.label')}</span>
        </button>
      </InternalLink>
    )
  }
  return (
    <button
      disabled={loading}
      onClick={() => {
        setLoading(true)
        void signIn('discord')
      }}
      className={clsx('btn-gradient', 'group', 'btn-size-alt', loading && 'animate-pulse')}
    >
      <span className={clsx('prose-label-sm-semi', 'btn-label-gradient')}>
        {loading ? t('connecting.label') : t('connect.label')}
      </span>
    </button>
  )
}
