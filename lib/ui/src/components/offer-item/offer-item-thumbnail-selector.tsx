import { XIconSvg } from '../base/svg/x-icon-svg'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface OfferItemThumbnailSelectorProps {
  onRemove?: () => void
}

export const OfferItemThumbnailSelector: FunctionComponent<OfferItemThumbnailSelectorProps> = ({ onRemove }) => {
  return (
    <button
      className={clsx(
        'flex',
        'justify-center',
        'items-center',
        'absolute',
        'top-2',
        'right-2',
        'z-10',
        'w-4',
        'h-4',
        'rounded-full',
        'bg-red-500'
      )}
      onClick={onRemove}
    >
      <span className={clsx('text-white')}>
        <XIconSvg width={7} height={7} />
      </span>
    </button>
  )
}
