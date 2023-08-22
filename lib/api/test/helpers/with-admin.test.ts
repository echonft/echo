import { withAdmin } from '../../src/helpers/with-admin'
import { successHandler } from '../mocks/handler'
import { mockRequestResponse } from '../mocks/request-response'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../src/helpers/auth/get-admin-api-key')

describe('utils - withAdmin', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('not admin returns an error', async () => {
    const { req, res } = mockRequestResponse('GET')
    try {
      await withAdmin(successHandler)(req, res)
    } catch (e) {
      expect((e as Error).message).toBe('Admin access restricted')
      expect(res.statusCode).toBe(401)
      expect(res._getJSONData()).toEqual({ error: 'Admin access restricted' })
    }
  })
  it('proper admin key success', async () => {
    const { req, res } = mockRequestResponse('GET', undefined, undefined, { authorization: 'adminKey' })
    await withAdmin(successHandler)(req, res)
    expect(res.statusCode).toBe(200)
    expect(res._getJSONData()).toEqual({ message: 'OK' })
  })
})
