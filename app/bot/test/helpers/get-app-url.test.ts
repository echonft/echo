import { getAppUrl } from '@echo/bot/helpers/get-app-url'
import { describe, expect, jest, test } from '@jest/globals'

describe('helpers - getAppUrl', () => {
  test('if APP_URL env is not defined, throw', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const replacedEnv = jest.replaceProperty(process, 'env', { ...process.env, APP_URL: undefined })
    expect(() => getAppUrl()).toThrow(Error('.env should contain APP_URL'))
    replacedEnv.restore()
  })
  test('if APP_URL exists, returns value', () => {
    expect(getAppUrl()).toBe('https://echonft.xyz')
  })
})
