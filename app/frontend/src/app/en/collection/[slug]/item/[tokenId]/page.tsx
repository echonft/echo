import { authOptions } from '@constants/auth-options'
import { nftApiUrl } from '@echo/api/routing/nft-api-url'
import { nftListingsApiUrl } from '@echo/api/routing/nft-listings-api-url'
import type { GetListingsResponse } from '@echo/api/types/responses/get-listings-response'
import type { GetNftResponse } from '@echo/api/types/responses/get-nft-response'
import { NftDetailsApiProvided } from '@echo/ui/components/nft/api-provided/nft-details-api-provided'
import { errorMessage } from '@echo/utils/error/error-message'
import { logger } from '@echo/utils/services/logger'
import { fetcher } from '@helpers/fetcher'
import { mapListingFiltersToQueryParams } from '@helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@helpers/request/map-query-constraints-to-query-params'
import { getServerSession } from 'next-auth/next'
import { isNil, mergeLeft } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
    tokenId: string
  }
}

const NftPage: FunctionComponent<Props> = async ({ params: { slug, tokenId } }) => {
  const session = await getServerSession(authOptions)
  const { data, error } = await fetcher(nftApiUrl(slug, tokenId)).revalidate(3600).fetch<GetNftResponse>()

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
    .fetch<GetListingsResponse>()

  if (!isNil(listingsError)) {
    logger.error(
      `error fetching NFT with tokenId ${tokenId} for collection with slug ${slug}: ${errorMessage(listingsError)}`
    )
  }

  return <NftDetailsApiProvided nft={data.nft} listings={listingsData?.listings ?? []} user={session?.user} />
}

export default NftPage
