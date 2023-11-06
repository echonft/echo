import { nftApiUrl } from '@echo/api/routing/nft-api-url'
import { nftListingsApiUrl } from '@echo/api/routing/nft-listings-api-url'
import { type ListingsResponse } from '@echo/api/types/responses/listings-response'
import { type NftResponse } from '@echo/api/types/responses/nft-response'
import { authOptions } from '@echo/frontend/lib/constants/auth-options'
import { mapListingFiltersToQueryParams } from '@echo/frontend/lib/helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '@echo/frontend/lib/helpers/request/map-query-constraints-to-query-params'
import { assertFetchResult } from '@echo/frontend/lib/services/fetcher/assert-fetch-result'
import { fetcher } from '@echo/frontend/lib/services/fetcher/fetcher'
import { nftContext } from '@echo/model/sentry/contexts/nft-context'
import { NftDetailsApiProvided } from '@echo/ui/components/nft/api-provided/nft-details-api-provided'
import { captureException } from '@sentry/nextjs'
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
  const result = await fetcher(nftApiUrl(slug, tokenId)).fetch<NftResponse>()
  assertFetchResult(result)
  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: [{ field: 'expiresAt', direction: 'asc' }],
    limit: 5
  })
  const filtersQueryParam = mapListingFiltersToQueryParams({ state: ['OPEN'] })
  const { data, error } = await fetcher(nftListingsApiUrl(result.data.nft.id))
    .query(mergeLeft(constraintsQueryParams, filtersQueryParam))
    .fetch<ListingsResponse>()
  if (!isNil(error)) {
    captureException(error, { contexts: nftContext(result.data.nft) })
  }
  return <NftDetailsApiProvided nft={result.data.nft} listings={data?.listings ?? []} user={session?.user} />
}

export default NftPage
