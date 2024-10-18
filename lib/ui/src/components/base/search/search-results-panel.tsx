import type { SearchResultCategory } from '@echo/model/constants/search-result-category'
import { compareSearchResults } from '@echo/model/helpers/search/compare-search-results'
import { filterSearchResultsByCategory } from '@echo/model/helpers/search/filter-search-results-by-category'
import type { SearchResult as SearchResultModel } from '@echo/model/types/search/search-result'
import { SearchResults } from '@echo/ui/components/base/search/search-results'
import { SearchResultsCategories } from '@echo/ui/components/base/search/search-results-categories'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { isNil, pipe, sort } from 'ramda'
import { useEffect, useMemo, useState } from 'react'

interface Props<T> {
  results: Nullable<SearchResultModel<T>[]>
  style?: Nullable<{
    categories?: {
      show?: boolean
    }
  }>
  onSelect?: (selection: SearchResultModel<T>) => unknown
}

export const SearchResultsPanel = <T,>({ results, style, onSelect }: Props<T>) => {
  const [category, setCategory] = useState<Nullable<SearchResultCategory>>()
  const filteredResults = useMemo(() => {
    if (isNil(results)) {
      return undefined
    }
    if (isNil(category)) {
      return sort(compareSearchResults, results)
    }
    return pipe(filterSearchResultsByCategory<T>(category), sort(compareSearchResults))(results)
  }, [category, results])

  // reset the picked category when results change
  useEffect(() => {
    setCategory(undefined)
  }, [results])

  if (isNil(filteredResults)) {
    return null
  }
  return (
    <motion.div
      className={clsx('h-max', 'w-full', 'rounded-lg', 'absolute', 'top-14', 'inset-x-0', 'bg-dark-450', 'z-10')}
      transition={{ ease: 'easeOut', duration: 0.2 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SearchResultsCategories show={style?.categories?.show} results={results} onChange={setCategory} />
      <SearchResults results={filteredResults} style={style} onSelect={onSelect} />
    </motion.div>
  )
}
