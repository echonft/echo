import { ApiRequest } from '@echo/api'
import { assertAdmin } from '@server/helpers/auth/assert-admin'
import { getAdminApiKey } from '@server/helpers/auth/get-admin-api-key'
import { NextRequest } from 'next/server'

jest.mock('@server/helpers/auth/get-admin-api-key')

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
