import { ApiError } from '../error/api-error'
import { Listing } from '@echo/firestore'
import { isNil } from 'ramda'

export const assertListing = (listing: Listing | undefined) => {
  if (isNil(listing)) {
    throw new ApiError(400, 'Invalid listing id')
  }
}
