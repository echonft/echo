'use client'
import { WalletIconSvg } from '@echo/ui/components/base/svg/wallet-icon-svg'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  isConnecting?: boolean
  onClick?: MouseEventHandler
}

export const ConnectWalletButtonLayout: FunctionComponent<Props> = ({ isConnecting, onClick }) => {
  const t = useTranslations('wallet.button.label')
  return (
    <button onClick={onClick} disabled={isConnecting} className={clsx('btn-auth', isConnecting && 'animate-pulse')}>
      <WalletIconSvg width={24} />
      <span className={clsx('btn-label-auth')}>{t(isConnecting ? 'connecting' : 'disconnected')}</span>
    </button>
  )
}
