'use client'
import { SearchResultCategory } from '@echo/model/constants/search-result-category'
import type { SearchResult } from '@echo/model/types/search-result'
import type { Slug } from '@echo/model/types/slug'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { SearchBox } from '@echo/ui/components/base/search/search-box'
import { useActions } from '@echo/ui/hooks/use-actions'
import { promiseAll } from '@echo/utils/helpers/promise-all'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { andThen, flatten, juxt, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

export const HeaderSearch: FunctionComponent = () => {
  const t = useTranslations('layout.header.search')
  const { searchCollections, searchUsers } = useActions()
  const router = useRouter()

  return (
    <div className={clsx('h-max', 'w-full', 'max-w-[37.5rem]')}>
      <SearchBox
        resultsProvider={pipe(juxt([searchCollections, searchUsers]), promiseAll, andThen(flatten))}
        onSelect={(result: SearchResult<string>) => {
          if (result.category === SearchResultCategory.Collection) {
            router.push(frontendRoutes.collection.details.get({ slug: result.value as Slug }))
          }
          if (result.category === SearchResultCategory.User) {
            router.push(frontendRoutes.user.details.get({ username: result.value }))
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
