import { getTranslator } from '../../../messages/get-translator'
import { clsx } from 'clsx'
import { signIn } from 'next-auth/react'
import { FunctionComponent } from 'react'

export const ConnectButton: FunctionComponent = () => {
  const t = getTranslator()
  return (
    <button
      onClick={() => {
        void signIn('discord')
      }}
      className={clsx('btn-gradient', 'group', 'rounded-lg', 'w-[9.875rem]', 'py-1.5')}
    >
      <span className={clsx('prose-label-sm-semi', 'btn-label-gradient')}>{t('layout.header.connectButton')}</span>
    </button>
  )
}
