import { listingMock } from './listing-mock'
import { Listing } from '@echo/firestore-types'
import type { NonEmptyArray } from '@echo/utils/types'

export const getAllListingMocks = () => Object.values(listingMock) as NonEmptyArray<Listing>
