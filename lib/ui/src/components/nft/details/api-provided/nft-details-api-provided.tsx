'use client'
import type { ListingResponse } from '@echo/api/types/responses/model/listing-response'
import type { NftResponse } from '@echo/api/types/responses/model/nft-response'
import { NftDetails } from '@echo/ui/components/nft/details/nft-details'
import { mapListingFromResponse } from '@echo/ui/mappers/from-api/map-listing-from-response'
import { mapNftFromResponse } from '@echo/ui/mappers/from-api/map-nft-from-response'
import { map } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  nftResponse: Partial<NftResponse>
  listingsResponses: Array<Partial<ListingResponse>>
}

export const NftDetailsApiProvided: FunctionComponent<Props> = ({ nftResponse, listingsResponses }) => {
  const nft = useMemo(() => mapNftFromResponse(nftResponse), [nftResponse])
  const listings = useMemo(() => map(mapListingFromResponse, listingsResponses), [listingsResponses])

  return <NftDetails nft={nft} listings={listings} />
}
