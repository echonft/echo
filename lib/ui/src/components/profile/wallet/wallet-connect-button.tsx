import { WalletIconSvg } from '@echo/ui/components/base/svg/wallet-icon-svg'
import { clsx } from 'clsx'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  loading: boolean
  onClick?: MouseEventHandler
  label?: string
}

export const WalletConnectButton: FunctionComponent<Props> = ({ loading, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={clsx(
        'btn-primary',
        'group',
        'gap-2.5',
        'h-[1.875rem]',
        'px-2.5',
        'rounded-lg',
        'items-center',
        'min-w-36'
      )}
    >
      <span className={clsx('btn-label-primary')}>
        <WalletIconSvg />
      </span>
      <span className={clsx('btn-label-primary', 'prose-label-xs', '!tracking-[0.015rem]')}>{label}</span>
    </button>
  )
}
