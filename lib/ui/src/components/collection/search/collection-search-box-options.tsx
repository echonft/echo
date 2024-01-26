import type { CollectionProviderResult } from '@echo/api/types/providers/collection-provider-result'
import type { Collection } from '@echo/model/types/collection'
import { CollectionSearchNoResults } from '@echo/ui/components/collection/search/collection-search-no-results'
import { CollectionThumbnail } from '@echo/ui/components/collection/thumbnail/collection-thumbnail'
import { NewListingSearchCollectionOptionSkeleton } from '@echo/ui/components/listing/new/skeleton/new-listing-search-collection-option-skeleton'
import { Combobox } from '@headlessui/react'
import { isEmpty, isNil, map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  options: CollectionProviderResult[] | undefined
  searching: boolean
}

export const CollectionSearchBoxOptions: FunctionComponent<Props> = ({ options, searching }) => {
  if (isNil(options)) {
    if (searching) {
      return (
        <>
          <NewListingSearchCollectionOptionSkeleton />
          <NewListingSearchCollectionOptionSkeleton />
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
          <Combobox.Option value={collection} key={collection.slug}>
            <CollectionThumbnail
              collection={collection as Collection}
              onClick={() => {
                // just to enable hover + cursor pointer
              }}
            />
          </Combobox.Option>
        ),
        options
      )}
    </>
  )
}
