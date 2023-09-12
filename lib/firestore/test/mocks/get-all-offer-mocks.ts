import { offerMock } from './offer-mock'
import { Offer } from '@echo/firestore-types'
import type { NonEmptyArray } from '@echo/utils/types'

export const getAllOfferMocks = () => Object.values(offerMock) as NonEmptyArray<Offer>
