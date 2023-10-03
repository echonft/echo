'use client'
import { ShowIfNil } from '@echo/ui/components/base/utils/show-if-nil'
import { CreateSignature } from '@echo/ui/components/profile/wallet/create-signature'
import { NonceFetcher } from '@echo/ui/components/profile/wallet/nonce-fetcher'
import { WalletConnectButton } from '@echo/ui/components/profile/wallet/wallet-connect-button'
import { ConnectKitButton } from 'connectkit'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { FunctionComponent, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'

interface Props {
  token: string | undefined
}
export const ConnectWallet: FunctionComponent<Props> = ({ token }) => {
  const t = useTranslations('profile.wallet.button')
  const { address } = useAccount()
  const { chain } = useNetwork()
  const [nonce, setNonce] = useState<string>()
  // TODO Manage error
  const [, setNonceError] = useState<Error>()

  if (isNil(address) || isNil(nonce) || isNil(chain)) {
    return (
      <>
        <ShowIfNil checks={nonce}>
          <NonceFetcher token={token} onNonceReceived={setNonce} onNonceError={setNonceError} />
        </ShowIfNil>
        <ConnectKitButton.Custom>
          {({ isConnecting, show }) => (
            <WalletConnectButton
              loading={isNil(nonce)}
              onClick={show}
              label={isConnecting ? t('connecting.label') : t('connect.label')}
            />
          )}
        </ConnectKitButton.Custom>
      </>
    )
  }
  return <CreateSignature nonce={nonce} token={token} address={address} chainId={chain.id} />
}
