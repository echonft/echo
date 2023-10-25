import { nftApiUrl } from '@echo/api/routing/nft-api-url'
import { nftListingsApiUrl } from '@echo/api/routing/nft-listings-api-url'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { type NftResponse } from '@echo/api/types/responses/nft-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { fetcher } from '@echo/frontend/lib/helpers/fetcher'
import { mapListingFiltersToQueryParams } from '@echo/frontend/lib/helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@echo/frontend/lib/helpers/request/map-query-constraints-to-query-params'
import { NftDetailsApiProvided } from '@echo/ui/components/nft/api-provided/nft-details-api-provided'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { getServerSession } from 'next-auth/next'
import { isNil, mergeLeft } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
    tokenId: string
  }
}

const NftPage: FunctionComponent<Props> = async ({ params: { slug, tokenId } }) => {
  const session = await getServerSession(authOptions)
  const { data, error } = await fetcher(nftApiUrl(slug, tokenId)).revalidate(3600).fetch<NftResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt' }],
    limit: 5
  })
  const filtersQueryParam = mapListingFiltersToQueryParams({ states: ['OPEN'] })
  const { data: listingsData, error: listingsError } = await fetcher(nftListingsApiUrl(data.nft.id))
    .revalidate(3600)
    .query(mergeLeft(constraintsQueryParams, filtersQueryParam))
    .fetch<ListingsResponse>()

  if (!isNil(listingsError)) {
    logger.error(
      `error fetching NFT with tokenId ${tokenId} for collection with slug ${slug}: ${errorMessage(listingsError)}`
    )
  }

  return <NftDetailsApiProvided nft={data.nft} listings={listingsData?.listings ?? []} user={session?.user} />
}

export default NftPage
