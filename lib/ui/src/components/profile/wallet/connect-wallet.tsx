'use client'
import { getNonceFetcher } from '@echo/api/services/fetcher/get-nonce-fetcher'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import { CreateSignature } from '@echo/ui/components/profile/wallet/create-signature'
import { WalletConnectButton } from '@echo/ui/components/profile/wallet/wallet-connect-button'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { ConnectKitButton } from 'connectkit'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'
import useSWR from 'swr'
import { useAccount, useNetwork } from 'wagmi'

interface Props {
  token: string
}
export const ConnectWallet: FunctionComponent<Props> = ({ token }) => {
  const t = useTranslations('profile.wallet.button')
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { data } = useSWR<NonceResponse, Error, { name: string; token: string }>(
    { name: 'nonce', token },
    ({ token }) => getNonceFetcher(token),
    {
      onError: errorCallback()
    }
  )

  if (isNil(address) || isNil(data) || isNil(chain)) {
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
  return <CreateSignature nonce={data.nonce} token={token} address={address} chainId={chain.id} />
}
