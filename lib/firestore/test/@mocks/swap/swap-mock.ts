import { type Swap } from '@echo/firestore/types/model/swap/swap'
import { offerMockFromJohnnycageId } from '@echo/model-mocks/offer/offer-mock'

export function swapMockId() {
  return '2ipuV3drjQlzEgkUkW7q'
}
export function swapMock(): Record<string, Swap> {
  return {
    '2ipuV3drjQlzEgkUkW7q': {
      offerId: offerMockFromJohnnycageId(),
      transactionId: '0xb384a4949fe643aa638827e381e62513e412af409b0744a37065dd59b0a5309b',
      createdAt: 1676984897
    }
  }
}
