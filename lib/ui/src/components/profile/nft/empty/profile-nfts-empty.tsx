import { addWallet } from '@echo/api/services/fetcher/add-wallet'
import { getNonce } from '@echo/api/services/fetcher/get-nonce'
import type { AuthUser } from '@echo/model/types/auth-user'
import { ShowIfNilOrEmpty } from '@echo/ui/components/base/utils/show-if-nil-or-empty'
import { Web3Provider } from '@echo/ui/components/base/utils/web3-provider'
import { EmptyViewContent } from '@echo/ui/components/layout/navigation/empty-view-content'
import { ConnectWallet } from '@echo/ui/components/profile/wallet/connect-wallet'
import { signNonce } from '@echo/web3/helpers/wagmi/fetcher/sign-nonce'
import { account } from '@echo/web3/helpers/wagmi/provider/account'
import { chain } from '@echo/web3/helpers/wagmi/provider/chain'
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
          <ConnectWallet fetcher={{ addWallet, getNonce, signNonce }} provider={{ account, chain }} user={user} />
        </Web3Provider>
      </ShowIfNilOrEmpty>
    </EmptyViewContent>
  )
}
