import { NewListingSearchCollectionOptionSkeleton } from '../../listing/new/skeleton/new-listing-search-collection-option-skeleton'
import { CollectionSearchCollectionOption } from './collection-search-collection-option'
import { CollectionSearchNoResults } from './collection-search-no-results'
import { NftCollection } from '@echo/ui-model'
import { Combobox } from '@headlessui/react'
import { any, isEmpty, isNil, map, propEq } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  options: Array<NftCollection> | undefined
  selectedOptions: Array<NftCollection>
  searching: boolean
}

export const CollectionSearchBoxOptions: FunctionComponent<Props> = ({ options, selectedOptions, searching }) => {
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
              selected={any(propEq(collection.id, 'id'), selectedOptions)}
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
