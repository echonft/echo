import { clsx } from 'clsx'
import { FunctionComponent, PropsWithChildren } from 'react'

export interface OfferDetailsAcceptButtonProps extends PropsWithChildren {
  disabled?: boolean
  onAction?: () => unknown
}

export const OfferDetailsAcceptButton: FunctionComponent<OfferDetailsAcceptButtonProps> = ({
  disabled,
  onAction,
  children
}) => {
  return (
    <button
      className={clsx('btn-gradient', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10', disabled && 'disabled')}
      onClick={onAction}
      disabled={disabled}
    >
      <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{children}</span>
    </button>
  )
}
