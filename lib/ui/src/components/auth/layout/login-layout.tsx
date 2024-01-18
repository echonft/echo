'use client'
import { addWallet } from '@echo/api/services/fetchers/add-wallet'
import { getNonce } from '@echo/api/services/fetchers/get-nonce'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import type { AuthUser } from '@echo/model/types/auth-user'
import { Login } from '@echo/ui/components/auth/login'
import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import { signNonce } from '@echo/web3/helpers/wagmi/fetchers/sign-nonce'
import { account } from '@echo/web3/helpers/wagmi/providers/account'
import { chain } from '@echo/web3/helpers/wagmi/providers/chain'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  callbackUrl?: string
  user: AuthUser | undefined
}

export const LoginLayout: FunctionComponent<Props> = ({ callbackUrl, user }) => {
  const router = useRouter()
  return (
    <div className={clsx('flex', 'justify-center')}>
      <Login
        fetcher={{
          addWallet,
          getNonce,
          signNonce
        }}
        provider={{
          account,
          chain,
          signIn: () => signIn('discord')
        }}
        renderConnectWallet={({ isConnecting, show }) => (
          <ConnectWalletButton isConnecting={isConnecting} onClick={show} />
        )}
        user={user}
        onFinish={() => {
          if (isNil(callbackUrl)) {
            router.replace(linkProvider.base.home.getUrl())
          } else {
            router.replace(callbackUrl)
          }
        }}
      />
    </div>
  )
}
