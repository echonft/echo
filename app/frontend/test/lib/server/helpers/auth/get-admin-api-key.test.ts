import { getAdminApiKey } from '@server/helpers/auth/get-admin-api-key'

describe('utils - auth - getAdminApiKey', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  let replacedEnv: jest.Replaced<typeof process.env> | undefined = undefined

  beforeEach(() => {
    replacedEnv = jest.replaceProperty(process, 'env', { ...process.env, ADMIN_API_KEY: 'test' })
  })

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    replacedEnv?.restore()
  })

  it('if ADMIN_API_KEY is not set, expect call to throw', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.replaceProperty(process, 'env', { ...process.env, ADMIN_API_KEY: undefined })
    expect(() => getAdminApiKey()).toThrowError(new Error('.env should contain ADMIN_API_KEY'))
  })
  it('if ADMIN_API_KEY is set, returns proper value', () => {
    expect(getAdminApiKey()).toEqual('test')
  })
})
