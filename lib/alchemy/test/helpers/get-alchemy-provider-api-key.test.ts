import { getAlchemyProviderApiKey } from '@echo/alchemy/helpers/get-alchemy-provider-api-key'
import { describe, expect, jest, test } from '@jest/globals'

describe('helpers - getAlchemyProviderApiKey', () => {
  test('if NEXT_PUBLIC_ALCHEMY_KEY env is not defined, throws', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const replacedEnv = jest.replaceProperty(process, 'env', { ...process.env, NEXT_PUBLIC_ALCHEMY_KEY: undefined })
    expect(() => getAlchemyProviderApiKey()).toThrow(Error('.env should contain NEXT_PUBLIC_ALCHEMY_KEY'))
    replacedEnv.restore()
  })
  test('if NEXT_PUBLIC_ALCHEMY_KEY exists, returns value', () => {
    expect(getAlchemyProviderApiKey()).toBe('test')
  })
})
