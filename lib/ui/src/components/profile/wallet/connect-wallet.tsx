'use client'
import type { AddWalletArgs } from '@echo/api/services/fetcher/add-wallet'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { TokenArgs } from '@echo/api/types/token-args'
import { userHasWallet } from '@echo/model/helpers/user/user-has-wallet'
import type { AuthUser } from '@echo/model/types/auth-user'
import { CreateSignature } from '@echo/ui/components/profile/wallet/create-signature'
import { WalletConnectButton } from '@echo/ui/components/profile/wallet/wallet-connect-button'
import { UserWallet } from '@echo/ui/components/shared/user-wallet'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { SignNonceArgs, SignNonceResult } from '@echo/web3/helpers/wagmi/fetcher/sign-nonce'
import type { AccountProvider } from '@echo/web3/helpers/wagmi/provider/account'
import type { ChainProvider } from '@echo/web3/helpers/wagmi/provider/chain'
import { ConnectKitButton } from 'connectkit'
import { useTranslations } from 'next-intl'
import { isNil, toLower } from 'ramda'
import { type FunctionComponent } from 'react'
import useSWRImmutable from 'swr/immutable'

interface Props {
  fetcher: {
    addWallet: Fetcher<EmptyResponse, AddWalletArgs>
    getNonce: Fetcher<NonceResponse, TokenArgs>
    signNonce: Fetcher<SignNonceResult, SignNonceArgs>
  }
  provider: {
    account: AccountProvider
    chain: ChainProvider
  }
  user: AuthUser
}

export const ConnectWallet: FunctionComponent<Props> = ({ fetcher, provider, user }) => {
  const t = useTranslations('profile.wallet.button')
  const { address } = provider.account()
  const chainId = provider.chain()
  const userHasCurrentWallet =
    !isNil(address) && !isNil(chainId) && userHasWallet(user, { address: toLower(address), chainId })
  const { data } = useSWRImmutable<NonceResponse, Error, TokenArgs & Record<'name', string>>(
    { name: SWRKeys.profile.nonce.get, token: user.sessionToken },
    fetcher.getNonce,
    {
      onError: errorCallback()
    }
  )

  if (isNil(address) || isNil(data) || isNil(chainId)) {
    return (
      <ConnectKitButton.Custom>
        {({ isConnecting, show }) => (
          <WalletConnectButton
            loading={isNil(data)}
            onClick={show}
            label={isConnecting ? t('connecting.label') : t('connect.label')}
          />
        )}
      </ConnectKitButton.Custom>
    )
  }
  if (!userHasCurrentWallet) {
    return (
      <CreateSignature
        nonce={data.nonce}
        token={user.sessionToken}
        wallet={{ address: toLower(address), chainId }}
        fetcher={fetcher}
      />
    )
  }
  return <UserWallet wallet={{ address: toLower(address), chainId: chainId }} />
}
