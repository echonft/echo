'use client'
import { addWallet } from '@echo/api/services/fetcher/add-wallet'
import { getNonce } from '@echo/api/services/fetcher/get-nonce'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { Wallet } from '@echo/model/types/wallet'
import { Login } from '@echo/ui/components/auth/login'
import { WalletConnectButton } from '@echo/ui/components/profile/wallet/wallet-connect-button'
import { signNonce } from '@echo/web3/helpers/wagmi/fetcher/sign-nonce'
import { account } from '@echo/web3/helpers/wagmi/provider/account'
import { chain } from '@echo/web3/helpers/wagmi/provider/chain'
import { data } from 'autoprefixer'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  callbackUrl?: string
  user: AuthUser | undefined
  wallets: Wallet[]
}

export const LoginLayout: FunctionComponent<Props> = ({ callbackUrl, user, wallets }) => {
  const t = useTranslations('profile.wallet.button')
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
          <WalletConnectButton
            loading={isNil(data)}
            onClick={show}
            label={isConnecting ? t('connecting.label') : t('connect.label')}
          />
        )}
        user={user}
        wallets={wallets}
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
