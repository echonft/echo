import { NftTraitValue } from '../../../types/nft-traits'
import { SelectableProps } from '../../../types/selectable-props'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface TraitFilterSelectorProps extends SelectableProps<NftTraitValue> {
  value: NftTraitValue
}

export const TraitFilterSelector: FunctionComponent<TraitFilterSelectorProps> = ({
  value,
  selected,
  onToggleSelection
}) => {
  return (
    <button
      className={clsx(
        'flex',
        'flex-row',
        'justify-between',
        'items-center',
        'gap-1',
        'w-full',
        'py-[0.3125rem]',
        'px-[0.40625rem]',
        'rounded-lg',
        'hover:bg-white/[0.08]'
      )}
      onClick={() => {
        onToggleSelection?.(value, !selected)
      }}
    >
      <div className={clsx('flex', 'flex-row', 'gap-2.5', 'items-center', 'min-w-0')}>
        <div
          className={clsx(
            'flex',
            'justify-center',
            'items-center',
            'flex-none',
            'w-[1.375rem]',
            'h-[1.375rem]',
            'rounded-lg',
            'border-solid',
            'border',
            'border-yellow-500',
            'bg-transparent'
          )}
        >
          {selected && <span className={clsx('w-4', 'h-4', 'bg-yellow-500', 'rounded')} />}
        </div>
        <span className={clsx('prose-label-sm-semi', 'text-white', 'truncate')}>{value.value}</span>
      </div>
      <span className={clsx('prose-label-sm-light', 'text-white')}>{value.count}</span>
    </button>
  )
}
