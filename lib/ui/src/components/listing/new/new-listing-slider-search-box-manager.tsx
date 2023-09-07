import { NewListingSearchCollectionOptionSkeleton } from '../../skeleton/listing/new-listing-search-collection-option-skeleton'
import { NewListingSliderSearchBox } from './new-listing-slider-search-box'
import { ListingTarget } from '@echo/ui-model'
import { isNilOrEmpty, stringIncludes } from '@echo/utils'
import { always, either, filter, identity, ifElse, isNil, path, pipe } from 'ramda'
import { forwardRef, ForwardRefRenderFunction, useMemo, useState } from 'react'

interface Props {
  placeholder: string
  name?: string
  options?: ListingTarget[]
  selectedOptions: ListingTarget[]
  onTargetsSelected?: (newTargets: ListingTarget[]) => unknown
}

const Component: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  { placeholder, name, options, onTargetsSelected, selectedOptions },
  ref
) => {
  const [searchQuery, setSearchQuery] = useState<string>()

  const filteredOptions = useMemo<ListingTarget[] | undefined>(
    () =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ifElse(
        either(isNil, always(isNilOrEmpty(searchQuery))),
        identity,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call
        filter(pipe(path(['collection', 'name']), stringIncludes(searchQuery)))
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      )(options),
    [searchQuery, options]
  )
  return (
    <NewListingSliderSearchBox
      placeholder={placeholder}
      name={name}
      ref={ref}
      onSearch={setSearchQuery}
      selectedOptions={selectedOptions}
      onSelected={onTargetsSelected}
      options={filteredOptions}
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
