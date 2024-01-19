'use client'
import { addWallet } from '@echo/api/services/fetchers/add-wallet'
import { getNonce } from '@echo/api/services/fetchers/get-nonce'
import type { AuthUser } from '@echo/model/types/auth-user'
import { ShowIfNilOrEmpty } from '@echo/ui/components/base/utils/show-if-nil-or-empty'
import { Web3Provider } from '@echo/ui/components/base/utils/web3-provider'
import { EmptyViewContent } from '@echo/ui/components/navigation/empty-view-content'
import { ConnectWalletButton } from '@echo/ui/components/wallet/connect-wallet-button'
import { WalletButton } from '@echo/ui/components/wallet/wallet-button'
import { signNonce } from '@echo/web3/helpers/wagmi/fetchers/sign-nonce'
import { account } from '@echo/web3/helpers/wagmi/providers/account'
import { chain } from '@echo/web3/helpers/wagmi/providers/chain'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  user: AuthUser
}

export const ProfileNftsEmpty: FunctionComponent<Props> = ({ user }) => {
  const t = useTranslations('profile.empty.items')
  return (
    <EmptyViewContent message={t('message')}>
      <ShowIfNilOrEmpty checks={user.wallets}>
        <Web3Provider>
          <WalletButton
            fetcher={{ addWallet, getNonce, signNonce }}
            provider={{ account, chain }}
            renderConnect={({ isConnecting, show }) => (
              <ConnectWalletButton isConnecting={isConnecting} onClick={show} />
            )}
            user={user}
          />
        </Web3Provider>
      </ShowIfNilOrEmpty>
    </EmptyViewContent>
  )
}
