import { LoginModal } from '@components/login-modal'
import { useIsLoggedIn } from '@lib/hooks/use-is-logged-in'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import React, { PropsWithChildren } from 'react'
import { useAccount } from 'wagmi'

export const AuthPage: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const t = useTranslations('Auth')
  const isLoggedIn = useIsLoggedIn()
  const { isConnected } = useAccount()
  if (isNil(isLoggedIn) || isNil(isConnected)) {
    // TODO Design loading
    return (
      <div>
        <span>{t('loading')}</span>
      </div>
    )
  }
  return (
    <div>
      {(!isLoggedIn || !isConnected) && <LoginModal />}
      {isLoggedIn && isConnected && children}
    </div>
  )
}
