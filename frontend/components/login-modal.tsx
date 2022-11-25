import { LoginButton } from '@components/login-button'
import { Modal } from '@components/modal'
import { useIsLoggedIn } from '@lib/hooks/use-is-logged-in'
import { clsx } from 'clsx'
import { ConnectKitButton } from 'connectkit'
import { useTranslations } from 'next-intl'
import React from 'react'
import { useAccount } from 'wagmi'

export const LoginModal: React.FunctionComponent = () => {
  const t = useTranslations('Login')
  const isLoggedIn = useIsLoggedIn()
  const { isConnected } = useAccount()

  return (
    <Modal title={t('title')} description={t('description')}>
      <div className={clsx('flex', 'justify-center')}>
        {isConnected && !isLoggedIn ? <LoginButton /> : undefined}
        {!isConnected ? <ConnectKitButton /> : undefined}
      </div>
    </Modal>
  )
}
