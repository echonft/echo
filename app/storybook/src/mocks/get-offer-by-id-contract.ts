import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockFromJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { errorStore } from '@echo/storybook/mocks/stores/error-store'
import { toPromise } from '@echo/utils/fp/to-promise'
import { toRejectedPromise } from '@echo/utils/fp/to-rejected-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { applySpec, identity, pipe } from 'ramda'

export function getOfferByIdContract(): Promise<OfferResponse> {
  const error = errorStore.getState().getNonceError
  if (error) {
    return delayPromise(toRejectedPromise, 800)()
  }
  return delayPromise(
    pipe(applySpec<OfferResponse>({ offer: identity }), toPromise),
    800
  )(getOfferMockById(offerMockFromJohnnycageId()))
}
