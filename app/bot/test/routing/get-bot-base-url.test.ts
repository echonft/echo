import { getBotBaseUrl } from '@echo/bot/routing/get-bot-base-url'
import { describe, expect, jest, test } from '@jest/globals'

describe('utils - getBotBaseUrl', () => {
  test('if BASE_URL env is not defined, throw', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const replacedEnv = jest.replaceProperty(process, 'env', { ...process.env, BASE_URL: undefined })
    expect(() => getBotBaseUrl()).toThrow(Error('.env should contain BASE_URL'))
    replacedEnv.restore()
  })
  test('if BASE_URL exists, returns value', () => {
    expect(getBotBaseUrl()).toBe('https://echonft.xyz')
  })
})
