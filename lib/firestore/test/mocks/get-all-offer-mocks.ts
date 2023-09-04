import { offerMock } from './offer-mock'
import { Offer } from '@echo/firestore-types'
import { NonEmptyArray } from '@echo/utils'

export const getAllOfferMocks = () => Object.values(offerMock) as NonEmptyArray<Offer>
