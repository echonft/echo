import { getAlchemyApiKey } from '@echo-alchemy/helpers/get-alchemy-api-key'
import { describe, expect, jest, test } from '@jest/globals'

describe('helpers - getAlchemyApiKey', () => {
  test('if ALCHEMY_API_KEY env is not defined, throws', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const replacedEnv = jest.replaceProperty(process, 'env', { ...process.env, ALCHEMY_API_KEY: undefined })
    expect(() => getAlchemyApiKey()).toThrow(Error('.env should contain ALCHEMY_API_KEY'))
    replacedEnv.restore()
  })
  test('if ALCHEMY_API_KEY exists, returns value', () => {
    expect(getAlchemyApiKey()).toBe('test')
  })
})
