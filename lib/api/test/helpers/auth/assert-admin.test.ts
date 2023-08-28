import { assertAdmin } from '../../../src/helpers/auth/assert-admin'
import { getAdminApiKey } from '../../../src/helpers/auth/get-admin-api-key'
import { mockRequestResponse } from '../../mocks/request-response'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('../../../src/helpers/auth/get-admin-api-key')

describe('helpers - auth - assertAdmin', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the authorization header is nil', () => {
    jest.mocked(getAdminApiKey).mockImplementationOnce(() => 'test')
    const { req } = mockRequestResponse<never, never, never>('GET', undefined, undefined)
    expect(() => assertAdmin(req)).toThrow()
  })

  it('throws if the authorization header is not the admin key', () => {
    jest.mocked(getAdminApiKey).mockImplementationOnce(() => 'test')
    const { req } = mockRequestResponse<never, never, never>('GET', undefined, undefined, {
      authorization: 'Bearer not-valid'
    })
    expect(() => assertAdmin(req)).toThrow()
  })

  it('does not throw if the authorization header is the admin key', () => {
    jest.mocked(getAdminApiKey).mockImplementationOnce(() => 'test')
    const { req } = mockRequestResponse<never, never, never>('GET', undefined, undefined, {
      authorization: 'Bearer test'
    })
    expect(() => assertAdmin(req)).not.toThrow()
  })
})
