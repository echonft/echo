import type { AddSolanaWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import type { WalletsResponse } from '@echo/api/types/responses/wallets-response'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js'
import { encode } from 'bs58'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent, useEffect } from 'react'
import { mutate } from 'swr'

// TODO WIP
export const SolanaConnectWalletButton: FunctionComponent = () => {
  const t = useTranslations('error.profile')
  const walletContext = useWallet()
  const { publicKey, signMessage, connected, sendTransaction } = walletContext
  const { addWallet, getNonce } = useDependencies()

  const { trigger: getNonceTrigger } = useSWRTrigger<NonceResponse, never>({
    key: SWRKeys.profile.nonce.get,
    fetcher: getNonce,
    onSuccess: (response) => {
      void signNonceTrigger({ message: response.nonce })
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: t('addWallet') },
      onError: () => {
        void walletContext.disconnect()
      }
    }
  })

  const { trigger: addWalletTrigger } = useSWRTrigger<WalletsResponse, AddSolanaWalletRequest>({
    key: SWRKeys.profile.wallet.add,
    fetcher: addWallet,
    onSuccess: (response) => {
      void mutate(SWRKeys.profile.wallet.get, response.wallets)
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: t('addWallet') },
      onError: () => {
        void walletContext.disconnect()
      }
    }
  })

  const { trigger: signNonceTrigger } = useSWRTrigger<
    { message: string; signature: string; publicKey: string },
    { message: string }
  >({
    key: SWRKeys.profile.nonce.signSolana,
    fetcher: async ({ message }) => {
      if (isNil(signMessage) || isNil(publicKey)) {
        throw Error('Cannot sign message')
      }
      const encodedMessage = new TextEncoder().encode(message)
      const signature = await signMessage(encodedMessage)
      return { message, signature: encode(signature), publicKey: publicKey.toBase58() }
    },
    onSuccess: ({ message, signature, publicKey }) => {
      void addWalletTrigger({ message, signature, publicKey })
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: t('signing') },
      onError: () => {
        void walletContext.disconnect()
      }
    }
  })

  useEffect(() => {
    if (connected) {
      void getNonceTrigger()
    }
  }, [getNonceTrigger, connected])

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: Keypair.generate().publicKey,
      lamports
    })
  )

  return <WalletMultiButton className="btn" />
}
