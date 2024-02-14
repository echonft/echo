'use client'
import { WalletIconSvg } from '@echo/ui/components/base/svg/wallet-icon-svg'
import { classes } from '@echo/ui/helpers/classes'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  isConnecting?: boolean
  onClick?: MouseEventHandler
}

export const ConnectWalletButtonLayout: FunctionComponent<Props> = ({ isConnecting, onClick }) => {
  const t = useTranslations('wallet.button')
  return (
    <button
      onClick={onClick}
      disabled={isConnecting}
      className={classes(
        'btn-primary',
        'group',
        'gap-2.5',
        'h-[1.875rem]',
        'w-max',
        'px-2.5',
        isConnecting && 'animate-pulse'
      )}
    >
      <span className={classes('btn-label-primary')}>
        <WalletIconSvg />
      </span>
      <span className={classes('btn-label-primary', 'prose-label-xs', '!tracking-[0.015rem]')}>{t('label')}</span>
    </button>
  )
}
