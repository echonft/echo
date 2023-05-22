/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getDocRefFromPath } from '../../../utils/document/get-doc-ref-from-path'
import { requestForOfferSnapshots } from '../../../utils/test/mocks/request-for-offer/request-for-offer-snapshot'
import { updateRequestForOfferOffers } from '../update-request-for-offer-offers'
import { mockOffer, mockRequestForOffer, RequestForOfferState } from '@echo/model'
import { DocumentReference } from '@google-cloud/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../../utils/document/get-doc-ref-from-path')
jest.mock('@google-cloud/firestore')

describe('crud - request-for-offer - updateRequestForOfferOffers', () => {
  const requestForOffer = mockRequestForOffer
  const offer = mockOffer
  // @ts-ignore
  const mockedGetDocRefFromPath = jest.mocked(getDocRefFromPath).mockResolvedValue({})
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('if requestForOfferId does not exist, rejects', () => {
    // @ts-ignore
    mockedGetDocRefFromPath.mockImplementation((collectionPath) => {
      if (collectionPath === 'request-for-offers') {
        return undefined
      } else {
        return {}
      }
    })
    updateRequestForOfferOffers(requestForOffer.id, offer.id)
      .then(() => expect(false).toBeTruthy())
      .catch((error) => expect(error).toEqual('Request for offer not found'))
  })
  it('if offerId does not exist, rejects', () => {
    // @ts-ignore
    mockedGetDocRefFromPath.mockImplementation((collectionPath) => {
      if (collectionPath === 'request-for-offers') {
        return {}
      } else {
        return undefined
      }
    })
    updateRequestForOfferOffers(requestForOffer.id, offer.id)
      .then(() => expect(false).toBeTruthy())
      .catch((error) => expect(error).toEqual('Offer not found'))
  })
  it('if request for offer and offer exists, updates and return write data', () => {
    const mockRef = jest.mocked(DocumentReference.prototype)
    const mockGetter = mockRef.get.mockImplementation(() => {
      return Promise.resolve(requestForOfferSnapshots['jUzMtPGKM62mMhEcmbN4']!)
    })
    // @ts-ignore
    mockRef.update.mockImplementation(() => {
      return Promise.resolve({})
    })
    // @ts-ignore
    mockedGetDocRefFromPath.mockImplementation((collectionPath) => {
      if (collectionPath === 'request-for-offers') {
        return mockRef
      } else {
        return {}
      }
    })
    updateRequestForOfferOffers(requestForOffer.id, mockOffer.id)
      .then((data) => expect(data).toBeDefined())
      .catch(() => expect(false).toBeTruthy())
    expect(mockGetter).toHaveBeenCalled()
    // To cover all the branches
    // @ts-ignore
    mockRef.get.mockImplementation(() => {
      return Promise.resolve({
        ...requestForOfferSnapshots['jUzMtPGKM62mMhEcmbN4']!,
        data: () => ({
          ...requestForOfferSnapshots['jUzMtPGKM62mMhEcmbN4']!.data(),
          state: RequestForOfferState.CREATED,
          offers: undefined
        })
      })
    })
    updateRequestForOfferOffers(requestForOffer.id, mockOffer.id)
      .then((data) => expect(data).toBeDefined())
      .catch(() => expect(false).toBeTruthy())
    expect(mockGetter).toHaveBeenCalled()
  })
})
