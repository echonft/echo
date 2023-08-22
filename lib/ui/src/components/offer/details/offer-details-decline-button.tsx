import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface OfferDetailsAcceptButtonProps {
  title: string
  onAction?: () => unknown
}

export const OfferDetailsDeclineButton: FunctionComponent<OfferDetailsAcceptButtonProps> = ({ title, onAction }) => {
  return (
    <button className={clsx('bg-red-400', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10')} onClick={onAction}>
      <span className={clsx('prose-label-lg', 'text-dark-500', 'group-hover:text-white')}>{title}</span>
    </button>
  )
}
