import { NewListingSearchCollectionOptionSkeleton } from '../../skeleton/listing/new-listing-search-collection-option-skeleton'
import { NewListingSliderSearchBox } from './new-listing-slider-search-box'
import { NftCollection } from '@echo/ui-model'
import { forwardRef, ForwardRefRenderFunction, useCallback, useState } from 'react'

interface Props {
  placeholder: string
  name?: string
  options?: NftCollection[]
  selectedOptions: NftCollection[]
  onTargetsSelected?: (newTargets: NftCollection[]) => unknown
}

const Component: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  { placeholder, name, options, onTargetsSelected, selectedOptions },
  ref
) => {
  const [searchQuery, setSearchQuery] = useState<string>()

  const getOptions = useCallback(
    () => options?.filter((option) => option.name.includes(searchQuery ?? '')) ?? [],
    [searchQuery]
  )
  return (
    <NewListingSliderSearchBox
      placeholder={placeholder}
      name={name}
      ref={ref}
      onSearch={(query) => setSearchQuery(query)}
      selectedOptions={selectedOptions}
      onSelected={onTargetsSelected}
      options={getOptions()}
      renderLoading={() => (
        <>
          <NewListingSearchCollectionOptionSkeleton />
          <NewListingSearchCollectionOptionSkeleton />
          <NewListingSearchCollectionOptionSkeleton />
        </>
      )}
    />
  )
}

export const NewListingSliderSearchBoxManager = forwardRef(Component)
