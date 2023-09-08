import { SideCaretSvg } from '../../base/svg/side-caret-svg'
import { DirectionLeft, DirectionRight } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  quantity: number
  onQuantityChange?: (newQuantity: number) => unknown
}

export const NewListingSliderTargetRowQuantitySelector: FunctionComponent<Props> = ({ quantity, onQuantityChange }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-1.5', 'items-center')}>
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
        onClick={() => onQuantityChange?.(quantity - 1)}
      >
        <SideCaretSvg direction={DirectionLeft} />
      </button>
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
          'px-1'
        )}
      >
        <span className={clsx('prose-label-lg-semi', 'text-white')}>{quantity}</span>
      </div>
      <button
        className={clsx('text-dark-900', 'bg-yellow-500', 'py-1', 'pr-1.5', 'pl-[0.44rem]', 'rounded-md')}
        onClick={() => onQuantityChange?.(quantity + 1)}
      >
        <SideCaretSvg direction={DirectionRight} />
      </button>
    </div>
  )
}
