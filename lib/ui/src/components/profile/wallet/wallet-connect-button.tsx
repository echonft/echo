import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  loading: boolean
  onClick?: () => unknown
  label?: string
}

export const WalletConnectButton: FunctionComponent<Props> = ({ loading, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={clsx('btn-gradient', 'group', 'w-[9.875rem]', 'py-1.5', loading && 'animate-pulse')}
    >
      <span className={clsx('prose-label-sm-semi', 'btn-label-gradient')}>{label}</span>
    </button>
  )
}
