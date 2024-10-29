import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import { walletFromContract } from '@echo/model/helpers/wallet/wallet-from-contract'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { captureAndLogError } from '@echo/ui/helpers/capture-and-log-error'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { AccountStatus } from '@echo/web3-dom/constants/account-status'
import type { AccountResult } from '@echo/web3-dom/services/get-account'
import type { SignNonceArgs, SignNonceResult } from '@echo/web3-dom/services/sign-nonce'
import { useTranslations } from 'next-intl'
import { andThen, includes, isNil, pipe, prop } from 'ramda'
import { useEffect, useMemo, useState } from 'react'
import useSWR, { mutate } from 'swr'

export function useWallet(account: AccountResult) {
  const t = useTranslations('error.profile')
  const { addWallet, disconnectWallet, getNonce, getWallets, signNonce, switchChain } = useDependencies()
  const { address, chain, status } = account
  const wallet = useMemo(() => {
    if (!isNil(address) && !isNil(chain)) {
      return walletFromContract({ address, chain })
    }
    return undefined
  }, [address, chain])
  const [walletValid, setWalletValid] = useState(false)
  const { data: wallets } = useSWR(
    SWRKeys.profile.wallet.get,
    (_key: string) => {
      return pipe(getWallets, andThen(prop('wallets')))()
    },
    {
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 500,
      revalidateOnMount: true,
      onError(err) {
        void disconnectWallet()
        captureAndLogError(err, {
          logObject: {
            hook: useWallet.name,
            fetcher: getWallets.name
          },
          severity: 'warning'
        })
      }
    }
  )
  // triggers
  const { trigger: getNonceTrigger } = useSWRTrigger<NonceResponse, never>({
    key: SWRKeys.profile.nonce.get,
    fetcher: getNonce,
    onSuccess: (response) => {
      if (!isNil(address) && !isNil(chain)) {
        void signNonceTrigger({
          address,
          chain,
          domain: window.location.origin,
          uri: window.location.origin,
          nonce: response.nonce
        })
      }
    },
    onError: {
      alert: {
        severity: CalloutSeverity.Error,
        message: t('addWallet')
      },
      onError: () => {
        void disconnectWallet()
      },
      loggerContext: {
        hook: useWallet.name,
        fetcher: getNonce.name
      }
    }
  })
  const { trigger: addWalletTrigger } = useSWRTrigger<WalletsResponse, AddWalletRequest>({
    key: SWRKeys.profile.wallet.add,
    fetcher: addWallet,
    onSuccess: (response) => {
      void mutate(SWRKeys.profile.wallet.get, response.wallets).finally(() => {
        setWalletValid(true)
      })
    },
    onError: {
      alert: {
        severity: CalloutSeverity.Error,
        message: t('addWallet')
      },
      onError: () => {
        void disconnectWallet()
      },
      loggerContext: {
        hook: useWallet.name,
        fetcher: addWallet.name
      }
    }
  })
  const { trigger: signNonceTrigger } = useSWRTrigger<SignNonceResult, SignNonceArgs>({
    key: SWRKeys.profile.nonce.sign,
    fetcher: signNonce,
    onSuccess: ({ message, signature }) => {
      if (!isNil(address) && !isNil(chain)) {
        void addWalletTrigger({
          address,
          chain,
          message,
          signature
        })
      }
    },
    onError: {
      alert: {
        severity: CalloutSeverity.Error,
        message: t('signing')
      },
      onError: () => {
        void disconnectWallet()
      },
      loggerContext: {
        hook: useWallet.name,
        fetcher: signNonce.name
      }
    }
  })

  // when connected, check if wallet is linked and if not, add it
  useEffect(() => {
    if (status === AccountStatus.Connected) {
      if (isNil(chain)) {
        void switchChain()
      } else if (!isNil(wallets) && !walletValid) {
        if (includes(wallet, wallets)) {
          setWalletValid(true)
        } else {
          void getNonceTrigger()
        }
      }
    }
  }, [chain, getNonceTrigger, status, switchChain, wallet, walletValid, wallets])

  return walletValid
}
