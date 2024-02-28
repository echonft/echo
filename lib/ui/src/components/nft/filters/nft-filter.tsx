import { NftFilterSelector } from '@echo/ui/components/nft/filters/nft-filter-selector'
import { classes } from '@echo/ui/helpers/classes'
import type { NftFilter as NftFilterModel } from '@echo/ui/types/nft-filter'
import type { Selectable } from '@echo/ui/types/selectable'

interface Props<T extends NftFilterModel> {
  filter: Selectable<T>
  onToggleSelection?: (filter: Selectable<T>) => unknown
}

export const NftFilter = <T extends NftFilterModel>({ filter, onToggleSelection }: Props<T>) => {
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
        <NftFilterSelector filter={filter} />
        <span className={classes('prose-label-sm-semi', 'text-white', 'truncate')}>{filter.label}</span>
      </div>
      <span className={classes('prose-label-sm-light', 'text-white')}>{filter.count}</span>
    </button>
  )
}
