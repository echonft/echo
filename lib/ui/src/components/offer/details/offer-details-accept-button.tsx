import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  disabled?: boolean
  onAction?: () => unknown
}

export const OfferDetailsAcceptButton: FunctionComponent<PropsWithChildren<Props>> = ({
  disabled,
  onAction,
  children
}) => {
  return (
    <button
      className={clsx('btn-gradient', 'btn-size-alt', 'group', disabled && 'disabled')}
      onClick={onAction}
      disabled={disabled}
    >
      <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{children}</span>
    </button>
  )
}
