'use-client'
import { clsx } from 'clsx'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { FunctionComponent, MouseEventHandler } from 'react'

interface Props {
  onConnectClick?: MouseEventHandler
}

export const ConnectButton: FunctionComponent<Props> = () => {
  const t = useTranslations('layout.header')
  return (
    <button
      onClick={() => {
        void signIn('discord')
      }}
      className={clsx('btn-gradient', 'group', 'rounded-lg', 'w-[9.875rem]', 'py-1.5')}
    >
      <span className={clsx('prose-label-sm-semi', 'btn-label-gradient')}>{t('connectButton')}</span>
    </button>
  )
}
