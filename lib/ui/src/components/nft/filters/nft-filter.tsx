import { NftFilterSelector } from '@echo/ui/components/nft/filters/nft-filter-selector'
import type { Filter as NftFilterModel } from '@echo/ui/types/filter'
import { clsx } from 'clsx'

interface Props<T extends NftFilterModel> {
  filter: T
  selected?: boolean
  onToggleSelection?: (filter: T) => void
}

export const NftFilter = <T extends NftFilterModel>({ filter, selected, onToggleSelection }: Props<T>) => {
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
        'hover:bg-white/[0.08]',
        'outline-none'
      )}
      onClick={() => {
        onToggleSelection?.(filter)
      }}
    >
      <div className={clsx('flex', 'flex-row', 'gap-2.5', 'items-center', 'min-w-0')}>
        <NftFilterSelector selected={selected} />
        <span className={clsx('prose-label-sm-semi', 'text-white', 'truncate')}>{filter.label}</span>
      </div>
      <span className={clsx('prose-label-sm-light', 'text-white')}>{filter.count}</span>
    </button>
  )
}
