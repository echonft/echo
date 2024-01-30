'use client'
import { WalletIconSvg } from '@echo/ui/components/base/svg/wallet-icon-svg'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  isConnecting?: boolean
  onClick?: MouseEventHandler
}

export const ConnectWalletButton: FunctionComponent<Props> = ({ isConnecting, onClick }) => {
  const t = useTranslations('wallet.button')
  return (
    <button
      onClick={onClick}
      disabled={isConnecting}
      className={clsx(
        'btn-primary',
        'group',
        'gap-2.5',
        'h-[1.875rem]',
        'w-max',
        'px-2.5',
        isConnecting && 'animate-pulse'
      )}
    >
      <span className={clsx('btn-label-primary')}>
        <WalletIconSvg />
      </span>
      <span className={clsx('btn-label-primary', 'prose-label-xs', '!tracking-[0.015rem]')}>{t('label')}</span>
    </button>
  )
}
