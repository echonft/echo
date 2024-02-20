import { findOfferSignature } from '@echo/firestore/crud/offer-signature/find-offer-signature'
import { deleteOfferSignature } from '@echo/firestore-test/offer-signature/delete-offer-signature'
import { unchecked_addOfferSignature } from '@echo/firestore-test/offer-signature/unchecked_add-offer-signature'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - offer-signature - findOfferSignature', () => {
  let createdOfferSignatureId: Nullable<string>
  const offerId = 'offer-id'
  const userId = 'user-id'
  const signature = '0xsignature'

  beforeEach(() => {
    createdOfferSignatureId = undefined
  })
  afterEach(async () => {
    if (!isNil(createdOfferSignatureId)) {
      try {
        await deleteOfferSignature(createdOfferSignatureId)
      } catch (e) {
        pinoLogger.error(`Error deleting offer signature with id ${createdOfferSignatureId}: ${errorMessage(e)}`)
      }
    }
  })

  it('returns undefined if the offer signature is not found', async () => {
    const createdOfferSignature = await unchecked_addOfferSignature({ offerId, userId, signature })
    createdOfferSignatureId = createdOfferSignature.id
    const notFoundOfferSignature = await findOfferSignature('not-found')
    expect(notFoundOfferSignature).toBeUndefined()
  })

  it('returns the offer signature with the given offer id and user id', async () => {
    const createdOfferSignature = await unchecked_addOfferSignature({ offerId, userId, signature })
    createdOfferSignatureId = createdOfferSignature.id
    const foundOfferSignature = (await findOfferSignature(offerId))!
    expect(foundOfferSignature).toStrictEqual(createdOfferSignature)
  })
})
