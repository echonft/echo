import { getAlchemyPublicApiKey } from '@echo/alchemy/helpers/get-alchemy-public-api-key'
import { describe, expect, jest, test } from '@jest/globals'

describe('helpers - getAlchemyPublicApiKey', () => {
  test('if NEXT_PUBLIC_ALCHEMY_KEY env is not defined, throws', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const replacedEnv = jest.replaceProperty(process, 'env', { ...process.env, NEXT_PUBLIC_ALCHEMY_KEY: undefined })
    expect(() => getAlchemyPublicApiKey()).toThrow()
    replacedEnv.restore()
  })
  test('if NEXT_PUBLIC_ALCHEMY_KEY exists, returns value', () => {
    expect(getAlchemyPublicApiKey()).toBe('test')
  })
})
