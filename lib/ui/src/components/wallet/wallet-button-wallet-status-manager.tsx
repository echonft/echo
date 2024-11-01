'use client'
import { WalletStatus } from '@echo/model/constants/wallet-status'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { logError } from '@echo/ui/helpers/log-error'
import { useAccount } from '@echo/ui/hooks/use-account'
import { useActions } from '@echo/ui/hooks/use-actions'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { base64Encode } from '@echo/utils/helpers/base64-encode'
import type { AccountResultConnected } from '@echo/web3-dom/services/get-account'
import { signNonce } from '@echo/web3-dom/services/sign-nonce'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useRef } from 'react'

interface Props {
  onWalletLinked?: VoidFunction
}

export const WalletButtonWalletStatusManager: FunctionComponent<Props> = ({ onWalletLinked }) => {
  const { addUserWallet, getWalletStatus } = useActions()
  const { disconnectWallet } = useDependencies()
  const signingRef = useRef(false)
  const walletStatusRef = useRef<WalletStatus>()
  const { show } = useAlertStore()
  const t = useTranslations('wallet.status')
  useAccount({
    onConnect: async ({ address, chain }: AccountResultConnected) => {
      if (
        !signingRef.current &&
        walletStatusRef.current !== WalletStatus.Linked &&
        walletStatusRef.current !== WalletStatus.LinkedToOtherUser
      ) {
        signingRef.current = true
        const walletStatus = await getWalletStatus({ address, chain })
        walletStatusRef.current = walletStatus.status
        if (walletStatus.status === WalletStatus.Linked) {
          onWalletLinked?.()
        }
        if (walletStatus.status === WalletStatus.LinkedToOtherUser) {
          await disconnectWallet()
          show({
            message: t('linkToOtherUser'),
            severity: CalloutSeverity.Error
          })
        }
        if (walletStatus.status === WalletStatus.Unavailable) {
          await disconnectWallet()
          show({
            message: t('unavailable'),
            severity: CalloutSeverity.Error
          })
        }
        if (walletStatus.status === WalletStatus.NeedsSignature) {
          try {
            const { message, signature } = await signNonce({ address, chain, nonce: walletStatus.nonce })
            await addUserWallet({ address, chain, message: base64Encode(message), signature: base64Encode(signature) })
            onWalletLinked?.()
          } catch (err) {
            logError(err)
            await disconnectWallet()
          } finally {
            signingRef.current = false
          }
        }
        signingRef.current = false
      }
    }
  })

  return null
}
