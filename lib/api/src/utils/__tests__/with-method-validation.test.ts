import { successHandler } from '../test/mocks/handler'
import { mockRequestResponse } from '../test/mocks/request-response'
import { withMethodValidation } from '../with-method-validation'
import { describe, expect, it } from '@jest/globals'

describe('utils - withMethodValidation', () => {
  it('invalid method fails (1 allowed)', async () => {
    const { req, res } = mockRequestResponse('PUT')
    try {
      await withMethodValidation(successHandler, ['GET'])(req, res)
    } catch (e) {
      expect((e as Error).message).toBe('Method PUT Not Allowed')
      expect(res.statusCode).toBe(405)
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json', allow: ['GET'] })
      expect(res._getJSONData()).toEqual({ error: 'Method PUT Not Allowed' })
    }
  })
  it('empty method fails', async () => {
    const { req, res } = mockRequestResponse('GET')
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await withMethodValidation(successHandler, ['GET'])({ ...req, method: undefined }, res)
    } catch (e) {
      expect((e as Error).message).toBe('Method  Not Allowed')
      expect(res.statusCode).toBe(405)
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json', allow: ['GET'] })
      expect(res._getJSONData()).toEqual({ error: 'Method  Not Allowed' })
    }
  })
  it('invalid method fails (multiple allowed)', async () => {
    const { req, res } = mockRequestResponse('PUT')
    try {
      await withMethodValidation(successHandler, ['GET', 'POST', 'DELETE'])(req, res)
    } catch (e) {
      expect((e as Error).message).toBe('Method PUT Not Allowed')
      expect(res.statusCode).toBe(405)
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json', allow: ['GET', 'POST', 'DELETE'] })
      expect(res._getJSONData()).toEqual({ error: 'Method PUT Not Allowed' })
    }
  })
  it('empty allowed methods fails', async () => {
    const { req, res } = mockRequestResponse('PUT')
    try {
      await withMethodValidation(successHandler, [])(req, res)
    } catch (e) {
      expect((e as Error).message).toBe('Method PUT Not Allowed')
      expect(res.statusCode).toBe(405)
      expect(res.getHeaders()).toEqual({ 'content-type': 'application/json', allow: [] })
      expect(res._getJSONData()).toEqual({ error: 'Method PUT Not Allowed' })
    }
  })
  it('proper method success (1 allowed)', async () => {
    const { req, res } = mockRequestResponse('GET')
    await withMethodValidation(successHandler, ['GET'])(req, res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ message: 'OK' })
  })
  it('proper method success (multiple allowed)', async () => {
    const { req, res } = mockRequestResponse('GET')
    await withMethodValidation(successHandler, ['GET', 'POST', 'DELETE'])(req, res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ message: 'OK' })
  })
})
