'use client'
import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'

export const HeaderLoginButton: FunctionComponent = () => {
  const t = useTranslations('layout.header.button')
  const { logger, signIn } = useDependencies()
  const [loggingIn, setLoggingIn] = useState(false)
  return (
    <button
      disabled={loggingIn}
      className={clsx('btn-auth', loggingIn && 'animate-pulse')}
      onClick={() => {
        setLoggingIn(true)
        signIn()
          .then(() => {
            setLoggingIn(false)
          })
          .catch((err: unknown) => {
            logger?.error({ err }, 'sign in error')
          })
      }}
    >
      <DiscordIconSvg width={24} />
      <span className={clsx('btn-label-auth')}>{t('login')}</span>
    </button>
  )
}
