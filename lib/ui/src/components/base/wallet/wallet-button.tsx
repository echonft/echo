'use client'
import { SeiIconSvg } from '@echo/ui/components/base/svg/sei-icon-svg'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  isConnecting?: boolean
  onClick?: MouseEventHandler
}

export const WalletButton: FunctionComponent<Props> = ({ isConnecting, onClick }) => {
  const t = useTranslations('wallet.button')
  return (
    <button className={clsx('btn-primary', isConnecting && 'animate-pulse')} disabled={isConnecting} onClick={onClick}>
      <div className={clsx('btn-label-with-icon-layout', 'btn-label-primary')}>
        <SeiIconSvg height={22} />
        <span>{t('label')}</span>
      </div>
    </button>
  )
}
