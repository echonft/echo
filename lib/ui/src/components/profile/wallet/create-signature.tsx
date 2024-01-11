import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { Wallet } from '@echo/model/types/wallet'
import { WalletConnectButton } from '@echo/ui/components/profile/wallet/wallet-connect-button'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { SignNonceArgs, SignNonceResult } from '@echo/web3/helpers/wagmi/fetcher/sign-nonce'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  nonce: string
  wallet: Wallet
  fetcher: {
    addWallet: Fetcher<EmptyResponse, AddWalletRequest>
    signNonce: Fetcher<SignNonceResult, SignNonceArgs>
  }
}

export const CreateSignature: FunctionComponent<Props> = ({ nonce, wallet, fetcher }) => {
  const t = useTranslations('profile.wallet.button')
  const tErr = useTranslations('error.profile')
  const { trigger: addWalletTrigger, isMutating: addWalletMutating } = useSWRTrigger<EmptyResponse, AddWalletRequest>({
    key: SWRKeys.profile.wallet.add(wallet),
    fetcher: fetcher.addWallet
  })
  const { trigger: signNonceTrigger, isMutating: signNonceMutating } = useSWRTrigger<SignNonceResult, SignNonceArgs>({
    key: SWRKeys.profile.nonce.sign,
    fetcher: fetcher.signNonce,
    onSuccess: ({ message, signature }) => {
      void addWalletTrigger({ wallet, message, signature })
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: tErr('signing') }
    }
  })
  const loading = signNonceMutating || addWalletMutating

  return (
    <WalletConnectButton
      loading={loading}
      onClick={() => {
        void signNonceTrigger({
          domain: window.location.host,
          uri: window.location.origin,
          nonce,
          wallet
        })
      }}
      label={loading ? t('signing.label') : t('add.label')}
    />
  )
}
