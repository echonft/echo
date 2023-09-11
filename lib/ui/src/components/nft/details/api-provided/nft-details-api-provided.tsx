'use client'
import { NftDetails } from '../nft-details'
import type { ListingResponse, NftResponse } from '@echo/api/types'
import { mapListing, mapNft } from '@echo/ui-model'
import { map } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

interface Props {
  nftResponse: Partial<NftResponse>
  listingsResponses: Array<Partial<ListingResponse>>
}

export const NftDetailsApiProvided: FunctionComponent<Props> = ({ nftResponse, listingsResponses }) => {
  const nft = useMemo(() => mapNft(nftResponse), [nftResponse])
  const listings = useMemo(() => map(mapListing, listingsResponses), [listingsResponses])

  return <NftDetails nft={nft} listings={listings} />
}
