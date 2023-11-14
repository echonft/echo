'use client'
import type { AddWalletArgs } from '@echo/api/services/fetcher/add-wallet'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { TokenArgs } from '@echo/api/types/token-args'
import { CreateSignature } from '@echo/ui/components/profile/wallet/create-signature'
import { WalletConnectButton } from '@echo/ui/components/profile/wallet/wallet-connect-button'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { SignNonceArgs } from '@echo/web3/helpers/wagmi/fetcher/sign-nonce'
import type { AccountProvider } from '@echo/web3/helpers/wagmi/provider/account'
import type { ChainProvider } from '@echo/web3/helpers/wagmi/provider/chain'
import { ConnectKitButton } from 'connectkit'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'
import useSWR from 'swr'

interface Props {
  fetcher: {
    addWallet: Fetcher<EmptyResponse, AddWalletArgs>
    getNonce: Fetcher<NonceResponse, TokenArgs>
    signNonce: Fetcher<HexString, SignNonceArgs>
  }
  provider: {
    account: AccountProvider
    chain: ChainProvider
  }
  token: string
}

export const ConnectWallet: FunctionComponent<Props> = ({ fetcher, provider, token }) => {
  const t = useTranslations('profile.wallet.button')
  const { address } = provider.account()
  const chainId = provider.chain()
  const { data } = useSWR<NonceResponse, Error, TokenArgs & Record<'name', string>>(
    { name: SWRKeys.profile.nonce.get, token },
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
  return <CreateSignature nonce={data.nonce} token={token} address={address} chainId={chainId} fetcher={fetcher} />
}
