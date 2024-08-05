'use client'
import { pathProvider } from '@echo/api/routing/path-provider'
import {
  SEARCH_RESULT_CATEGORY_COLLECTION,
  SEARCH_RESULT_CATEGORY_USER
} from '@echo/model/constants/search-result-category'
import type { SearchResult } from '@echo/model/types/search-result'
import { SearchBox } from '@echo/ui/components/base/search/search-box'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { andThen, flatten, juxt, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

export const HeaderSearch: FunctionComponent = () => {
  const t = useTranslations('layout.header.search')
  const { searchCollections, searchUsers } = useDependencies()
  const router = useRouter()

  return (
    <div className={clsx('h-max', 'w-full', 'max-w-[37.5rem]')}>
      <SearchBox
        resultsProvider={pipe(juxt([searchCollections, searchUsers]), promiseAll, andThen(flatten))}
        onSelect={(result: SearchResult<Lowercase<string>>) => {
          if (result.category === SEARCH_RESULT_CATEGORY_COLLECTION) {
            router.push(pathProvider.collection.default.get({ slug: result.value }))
          }
          if (result.category === SEARCH_RESULT_CATEGORY_USER) {
            router.push(pathProvider.user.default.get({ username: result.value }))
          }
        }}
        style={{
          categories: {
            show: true
          },
          placeHolder: t('placeHolder')
        }}
      />
    </div>
  )
}
