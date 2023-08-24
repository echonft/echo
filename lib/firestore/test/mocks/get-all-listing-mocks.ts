import { Listing } from '../../src/types/model/listing'
import { listingMock } from './listing-mock'
import { NonEmptyArray } from '@echo/utils'

export const getAllListingMocks = () => Object.values(listingMock) as NonEmptyArray<Listing>
