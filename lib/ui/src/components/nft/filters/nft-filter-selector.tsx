import { classes } from '@echo/ui/helpers/classes'
import { isSelected } from '@echo/ui/helpers/selectable/is-selected'
import type { NftFilter } from '@echo/ui/types/nft-filter'
import type { Selectable } from '@echo/ui/types/selectable'

interface Props<T extends NftFilter> {
  filter: Selectable<T>
}

const SelectedIcon = <T extends NftFilter>({ filter }: Props<T>) => {
  if (isSelected(filter)) {
    return <span className={classes('w-4', 'h-4', 'bg-yellow-500', 'rounded')} />
  }
  return null
}

export const NftFilterSelector = <T extends NftFilter>({ filter }: Props<T>) => {
  return (
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
      <SelectedIcon filter={filter} />
    </div>
  )
}
