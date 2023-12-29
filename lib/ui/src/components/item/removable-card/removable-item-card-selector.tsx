import type { OfferItem } from '@echo/model/types/offer-item'
import { RemoveIconSvg } from '@echo/ui/components/base/svg/remove-icon-svg'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  item: OfferItem
  onRemove?: (item: OfferItem) => unknown
}

export const RemovableItemCardSelector: FunctionComponent<Props> = ({ item, onRemove }) => (
  <button
    className={clsx(
      'absolute',
      'top-1',
      'right-1',
      'p-1',
      'transition-opacity ease-in-out',
      'bg-red-500',
      'hover:opacity-80',
      'rounded-full'
    )}
    onClick={() => onRemove?.(item)}
  >
    <span className={clsx('text-white')}>
      <RemoveIconSvg />
    </span>
  </button>
)
