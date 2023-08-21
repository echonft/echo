// FIXME should be in @echo/api

// import createRequestForOffer from '../create'
// import * as api from '@echo/api'
// import { mockRequestResponse, mockSession } from '@echo/api'
// import { CreateRequestForOfferRequest, RequestForOfferResponse } from '@echo/api-public'
// import { beforeEach, describe, expect, it, jest } from '@jest/globals'
// import { getServerSession } from 'next-auth'
//
// jest.mock('next-auth')
// jest.mock('../../auth/[...nextauth]')
//
// describe('routes - listing - create', () => {
//   const mockedGetServerSession = jest.mocked(getServerSession)
//
//   beforeEach(() => {
//     jest.clearAllMocks()
//   })
//
//   it('if invalid method, returns a 405', async () => {
//     const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>('GET')
//     await createRequestForOffer(req, res)
//     expect(res.statusCode).toBe(405)
//     expect(res.getHeaders()).toEqual({ 'content-type': 'application/json', allow: ['PUT'] })
//     expect(res._getJSONData()).toEqual({ error: 'Method GET Not Allowed' })
//   })
//   it('if not logged in, returns a 401', async () => {
//     const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>('PUT')
//     await createRequestForOffer(req, res)
//     expect(res.statusCode).toBe(401)
//     expect(res._getJSONData()).toEqual({ error: 'Forbidden' })
//   })
//   it('if correct req, handler is called', async () => {
//     mockedGetServerSession.mockResolvedValue(mockSession)
//     const spiedFunction = jest.spyOn(api, 'createRequestForOfferHandler')
//     const { req, res } = mockRequestResponse<CreateRequestForOfferRequest, never, RequestForOfferResponse>('PUT')
//     await createRequestForOffer(req, res)
//     expect(spiedFunction).toBeCalled()
//   })
// })
