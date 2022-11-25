import { LoginModal } from '@components/login-modal'
import { useIsLoggedIn } from '@lib/hooks/use-is-logged-in'
import { ConnectKitButton } from 'connectkit'
import { useTranslations } from 'next-intl'
import { isNil } from 'rambda'
import { FunctionComponent, PropsWithChildren } from 'react'
import { useAccount } from 'wagmi'

export const AuthPage: FunctionComponent<PropsWithChildren> = ({ children }) => {
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
