import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

interface Props {
  disabled?: boolean
  onAction?: () => unknown
}

export const OfferDetailsDeclineButton: FunctionComponent<PropsWithChildren<Props>> = ({
  disabled,
  onAction,
  children
}) => {
  return (
    <button
      className={clsx(
        'bg-red-400',
        'disabled:bg-red-400/40',
        'group',
        'rounded-lg',
        'w-40',
        'py-1.5',
        'h-10',
        disabled && 'disabled'
      )}
      onClick={onAction}
      disabled={disabled}
    >
      <span
        className={clsx(
          'prose-label-lg',
          'text-dark-500',
          'group-active:group-hover:text-white',
          'group-disabled:text-dark-500'
        )}
      >
        {children}
      </span>
    </button>
  )
}
