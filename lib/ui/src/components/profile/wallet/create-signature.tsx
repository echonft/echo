import { addWalletFetcher } from '@echo/api/services/fetcher/add-wallet-fetcher'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { Wallet } from '@echo/model/types/wallet'
import { WalletConnectButton } from '@echo/ui/components/profile/wallet/wallet-connect-button'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import type { HexString } from '@echo/utils/types/hex-string'
import { captureException } from '@sentry/nextjs'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'
import { SiweMessage } from 'siwe'
import useSWRMutation from 'swr/mutation'
import { useSignMessage } from 'wagmi'

interface Props {
  nonce: string
  address: HexString
  chainId: number
  token: string
}

export const CreateSignature: FunctionComponent<Props> = ({ nonce, address, chainId, token }) => {
  const t = useTranslations('profile.wallet.button')
  const tErr = useTranslations('error.profile')
  const { show } = useAlertStore()
  const siweMessage = new SiweMessage({
    domain: window.location.host,
    address,
    statement: 'Sign this message to add your wallet to Echo',
    uri: window.location.origin,
    version: '1',
    chainId: chainId,
    nonce
  })
  const { isLoading, signMessageAsync, variables } = useSignMessage()
  const { trigger, isMutating } = useSWRMutation<
    EmptyResponse,
    Error,
    string,
    { wallet: Wallet; message: string; signature: HexString; token: string }
  >(
    `add-wallet-${address}-${chainId}`,
    (_key, { arg: { wallet, message, signature, token } }) => addWalletFetcher({ wallet, message, signature }, token),
    {
      onError: (err: Error) => {
        captureException(err)
      }
    }
  )
  const loading = isLoading || isMutating

  return (
    <WalletConnectButton
      loading={isLoading || isMutating}
      onClick={() => {
        signMessageAsync({ message: siweMessage.prepareMessage() })
          .then((signature) => {
            void trigger({ wallet: { address, chainId }, message: variables!.message, signature, token })
          })
          .catch((err) => {
            captureException(err)
            show({ severity: CalloutSeverity.ERROR, message: tErr('signing') })
          })
      }}
      label={loading ? t('signing.label') : t('add.label')}
    />
  )
}
