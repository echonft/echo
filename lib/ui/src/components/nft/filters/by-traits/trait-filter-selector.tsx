import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { classes } from '@echo/ui/helpers/classes'
import { isSelected } from '@echo/ui/helpers/selectable/is-selected'
import { type TraitFilter } from '@echo/ui/types/trait-filter'
import { type FunctionComponent } from 'react'

interface Props {
  filter: TraitFilter
  onToggleSelection?: (filter: TraitFilter) => unknown
}

export const TraitFilterSelector: FunctionComponent<Props> = ({ filter, onToggleSelection }) => {
  return (
    <button
      className={classes(
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
        onToggleSelection?.(filter)
      }}
    >
      <div className={classes('flex', 'flex-row', 'gap-2.5', 'items-center', 'min-w-0')}>
        <div
          className={classes(
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
          <ShowIf condition={isSelected(filter)}>
            <span className={classes('w-4', 'h-4', 'bg-yellow-500', 'rounded')} />
          </ShowIf>
        </div>
        <span className={classes('prose-label-sm-semi', 'text-white', 'truncate')}>{filter.value}</span>
      </div>
      <span className={classes('prose-label-sm-light', 'text-white')}>{filter.count}</span>
    </button>
  )
}
