import { getTranslator } from '@echo/ui/messages/get-translator'
import { clsx } from 'clsx'
import { signIn } from 'next-auth/react'
import type { FunctionComponent } from 'react'
import { useState } from 'react'

export const ConnectButton: FunctionComponent = () => {
  const t = getTranslator()
  const [loading, setLoading] = useState(false)
  return (
    <button
      disabled={loading}
      onClick={() => {
        setLoading(true)
        void signIn('discord')
      }}
      className={clsx('btn-gradient', 'group', 'rounded-lg', 'w-[9.875rem]', 'py-1.5', loading && 'animate-pulse')}
    >
      <span className={clsx('prose-label-sm-semi', 'btn-label-gradient')}>{t('layout.header.connectButton')}</span>
    </button>
  )
}
