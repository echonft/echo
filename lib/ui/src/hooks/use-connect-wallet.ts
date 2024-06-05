import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import type { Wallet } from '@echo/model/types/wallet'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import { isEvmChain } from '@echo/utils/helpers/chains/is-evm-chain'
import type { AccountResult } from '@echo/web3-dom/types/account-result'
import type { SignNonceArgs } from '@echo/web3-dom/types/sign-nonce-args'
import type { SignNonceResult } from '@echo/web3-dom/types/sign-nonce-result'
import { useTranslations } from 'next-intl'
import { includes, isNil, map, pipe, prop } from 'ramda'
import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'

function walletsInclude(wallets: Wallet[], wallet: Wallet) {
  if (isEvmChain(wallet.chain)) {
    return pipe<[Wallet[]], string[], boolean>(map(prop('address')), includes(wallet.address))(wallets)
  }
  return includes(wallet, wallets)
}

export function useConnectWallet(account: AccountResult) {
  const t = useTranslations('error.profile')
  const { addWallet, disconnectWallet, getNonce, getWallets, signNonce, switchChain } = useDependencies()
  const { status, wallet } = account
  const [connected, setConnected] = useState(false)
  const { data: walletsResponse } = useSWR(
    SWRKeys.profile.wallet.get,
    (_key: string) => {
      return getWallets()
    },
    {
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 500,
      revalidateOnMount: true,
      onError: (_error) => {
        void disconnectWallet()
      }
    }
  )
  // triggers
  const { trigger: getNonceTrigger } = useSWRTrigger<NonceResponse, never>({
    key: SWRKeys.profile.nonce.get,
    fetcher: getNonce,
    onSuccess: (response) => {
      void signNonceTrigger({
        domain: window.location.origin,
        uri: window.location.origin,
        nonce: response.nonce,
        wallet: wallet!
      })
    },
    onError: {
      alert: {
        severity: CALLOUT_SEVERITY_ERROR,
        message: t('addWallet')
      },
      onError: () => {
        void disconnectWallet()
      }
    }
  })
  const { trigger: addWalletTrigger } = useSWRTrigger<WalletsResponse, AddWalletRequest>({
    key: SWRKeys.profile.wallet.add,
    fetcher: addWallet,
    onSuccess: (response) => {
      void mutate(SWRKeys.profile.wallet.get, response.wallets).finally(() => {
        setConnected(true)
      })
    },
    onError: {
      alert: {
        severity: CALLOUT_SEVERITY_ERROR,
        message: t('addWallet')
      },
      onError: () => {
        void disconnectWallet()
      }
    }
  })
  const { trigger: signNonceTrigger } = useSWRTrigger<SignNonceResult, SignNonceArgs>({
    key: SWRKeys.profile.nonce.sign,
    fetcher: signNonce,
    onSuccess: ({ message, signature }) => {
      void addWalletTrigger({
        wallet: wallet!,
        message,
        signature
      })
    },
    onError: {
      alert: {
        severity: CALLOUT_SEVERITY_ERROR,
        message: t('signing')
      },
      onError: () => {
        void disconnectWallet()
      }
    }
  })

  // when connected, check if wallet is linked and if not, add it
  useEffect(() => {
    if (status === 'connected') {
      if (isNil(wallet)) {
        void switchChain()
      } else if (!isNil(walletsResponse?.wallets) && !connected) {
        if (walletsInclude(walletsResponse.wallets, wallet)) {
          setConnected(true)
        } else {
          void getNonceTrigger()
        }
      }
    }
  }, [getNonceTrigger, status, switchChain, wallet, connected, walletsResponse])

  return connected
}
