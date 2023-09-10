import { fetcher } from '../../../../../../lib/helpers/fetcher'
import { mapListingFiltersToQueryParams } from '../../../../../../lib/helpers/request/map-listing-filters-to-query-params'
import { mapQueryConstraintsToQueryParams } from '../../../../../../lib/helpers/request/map-query-constraints-to-query-params'
import { GetListingsResponse, GetNftResponse, nftListingsApiUrl } from '@echo/api'
import { nftApiUrl } from '@echo/api/src/routing/nft-api-url'
import { NftDetailsApiProvided } from '@echo/ui/src/components/nft/details/api-provided/nft-details-api-provided'
import { clsx } from 'clsx'
import { isNil, mergeLeft } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  params: {
    slug: string
    tokenId: string
  }
}

const NftPage: FunctionComponent<Props> = async ({ params: { slug, tokenId } }) => {
  const { data, error } = await fetcher(nftApiUrl(slug, tokenId)).revalidate(3600).fetch<GetNftResponse>()

  if (isNil(data)) {
    if (!isNil(error)) {
      throw Error(error.message)
    }
    throw Error()
  }

  const constraintsQueryParams = mapQueryConstraintsToQueryParams({
    orderBy: { field: 'expiresAt' },
    limit: 5
  })
  const filtersQueryParam = mapListingFiltersToQueryParams({ states: ['OPEN'] })
  const { data: listingsData, error: listingsError } = await fetcher(nftListingsApiUrl(data.nft.id!))
    .revalidate(3600)
    .query(mergeLeft(constraintsQueryParams, filtersQueryParam))
    .fetch<GetListingsResponse>()

  if (!isNil(listingsError)) {
    // TODO log it
  }

  return (
    <section className={clsx('w-full', 'pt-12')}>
      <NftDetailsApiProvided nftResponse={data.nft} listingsResponses={listingsData?.listings ?? []} />
    </section>
  )
}

export default NftPage
