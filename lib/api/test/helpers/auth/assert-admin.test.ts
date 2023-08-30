import { assertAdmin } from '../../../src/helpers/auth/assert-admin'
import { getAdminApiKey } from '../../../src/helpers/auth/get-admin-api-key'
import { ApiRequest } from '@echo/api-public'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { NextRequest } from 'next/server'

jest.mock('../../../src/helpers/auth/get-admin-api-key')

describe('helpers - auth - assertAdmin', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the authorization header is nil', () => {
    jest.mocked(getAdminApiKey).mockImplementationOnce(() => 'test')
    const req = new NextRequest('https://echo.xyz/') as ApiRequest<never>
    expect(() => assertAdmin(req)).toThrow()
  })

  it('throws if the authorization header is not the admin key', () => {
    jest.mocked(getAdminApiKey).mockImplementationOnce(() => 'test')
    const req = new NextRequest('https://echo.xyz/', {
      headers: {
        Authorization: 'Bearer not-valid'
      }
    }) as ApiRequest<never>
    expect(() => assertAdmin(req)).toThrow()
  })

  it('does not throw if the authorization header is the admin key', () => {
    jest.mocked(getAdminApiKey).mockImplementationOnce(() => 'test')
    const req = new NextRequest('https://echo.xyz/', {
      headers: {
        Authorization: 'Bearer test'
      }
    }) as ApiRequest<never>
    expect(() => assertAdmin(req)).not.toThrow()
  })
})
