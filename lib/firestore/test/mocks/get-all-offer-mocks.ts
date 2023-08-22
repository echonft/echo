import { Offer } from '../../src/types/model/offer'
import { offerMock } from './offer-mock'
import { NonEmptyArray } from '@echo/utils'

export const getAllOfferMocks = () => Object.values(offerMock) as NonEmptyArray<Offer>
