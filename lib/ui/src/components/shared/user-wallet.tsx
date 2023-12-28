'use client'
import type { Wallet } from '@echo/model/types/wallet'
import { WalletConnectButton } from '@echo/ui/components/profile/wallet/wallet-connect-button'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { shortenAddress } from '@echo/web3/helpers/shorten-address'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

interface Props {
  wallet: Wallet
}

export const UserWallet: FunctionComponent<Props> = ({ wallet }) => {
  const t = useTranslations('profile.wallet.button')
  const [copied, setCopied] = useState(false)
  const buttonLabel = copied ? t('copied.label') : shortenAddress(wallet)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined
    if (copied) {
      timeoutId = setTimeout(() => setCopied(false), 2000)
    }
    return () => clearTimeout(timeoutId)
  }, [copied])
  return (
    <CopyToClipboard text={formatAddress(wallet)} onCopy={() => setCopied(true)}>
      <WalletConnectButton label={buttonLabel} loading={copied} />
    </CopyToClipboard>
  )
}
