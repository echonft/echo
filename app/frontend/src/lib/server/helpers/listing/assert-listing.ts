import { BadRequestError } from '../error/bad-request-error'
import { Listing } from '@echo/firestore'
import { isNil } from 'ramda'

export const assertListing = (listing: Listing | undefined) => {
  if (isNil(listing)) {
    throw new BadRequestError()
  }
}
