import { ApiError } from '../api-error'
import { Listing } from '@echo/firestore'
import { isNil } from 'ramda'

export const assertListing = (listing: Listing | undefined) => {
  if (isNil(listing)) {
    throw new ApiError(400, 'Invalid listing id')
  }
  if (listing.expired) {
    throw new ApiError(400, 'Listing is expired')
  }
  if (listing.state === 'CANCELLED') {
    throw new ApiError(400, 'Listing has already been cancelled')
  }
  if (listing.state === 'INVALID') {
    throw new ApiError(400, 'Listing is not valid')
  }
}
