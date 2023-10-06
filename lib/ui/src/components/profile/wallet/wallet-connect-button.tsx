import { clsx } from 'clsx'
import type { FunctionComponent, MouseEventHandler } from 'react'

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
      className={clsx('btn-gradient', 'group', 'w-[9.875rem]', 'h-max', 'py-1.5', 'px-5', loading && 'animate-pulse')}
    >
      <span className={clsx('prose-label-sm-semi', 'btn-label-gradient')}>{label}</span>
    </button>
  )
}
