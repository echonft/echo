import { fetchCollectionDetails } from '@echo/pallet/fetchers/fetch-collection-details'
import { error, info } from '@echo/pallet/helpers/logger'
import type { CollectionDetailsResponse } from '@echo/pallet/types/response/collection-details-response'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil, otherwise, pipe } from 'ramda'

export async function getCollectionDetails(seiAddress: string): Promise<Nullable<CollectionDetailsResponse>> {
  info({ seiAddress }, 'fetching collection details from Pallet...')

  const response = await pipe(
    fetchCollectionDetails,
    otherwise<CollectionDetailsResponse, Nullable<CollectionDetailsResponse>>((err) => {
      error({ err, seiAddress }, 'Failed to fetch collection details from Pallet')
      return undefined
    })
  )(seiAddress)

  if (isNil(response)) {
    error({ seiAddress }, 'Failed to fetch collection details from Pallet')
    return undefined
  }

  info({ seiAddress }, 'completed fetching collection details from Pallet')
  return response
}
