import { clsx } from 'clsx'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'
import { useState } from 'react'

export const ConnectButton: FunctionComponent = () => {
  const t = useTranslations('layout.header.button')
  const [connecting, setConnecting] = useState(false)
  return (
    <button
      disabled={connecting}
      onClick={() => {
        setConnecting(true)
        void signIn('discord')
      }}
      className={clsx('btn-gradient', 'group', 'btn-size-alt', connecting && 'animate-pulse')}
    >
      <span className={clsx('prose-label-sm-semi', 'btn-label-gradient')}>
        {connecting ? t('connecting.label') : t('connect.label')}
      </span>
    </button>
  )
}
