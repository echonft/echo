/* eslint-disable @typescript-eslint/ban-ts-comment */
import { updateRequestForOfferActivities } from '../../src/crud/request-for-offer/update-request-for-offer-activities'
import { getDocRefFromPath } from '../../src/utils/document/get-doc-ref-from-path'
import { requestForOfferFirestoreData } from '@echo/firestore'
import { DocumentReference } from '@google-cloud/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../../utils/document/get-doc-ref-from-path')
jest.mock('@google-cloud/firestore')

describe('crud - request-for-offer - updateRequestForOfferActivities', () => {
  const requestForOffer = requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!
  const mockRef = jest.mocked(DocumentReference.prototype)
  const mockedGetDocRefFromPath = jest.mocked(getDocRefFromPath)
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('if requestForOfferId does not exist, rejects', () => {
    // @ts-ignore
    mockedGetDocRefFromPath.mockReturnValueOnce(undefined)
    updateRequestForOfferActivities(requestForOffer.id, requestForOffer.activities, requestForOffer.activities[0]!)
      .then(() => expect(false).toBeTruthy())
      .catch((error) => expect(error).toEqual('Request for offer not found'))
  })
  it('if requestForOfferId exist, update', () => {
    const mockedUpdateRef = jest
      .spyOn(DocumentReference.prototype, 'update')
      // @ts-ignore
      .mockImplementation(() => Promise.resolve({}))
    // @ts-ignore
    mockedGetDocRefFromPath.mockReturnValueOnce(mockRef)
    updateRequestForOfferActivities(requestForOffer.id, requestForOffer.activities, requestForOffer.activities[0]!)
      .then((data) => expect(data).toBeDefined())
      .catch(() => expect(false).toBeTruthy())
    expect(mockedUpdateRef).toHaveBeenCalled()
  })
})
