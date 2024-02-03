import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import type { Wallet } from '@echo/model/types/wallet'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useAccount } from '@echo/ui/hooks/use-account'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { WalletLinkedStatus } from '@echo/ui/types/wallet-linked-status'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import type { AccountResult } from '@echo/web3/types/account-result'
import type { SignNonceArgs } from '@echo/web3/types/sign-nonce-args'
import type { SignNonceResult } from '@echo/web3/types/sign-nonce-result'
import { useTranslations } from 'next-intl'
import { either, includes, isNil, pick } from 'ramda'
import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

export function useConnectWallet() {
  const t = useTranslations('error.profile')
  const { addWallet, getNonce, getWallets, signNonce, switchChain } = useDependencies()
  const account = useAccount()
  const wallet: Nullable<Wallet> = useMemo(() => {
    if (either(propIsNil('address'), propIsNil('chain'))(account)) {
      return undefined
    }
    return pick<AccountResult & Wallet, ['address', 'chainId']>(['address', 'chainId'], account)
  }, [account])
  const [walletLinkedStatus, setWalletLinkedStatus] = useState<WalletLinkedStatus>()

  // triggers
  const { data: walletsResponse, mutate: mutateWallets } = useSWR<WalletsResponse, Error, string>(
    SWRKeys.profile.wallet.get,
    (_key: string) => {
      logger.debug('fetching wallets')
      return getWallets()
    },
    {
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 500,
      revalidateOnMount: true,
      onError: (err) => {
        logger.error(`error fetching wallets ${errorMessage(err)}`)
        setWalletLinkedStatus('error')
      },
      onSuccess: (response) => {
        logger.debug(`successfully fetched wallets ${JSON.stringify(response)}`)
      }
    }
  )
  const { trigger: getNonceTrigger } = useSWRTrigger<NonceResponse, never>({
    key: SWRKeys.profile.nonce.get,
    fetcher: getNonce,
    onSuccess: (response) => {
      void signNonceTrigger({
        domain: window.location.host,
        uri: window.location.origin,
        nonce: response.nonce,
        wallet: wallet!
      })
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: t('addWallet') },
      onError: () => {
        setWalletLinkedStatus('error')
      }
    },
    options: {
      logging: true
    }
  })
  const { trigger: addWalletTrigger } = useSWRTrigger<WalletsResponse, AddWalletRequest>({
    key: SWRKeys.profile.wallet.add,
    fetcher: addWallet,
    onSuccess: (reponse) => {
      void mutateWallets(reponse)
      setWalletLinkedStatus('success')
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: t('addWallet') },
      onError: () => {
        setWalletLinkedStatus('error')
      }
    },
    options: {
      logging: true
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
        setWalletLinkedStatus('error')
      }
    },
    options: {
      logging: true
    }
  })

  // when connected, check if wallet is linked and if not, add it
  useEffect(() => {
    if (isNil(walletLinkedStatus)) {
      if (!isNil(walletsResponse) && !isNil(account.address) && account.status === 'connected') {
        logger.debug(`wallet is ${JSON.stringify(wallet)}`)
        logger.debug(`wallest are ${JSON.stringify(walletsResponse.wallets)}`)
        if (isNil(account.chain)) {
          void switchChain()
        } else if (includes(wallet, walletsResponse.wallets)) {
          setWalletLinkedStatus('success')
        } else {
          void getNonceTrigger()
        }
      }
    }
  }, [account, getNonceTrigger, switchChain, wallet, walletLinkedStatus, walletsResponse])

  return { account, walletLinkedStatus }
}
