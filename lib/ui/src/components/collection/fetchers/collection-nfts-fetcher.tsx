'use client'
import { useApiHooks } from '../../../dependencies/hooks/use-api-hooks'
import { CollectionNftsAndFiltersContainerSkeleton } from '../../skeleton/collection/collection-nfts-and-filters-container-skeleton'
import { CollectionNftsAndFiltersContainer } from '../collection-nfts-and-filters-container'
import { filterNftsByTraits, getTraitsForNfts, NftTraits } from '@echo/ui-model'
import { isNil } from 'ramda'
import { FunctionComponent, useEffect, useState } from 'react'

export interface CollectionNftsFetcherProps {
  collectionSlug: string
  onMakeOfferForNft?: (id: string) => unknown
  onError?: (error: Error) => unknown
}

export const CollectionNftsFetcher: FunctionComponent<CollectionNftsFetcherProps> = ({
  collectionSlug,
  onMakeOfferForNft,
  onError
}) => {
  const { useNftsForCollection } = useApiHooks()
  const [traitsFilter, setTraitsFilter] = useState<NftTraits>()
  const [traits, setTraits] = useState<NftTraits>()
  const { data, isLoading, error } = useNftsForCollection(collectionSlug)

  // error handling
  useEffect(() => {
    if (!isNil(error) && !isNil(onError)) {
      onError(error)
    }
  }, [error, onError])

  useEffect(() => {
    // set the collection traits if it's the first fetch
    if (isNil(traits) && !isNil(data)) {
      setTraits(getTraitsForNfts([...data]))
    }
  }, [data, traits])

  if (isNil(traits)) {
    return <CollectionNftsAndFiltersContainerSkeleton />
  }

  return (
    <CollectionNftsAndFiltersContainer
      nfts={filterNftsByTraits(data!, traitsFilter)}
      traits={traits}
      isFetchingNfts={isLoading}
      onMakeOfferForNft={onMakeOfferForNft}
      onTraitSelectionUpdate={(selection) => {
        setTraitsFilter(selection)
      }}
    />
  )
}
