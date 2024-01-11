'use client'
import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { Wallet } from '@echo/model/types/wallet'
import { CreateSignature } from '@echo/ui/components/profile/wallet/create-signature'
import { WalletConnectButton } from '@echo/ui/components/profile/wallet/wallet-connect-button'
import { UserWalletButton } from '@echo/ui/components/shared/user-wallet-button'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { SignNonceArgs, SignNonceResult } from '@echo/web3/helpers/wagmi/fetcher/sign-nonce'
import type { AccountProvider } from '@echo/web3/helpers/wagmi/provider/account'
import type { ChainProvider } from '@echo/web3/helpers/wagmi/provider/chain'
import { ConnectKitButton } from 'connectkit'
import { useTranslations } from 'next-intl'
import { includes, isNil, toLower } from 'ramda'
import { type FunctionComponent } from 'react'
import useSWRImmutable from 'swr/immutable'

interface Props {
  fetcher: {
    addWallet: Fetcher<EmptyResponse, AddWalletRequest>
    getNonce: Fetcher<NonceResponse, never>
    signNonce: Fetcher<SignNonceResult, SignNonceArgs>
  }
  provider: {
    account: AccountProvider
    chain: ChainProvider
  }
  wallets: Wallet[]
}

export const ConnectWallet: FunctionComponent<Props> = ({ fetcher, provider, wallets }) => {
  const t = useTranslations('profile.wallet.button')
  const { address } = provider.account()
  const chainId = provider.chain()
  const { data } = useSWRImmutable<NonceResponse, Error, Record<'name', string>>(
    { name: SWRKeys.profile.nonce.get },
    () => fetcher.getNonce(),
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
  if (includes({ address, chainId }, wallets)) {
    return <UserWalletButton wallet={{ address: toLower(address), chainId: chainId }} />
  }
  return <CreateSignature nonce={data.nonce} wallet={{ address: toLower(address), chainId }} fetcher={fetcher} />
}
