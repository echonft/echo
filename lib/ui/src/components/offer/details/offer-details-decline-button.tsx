import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface OfferDetailsAcceptButtonProps extends PropsWithChildren {
  onAction?: () => unknown
}

export const OfferDetailsDeclineButton: FunctionComponent<OfferDetailsAcceptButtonProps> = ({ onAction, children }) => {
  return (
    <button className={clsx('bg-red-400', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10')} onClick={onAction}>
      <span className={clsx('prose-label-lg', 'text-dark-500', 'group-hover:text-white')}>{children}</span>
    </button>
  )
}
