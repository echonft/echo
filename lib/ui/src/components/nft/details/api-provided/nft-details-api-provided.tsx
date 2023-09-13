'use client'
import type { ListingResponse } from '@echo/api/types/responses/model/listing-response'
import type { NftResponse } from '@echo/api/types/responses/model/nft-response'
import { NftDetails } from '@echo/ui/components/nft/details/nft-details'
import { mapListing } from '@echo/ui/mappers/from-api/map-listing'
import { mapNft } from '@echo/ui/mappers/from-api/map-nft'
import { map } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  nftResponse: Partial<NftResponse>
  listingsResponses: Array<Partial<ListingResponse>>
}

export const NftDetailsApiProvided: FunctionComponent<Props> = ({ nftResponse, listingsResponses }) => {
  const nft = useMemo(() => mapNft(nftResponse), [nftResponse])
  const listings = useMemo(() => map(mapListing, listingsResponses), [listingsResponses])

  return <NftDetails nft={nft} listings={listings} />
}
