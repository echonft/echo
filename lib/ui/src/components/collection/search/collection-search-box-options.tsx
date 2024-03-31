import type { Collection } from '@echo/model/types/collection'
import { CollectionSearchNoResults } from '@echo/ui/components/collection/search/collection-search-no-results'
import { CollectionThumbnail } from '@echo/ui/components/collection/thumbnail/collection-thumbnail'
import { CollectionThumbnailSkeleton } from '@echo/ui/components/collection/thumbnail/skeleton/collection-thumbnail-skeleton'
import { Combobox } from '@headlessui/react'
import { clsx } from 'clsx'
import { isEmpty, isNil, map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  options: Collection[] | undefined
  searching: boolean
}

export const CollectionSearchBoxOptions: FunctionComponent<Props> = ({ options, searching }) => {
  if (isNil(options)) {
    if (searching) {
      return (
        <>
          <CollectionThumbnailSkeleton />
          <CollectionThumbnailSkeleton />
        </>
      )
    }
    return null
  }
  if (isEmpty(options)) {
    return <CollectionSearchNoResults />
  }

  return (
    <>
      {map(
        (collection) => (
          <Combobox.Option
            className={clsx('hover:bg-white/[0.08]', 'cursor-pointer')}
            value={collection}
            key={collection.slug}
          >
            <CollectionThumbnail collection={collection} />
          </Combobox.Option>
        ),
        options
      )}
    </>
  )
}
