import { updateOfferHandler } from '../../src/handlers/offer/update-offer-handler'
import { UpdateOfferAction } from '../../src/types/model/helper/update-offer-action'
import { UpdateOfferRequest } from '../../src/types/model/requests/update-offer-request'
import * as updateOfferState from '../../src/utils/handler/update-offer-state'
import { mockRequestResponse } from '../../src/utils/test/mocks/request-response'
import { mockSession } from '../../src/utils/test/mocks/session'
import { FirestoreOfferData, offerFirestoreData } from '@echo/firestore'
import { OfferState } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { omit } from 'ramda'

jest.mock('../../src/utils/handler/update-offer-state')

describe('handlers - updateOfferHandler', () => {
  const mockedUpdateOffer = jest.spyOn(updateOfferState, 'updateOfferState')
  const mockedRequest: UpdateOfferRequest = {
    id: 'LyCfl6Eg7JKuD7XJ6IPi',
    action: UpdateOfferAction.ACCEPT
  }
  const session = mockSession

  function state(action: UpdateOfferAction) {
    switch (action) {
      case UpdateOfferAction.CANCEL:
        return OfferState.CANCELLED
      case UpdateOfferAction.ACCEPT:
        return OfferState.ACCEPTED
      case UpdateOfferAction.REJECT:
        return OfferState.REJECTED
    }
  }

  async function testHandler(action: UpdateOfferAction) {
    const expected = offerFirestoreData['LyCfl6Eg7JKuD7XJ6IPi']!
    const expectedState = state(action)
    const { req, res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET', undefined, {
      ...mockedRequest,
      action
    })
    await updateOfferHandler(req, res, session)
    expect(res.statusCode).toBe(200)
    expect(mockedUpdateOffer).toBeCalled()
    const newOffer = res._getJSONData() as FirestoreOfferData
    expect(omit(['activities', 'state'], newOffer)).toEqual(omit(['activities', 'state'], expected))
    expect(newOffer.activities).toHaveLength(2)
    expect(newOffer.state).toBe(expectedState)
    expect(newOffer.activities[1]!.fromState).toBe(OfferState.OPEN)
    expect(newOffer.activities[1]!.toState).toBe(expectedState)
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('if not authenticated, returns 401', async () => {
    const { req, res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET')
    await updateOfferHandler(req, res, undefined)
    expect(res.statusCode).toBe(401)
    expect(res._getJSONData()).toEqual({ error: 'You must be logged in' })
  })
  it('if wrong req, returns 400', async () => {
    const { req, res } = mockRequestResponse<UpdateOfferRequest, never, FirestoreOfferData>('GET', undefined, {
      ...mockedRequest,
      action: 10
    })
    await updateOfferHandler(req, res, session)
    expect(res.statusCode).toBe(400)
    expect(res._getJSONData()).toEqual({ error: 'Invalid body' })
  })
  it('if proper data (accepted), returns 200 with data', async () => {
    await testHandler(UpdateOfferAction.ACCEPT)
  })
  it('if proper data (cancelled), returns 200 with data', async () => {
    await testHandler(UpdateOfferAction.CANCEL)
  })
  it('if proper data (rejected), returns 200 with data', async () => {
    await testHandler(UpdateOfferAction.REJECT)
  })
})
