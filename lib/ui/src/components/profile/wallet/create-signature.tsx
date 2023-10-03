import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { AddWalletFetcher } from '@echo/ui/components/profile/wallet/add-wallet-fetcher'
import { WalletConnectButton } from '@echo/ui/components/profile/wallet/wallet-connect-button'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useCallback, useState } from 'react'
import { SiweMessage } from 'siwe'
import { useSignMessage } from 'wagmi'

interface Props {
  nonce: string
  address: string
  chainId: number
  token: string | undefined
}

export const CreateSignature: FunctionComponent<Props> = ({ nonce, address, chainId, token }) => {
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const t = useTranslations('profile.wallet.button')
  // FIXME Typing is not right because SiweMessage constructor can throw
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
  const siweMessage: SiweMessage = new SiweMessage({
    domain: window.location.host,
    address,
    statement: 'Sign this message to add your wallet to Echo',
    uri: window.location.origin,
    version: '1',
    chainId: chainId,
    nonce
  })
  const { data, isLoading, signMessage, variables } = useSignMessage()
  const loading = useCallback(() => isLoading || isFetching, [isLoading, isFetching])

  return (
    <>
      <HideIfNil
        checks={data}
        render={(signature) => (
          // TODO handle error
          // We can force unwrap variables because we have the message if we have the signature
          <AddWalletFetcher
            address={address}
            chainId={chainId}
            message={variables!.message}
            signature={signature}
            token={token}
            onWalletAdded={() => setIsFetching(false)}
            onWalletError={() => setIsFetching(false)}
          />
        )}
      />
      <WalletConnectButton
        loading={loading()}
        onClick={() => {
          setIsFetching(true)
          signMessage({ message: siweMessage.prepareMessage() })
        }}
        label={loading() ? t('signing.label') : t('add.label')}
      />
    </>
  )
}
