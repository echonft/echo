import { useApiHooks } from '../../../dependencies/hooks/use-api-hooks'
import { CollectionNftsAndFiltersContainerSkeleton } from '../../skeleton/collection/collection-nfts-and-filters-container-skeleton'
import { CollectionNftsAndFiltersContainer } from '../collection-nfts-and-filters-container'
import { getTraitsForNfts, Nft, NftTraits } from '@echo/ui-model'
import { isNil } from 'ramda'
import { FunctionComponent, useEffect, useRef, useState } from 'react'

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
  const loadedDataRef = useRef<Nft[]>()
  const { data, isLoading, error } = useNftsForCollection(collectionSlug, traitsFilter)

  // error handling
  useEffect(() => {
    if (!isNil(error) && !isNil(onError)) {
      onError(error)
    }
  }, [error, onError])

  useEffect(() => {
    if (!isNil(data)) {
      // update fetched NFTs
      loadedDataRef.current = [...data]
      // set the collection traits if it's the first fetch
      if (isNil(traits)) {
        setTraits(getTraitsForNfts([...data]))
      }
    }
  }, [data, traits])

  if (isNil(traits)) {
    return <CollectionNftsAndFiltersContainerSkeleton />
  }

  return (
    <CollectionNftsAndFiltersContainer
      nfts={(data ?? loadedDataRef.current)!}
      traits={traits}
      isFetchingNfts={isLoading}
      onMakeOfferForNft={onMakeOfferForNft}
      onTraitSelectionUpdate={(selection) => {
        setTraitsFilter(selection)
      }}
    />
  )
}
