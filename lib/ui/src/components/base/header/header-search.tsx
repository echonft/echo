'use client'
import { linkProvider } from '@echo/api/routing/link-provider'
import {
  SEARCH_RESULT_CATEGORY_COLLECTION,
  SEARCH_RESULT_CATEGORY_USER
} from '@echo/model/constants/search-result-category'
import type { SearchResult } from '@echo/model/types/search-result'
import { SearchBoxManager } from '@echo/ui/components/base/search/search-box-manager'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { andThen, flatten, juxt, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

export const HeaderSearch: FunctionComponent = () => {
  const t = useTranslations('layout.header.search')
  const { searchCollections, searchUsers } = useDependencies()
  const router = useRouter()

  return (
    <div className={clsx('h-max', 'w-full', 'max-w-[37.5rem]')}>
      <SearchBoxManager
        resultsProvider={pipe(juxt([searchCollections, searchUsers]), promiseAll, andThen(flatten))}
        onSelect={(result: SearchResult<string>) => {
          if (result.category === SEARCH_RESULT_CATEGORY_COLLECTION) {
            router.push(linkProvider.collection.items.get({ slug: result.value }))
          }
          if (result.category === SEARCH_RESULT_CATEGORY_USER) {
            router.push(linkProvider.user.items.get({ username: result.value }))
          }
        }}
        style={{
          // FIXME clicking on categories does not work anymore
          // add back when it's fixed
          // categories: {
          //   show: true
          // },
          placeHolder: t('placeHolder')
        }}
      />
    </div>
  )
}
