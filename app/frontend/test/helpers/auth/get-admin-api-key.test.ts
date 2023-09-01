/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getAdminApiKey } from '../../../src/lib/server/helpers/auth/get-admin-api-key'

describe('utils - auth - getAdminApiKey', () => {
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env }
  })

  afterEach(() => {
    process.env = env
  })
  it('if ADMIN_API_KEY is not set, expect call to throw', () => {
    // @ts-ignore
    process.env.ADMIN_API_KEY = undefined
    expect(() => getAdminApiKey()).toThrowError(new Error('.env should contain ADMIN_API_KEY'))
  })
  it('if ADMIN_API_KEY is set, returns proper value', () => {
    // @ts-ignore
    process.env.ADMIN_API_KEY = 'test'
    expect(getAdminApiKey()).toEqual('test')
  })
})
