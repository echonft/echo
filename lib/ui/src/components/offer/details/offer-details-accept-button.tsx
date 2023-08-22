import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface OfferDetailsAcceptButtonProps {
  title: string
  onAction?: () => unknown
}

export const OfferDetailsAcceptButton: FunctionComponent<OfferDetailsAcceptButtonProps> = ({ title, onAction }) => {
  return (
    <button className={clsx('btn-gradient', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10')} onClick={onAction}>
      <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{title}</span>
    </button>
  )
}
