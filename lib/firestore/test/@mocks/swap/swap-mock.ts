import { type Swap } from '@echo/firestore/types/model/swap/swap'
import { OFFER_MOCK_FROM_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'

export const SWAP_MOCK_ID = '2ipuV3drjQlzEgkUkW7q'
export const swapMock: Record<string, Swap> = {
  '2ipuV3drjQlzEgkUkW7q': {
    offerId: OFFER_MOCK_FROM_JOHNNYCAGE_ID,
    transactionId: '0xb384a4949fe643aa638827e381e62513e412af409b0744a37065dd59b0a5309b',
    createdAt: 1676984897
  }
}
