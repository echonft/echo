import { clsx } from 'clsx'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'

export const ConnectButton: FunctionComponent = () => {
  const t = useTranslations('layout.header.button')
  const [loading, setLoading] = useState(false)
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
