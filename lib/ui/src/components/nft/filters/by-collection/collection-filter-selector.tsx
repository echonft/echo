import type { CollectionFilter } from '@echo/ui/types/collection-filter'
import type { SelectableProps } from '@echo/ui/types/selectable-props'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props extends SelectableProps<CollectionFilter> {
  filter: CollectionFilter
}

export const CollectionFilterSelector: FunctionComponent<Props> = ({ filter, selected, onToggleSelection }) => {
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
        onToggleSelection?.(filter, !selected)
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
        <span className={clsx('prose-label-sm-semi', 'text-white', 'truncate')}>{filter.name}</span>
      </div>
      <span className={clsx('prose-label-sm-light', 'text-white')}>{filter.count}</span>
    </button>
  )
}
