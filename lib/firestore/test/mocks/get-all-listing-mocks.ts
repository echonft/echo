import { listingMock } from './listing-mock'
import { Listing } from '@echo/firestore-types'
import { NonEmptyArray } from '@echo/utils'

export const getAllListingMocks = () => Object.values(listingMock) as NonEmptyArray<Listing>
