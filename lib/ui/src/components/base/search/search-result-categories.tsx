'use client'
import type { SearchResultCategory } from '@echo/model/types/search/search-result-category'
import { SearchResultCategoryPill } from '@echo/ui/components/base/search/search-result-category-pill'
import type { SearchResultCategoryViewModel } from '@echo/ui/types/search-result-category-view-model'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { map } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  categories: SearchResultCategoryViewModel[]
  onChange?: (category?: SearchResultCategory) => void
}

export const SearchResultCategories: FunctionComponent<Props> = ({ categories, onChange }) => {
  const [selection, setSelection] = useState<Nullable<SearchResultCategory>>(undefined)
  return (
    <div className={clsx('h-max', 'w-full', 'flex', 'flex-row', 'gap-4', 'rounded-t-lg', 'p-4.5')}>
      {map(
        ({ category, count }) => (
          <SearchResultCategoryPill
            key={category}
            category={category}
            count={count}
            selected={selection === category}
            onToggleSelection={(category, selected) => {
              const newSelection = selected ? category : undefined
              setSelection(newSelection)
              onChange?.(newSelection)
            }}
          />
        ),
        categories
      )}
    </div>
  )
}
