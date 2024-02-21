import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import type { Wallet } from '@echo/model/types/wallet'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useAccount } from '@echo/ui/hooks/use-account'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import type { AccountResult } from '@echo/web3-dom/types/account-result'
import type { SignNonceArgs } from '@echo/web3-dom/types/sign-nonce-args'
import type { SignNonceResult } from '@echo/web3-dom/types/sign-nonce-result'
import { useTranslations } from 'next-intl'
import { either, includes, isNil, modify, pick, pipe, toLower } from 'ramda'
import { useEffect, useMemo, useState } from 'react'
import { mutate } from 'swr'

export function useConnectWallet(wallets: Nullable<Wallet[]>) {
  const t = useTranslations('error.profile')
  const { addWallet, disconnectWallet, getNonce, signNonce, switchChain } = useDependencies()
  const account = useAccount()
  const wallet: Nullable<Wallet> = useMemo(() => {
    if (either(propIsNil('address'), propIsNil('chainId'))(account)) {
      return undefined
    }
    return pipe<
      [AccountResult & Record<'address', HexString> & Record<'chainId', number>],
      Wallet & Record<'address', HexString>,
      Wallet
    >(
      pick(['address', 'chainId']),
      modify('address', toLower<HexString>)
    )(account)
  }, [account])
  const [walletLinked, setWalletLinked] = useState(false)

  // triggers
  const { trigger: getNonceTrigger } = useSWRTrigger<NonceResponse, never>({
    key: SWRKeys.profile.nonce.get,
    fetcher: getNonce,
    onSuccess: (response) => {
      void signNonceTrigger({
        domain: window.location.hostname,
        uri: window.location.origin,
        nonce: response.nonce,
        wallet: wallet!
      })
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: t('addWallet') },
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
        setWalletLinked(true)
      })
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: t('addWallet') },
      onError: () => {
        void disconnectWallet()
      }
    }
  })
  const { trigger: signNonceTrigger } = useSWRTrigger<SignNonceResult, SignNonceArgs>({
    key: SWRKeys.profile.nonce.sign,
    fetcher: signNonce,
    onSuccess: ({ message, signature }) => {
      void addWalletTrigger({ wallet: wallet!, message, signature })
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: t('signing') },
      onError: () => {
        void disconnectWallet()
      }
    }
  })

  // when connected, check if wallet is linked and if not, add it
  useEffect(() => {
    if (!isNil(account.address) && account.status === 'connected') {
      if (isNil(account.chain)) {
        void switchChain()
      } else if (!isNil(wallets) && !walletLinked) {
        if (includes(wallet, wallets)) {
          setWalletLinked(true)
        } else {
          void getNonceTrigger()
        }
      }
    }
  }, [account, getNonceTrigger, switchChain, wallet, walletLinked, wallets])

  return { account, walletLinked }
}
