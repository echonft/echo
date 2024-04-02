'use client'
import type { SearchResultCategory } from '@echo/model/types/search-result-category'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  category: SearchResultCategory
  count: number
  selected?: boolean
  onToggleSelection?: (category: SearchResultCategory, selected: boolean) => void
}

export const SearchResultCategoryPill: FunctionComponent<Props> = ({
  category,
  count,
  selected,
  onToggleSelection
}) => {
  const t = useTranslations('search.category')
  if (count === 0) {
    return null
  }
  return (
    <button
      className={clsx(
        'h-max',
        'w-max',
        'flex',
        'flex-row',
        'gap-2.5',
        'items-center',
        'p-2.5',
        'rounded-lg',
        'border',
        'border-white/[0.08]',
        selected ? 'bg-white/[0.05]' : 'hover:bg-white/[0.05]'
      )}
      id={`search-category-${category}`}
      onClick={(event) => {
        event.stopPropagation()
        onToggleSelection?.(category, !selected)
      }}
    >
      <span className={clsx('prose-label-md', 'text-white', 'select-none')}>{t(category, { count })}</span>
      <div
        className={clsx(
          'w-6.5',
          'h-6.5',
          'rounded-lg',
          'flex',
          'items-center',
          'justify-center',
          'bg-dark-300',
          'select-none'
        )}
      >
        <span className={clsx('prose-other-medium', 'text-white/50', 'select-none')}>{count}</span>
      </div>
    </button>
  )
}
