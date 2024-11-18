import { rejectOffer } from '@echo/backend/actions/reject-offer'
import { AuthError } from '@echo/backend/errors/messages/auth-error'
import { getAuthUser } from '@echo/backend/helpers/get-auth-user'
import { getOffer } from '@echo/firestore/crud/offer/get-offer'
import { rejectOffer as firestoreRejectOffer } from '@echo/firestore/crud/offer/reject-offer'
import { offerDocumentMockToJohnnycage } from '@echo/firestore/mocks/offer-document-mock'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { OfferError } from '@echo/model/constants/errors/offer-error'
import { OfferState } from '@echo/model/constants/offer-state'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { assoc, modify } from 'ramda'

jest.mock('@echo/backend/helpers/get-auth-user')
jest.mock('@echo/firestore/services/initialize-firebase')
jest.mock('@echo/firestore/crud/offer/get-offer')
jest.mock('@echo/firestore/crud/offer/reject-offer')

describe('rejectOffer', () => {
  const slug = offerDocumentMockToJohnnycage.slug
  beforeEach(() => {
    jest.clearAllMocks()
    jest.mocked(getAuthUser).mockResolvedValue(userMockJohnny)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.mocked(initializeFirebase).mockImplementation(() => {})
    jest.mocked(getOffer).mockResolvedValue(offerDocumentMockToJohnnycage)
    jest.mocked(firestoreRejectOffer).mockResolvedValue(offerDocumentMockToJohnnycage)
  })

  it('throws if the offer does not exist', async () => {
    jest.mocked(getOffer).mockResolvedValue(undefined)
    await expect(rejectOffer(slug)).rejects.toEqual(Error(OfferError.NotFound))
  })

  it('throws if the offer is locked', async () => {
    jest.mocked(getOffer).mockResolvedValue(assoc('locked', true, offerDocumentMockToJohnnycage))
    await expect(rejectOffer(slug)).rejects.toEqual(Error(AuthError.Forbidden))
  })

  it('throws if the user is not the offer receiver', async () => {
    jest
      .mocked(getOffer)
      .mockResolvedValue(modify('receiver', assoc('username', 'another-user'), offerDocumentMockToJohnnycage))

    await expect(rejectOffer(slug)).rejects.toEqual(Error(AuthError.Forbidden))
  })

  it('returns the rejected offer on success', async () => {
    jest
      .mocked(firestoreRejectOffer)
      .mockResolvedValue(assoc('state', OfferState.Rejected, offerDocumentMockToJohnnycage))
    const result = await rejectOffer(slug)
    expect(firestoreRejectOffer).toHaveBeenCalledTimes(1)
    expect(result).toStrictEqual(assoc('state', OfferState.Rejected, offerMockToJohnnycage))
  })
})
