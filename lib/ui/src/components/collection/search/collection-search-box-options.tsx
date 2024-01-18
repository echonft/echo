import type { CollectionProviderResult } from '@echo/api/types/providers/collection-provider-result'
import { CollectionSearchCollectionOption } from '@echo/ui/components/collection/search/collection-search-collection-option'
import { CollectionSearchNoResults } from '@echo/ui/components/collection/search/collection-search-no-results'
import { NewListingSearchCollectionOptionSkeleton } from '@echo/ui/components/listing/new/skeleton/new-listing-search-collection-option-skeleton'
import { Combobox } from '@headlessui/react'
import { isEmpty, isNil, map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  options: CollectionProviderResult[] | undefined
  selectedOption: CollectionProviderResult | undefined
  searching: boolean
}

export const CollectionSearchBoxOptions: FunctionComponent<Props> = ({ options, selectedOption, searching }) => {
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
          <Combobox.Option value={collection} key={collection.id} className={'cursor-pointer'}>
            <CollectionSearchCollectionOption
              pictureUrl={collection.profilePictureUrl}
              selected={!isNil(selectedOption) && collection.id === selectedOption.id}
              collectionName={collection.name}
              collectionSupply={collection.totalSupply}
            />
          </Combobox.Option>
        ),
        options
      )}
    </>
  )
}
