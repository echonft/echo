import { NewListingSearchCollectionOptionSkeleton } from '../../skeleton/listing/new-listing-search-collection-option-skeleton'
import { NewListingSliderSearchCollectionOption } from './new-listing-slider-search-collection-option'
import { NewListingSliderSearchNoResults } from './new-listing-slider-search-no-results'
import { NftCollection } from '@echo/ui-model'
import { Combobox } from '@headlessui/react'
import { any, isEmpty, isNil, map, propEq } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  options: Array<NftCollection> | undefined
  selectedOptions: Array<NftCollection>
  searching: boolean
}

export const NewListingSliderSearchBoxOptions: FunctionComponent<Props> = ({ options, selectedOptions, searching }) => {
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
    return <NewListingSliderSearchNoResults />
  }

  return (
    <>
      {map(
        (collection) => (
          <Combobox.Option value={collection} key={collection.id} className={'cursor-pointer'}>
            <NewListingSliderSearchCollectionOption
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
