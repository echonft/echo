'use client'
import { SeiIconSvg } from '@echo/ui/components/base/svg/sei-icon-svg'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  isConnecting?: boolean
  onClick?: MouseEventHandler
}

export const LoginButtonLayout: FunctionComponent<Props> = ({ isConnecting, onClick }) => {
  const t = useTranslations('wallet.button')
  return (
    <button onClick={onClick} disabled={isConnecting} className={clsx('btn-auth', isConnecting && 'animate-pulse')}>
      <span className={clsx('btn-label-auth')}>
        <SeiIconSvg width={24} />
      </span>
      <span className={clsx('btn-label-auth')}>{t('label')}</span>
    </button>
  )
}
