import { LoginModal } from '@components/login-modal'
import { useIsLoggedIn } from '@lib/hooks/use-is-logged-in'
import { ConnectKitButton } from 'connectkit'
import { isNil } from 'ramda'
import React, { PropsWithChildren } from 'react'
import { useTranslations } from 'use-intl'
import { useAccount } from 'wagmi'

export const AuthPage: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const t = useTranslations('Auth')
  const isLoggedIn = useIsLoggedIn()
  const { isConnected } = useAccount()
  if (isNil(isLoggedIn) || isNil(isConnected)) {
    return (
      <div>
        <span>{t('loading')}</span>
      </div>
    )
  }
  return (
    <div>
      {!isConnected && <ConnectKitButton />}
      {!isLoggedIn && isConnected && <LoginModal />}
      {isLoggedIn && isConnected && children}
    </div>
  )
}
