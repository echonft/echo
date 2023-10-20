import { SideCaretSvg } from '@echo/ui/components/base/svg/side-caret-svg'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { DirectionLeft, DirectionRight } from '@echo/ui/constants/direction'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  quantity: number
  onQuantityChange?: (newQuantity: number) => unknown
}

export const NewListingSliderTargetRowQuantitySelector: FunctionComponent<Props> = ({ quantity, onQuantityChange }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-1.5', 'items-center')}>
      <HideIfNil
        checks={onQuantityChange}
        render={(onQuantityChange) => (
          <button
            disabled={quantity <= 1}
            className={clsx(
              'text-dark-900',
              'bg-yellow-500',
              'py-1',
              'pl-1.5',
              'pr-[0.44rem]',
              'rounded-md',
              'disabled:bg-yellow-500/[0.3]'
            )}
            onClick={() => onQuantityChange(quantity - 1)}
          >
            <SideCaretSvg direction={DirectionLeft} />
          </button>
        )}
      />
      <div
        className={clsx(
          'flex',
          'rounded-lg',
          'bg-dark-900',
          'border',
          'border-yellow-500',
          'min-w-[2.5rem]',
          'h-10',
          'items-center',
          'justify-center',
          'px-1',
          'select-none'
        )}
      >
        <span className={clsx('prose-label-lg-semi', 'text-white')}>{quantity}</span>
      </div>
      <HideIfNil
        checks={onQuantityChange}
        render={(onQuantityChange) => (
          <button
            className={clsx('text-dark-900', 'bg-yellow-500', 'py-1', 'pr-1.5', 'pl-[0.44rem]', 'rounded-md')}
            onClick={() => onQuantityChange(quantity + 1)}
          >
            <SideCaretSvg direction={DirectionRight} />
          </button>
        )}
      />
    </div>
  )
}
