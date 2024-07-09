import { type ListingTargetRequest } from '@echo/api/types/requests/listing-target-request'
import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { assoc, isNil } from 'ramda'

export async function getListingTargetFromRequest(request: ListingTargetRequest): Promise<ListingTarget> {
  const {
    collection: { slug }
  } = request
  const collection = await getCollection(slug)
  if (isNil(collection)) {
    return Promise.reject(new BadRequestError())
  }
  return assoc('collection', collection, request)
}
