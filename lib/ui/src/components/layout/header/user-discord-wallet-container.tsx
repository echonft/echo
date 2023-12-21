import { addWallet } from '@echo/api/services/fetcher/add-wallet'
import { getNonce } from '@echo/api/services/fetcher/get-nonce'
import type { AuthUser } from '@echo/model/types/auth-user'
import { ConnectWallet } from '@echo/ui/components/profile/wallet/connect-wallet'
import { UserTagPictureButton } from '@echo/ui/components/user/tag/user-tag-picture-button'
import { signNonce } from '@echo/web3/helpers/wagmi/fetcher/sign-nonce'
import { account } from '@echo/web3/helpers/wagmi/provider/account'
import { chain } from '@echo/web3/helpers/wagmi/provider/chain'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  user: AuthUser
}

export const UserDiscordWalletContainer: FunctionComponent<Props> = ({ user }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'justify-center', 'gap-4')}>
      <ConnectWallet fetcher={{ addWallet, getNonce, signNonce }} provider={{ account, chain }} user={user} />
      <UserTagPictureButton user={user} />
    </div>
  )
}
