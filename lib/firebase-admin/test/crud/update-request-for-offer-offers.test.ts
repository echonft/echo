/* eslint-disable @typescript-eslint/ban-ts-comment */
import { updateRequestForOfferOffers } from '../../src/crud/request-for-offer/update-request-for-offer-offers'
import { getDocRefFromPath } from '../../src/utils/document/get-doc-ref-from-path'
import { requestForOfferSnapshots } from '../mocks/request-for-offer/request-for-offer-snapshot'
import { CollectionName } from '@echo/firestore'
import { offers, RequestForOfferState, requestsForOffer } from '@echo/model'
import { DocumentReference } from '@google-cloud/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../../utils/document/get-doc-ref-from-path')
jest.mock('@google-cloud/firestore')

describe('crud - request-for-offer - updateRequestForOfferOffers', () => {
  const requestForOffer = requestsForOffer['jUzMtPGKM62mMhEcmbN4']!
  const offer = offers['LyCfl6Eg7JKuD7XJ6IPi']!
  // @ts-ignore
  const mockedGetDocRefFromPath = jest.mocked(getDocRefFromPath).mockResolvedValue({})
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('if requestForOfferId does not exist, rejects', () => {
    // @ts-ignore
    mockedGetDocRefFromPath.mockImplementation((collectionPath) => {
      if (collectionPath === CollectionName.REQUESTS_FOR_OFFER) {
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
      if (collectionPath === CollectionName.REQUESTS_FOR_OFFER) {
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
    // @ts-ignore
    const mockGetter = mockRef.get.mockImplementation(() => {
      return Promise.resolve(requestForOfferSnapshots['jUzMtPGKM62mMhEcmbN4']!)
    })
    // @ts-ignore
    mockRef.update.mockImplementation(() => {
      return Promise.resolve({})
    })
    // @ts-ignore
    mockedGetDocRefFromPath.mockImplementation((collectionPath) => {
      if (collectionPath === CollectionName.REQUESTS_FOR_OFFER) {
        return mockRef
      } else {
        return {}
      }
    })
    updateRequestForOfferOffers(requestForOffer.id, offer.id)
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
    updateRequestForOfferOffers(requestForOffer.id, offer.id)
      .then((data) => expect(data).toBeDefined())
      .catch(() => expect(false).toBeTruthy())
    expect(mockGetter).toHaveBeenCalled()
  })
})
