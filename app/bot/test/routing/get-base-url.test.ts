/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getBaseUrl } from '../../src/routing/get-base-url'
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

describe('utils - getBaseUrl', () => {
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env }
  })

  afterEach(() => {
    process.env = env
  })
  it('if BASE_URL is not set, expect call to throw', () => {
    // @ts-ignore
    process.env.BASE_URL = undefined
    expect(() => getBaseUrl()).toThrowError(new Error('.env should contain BASE_URL'))
  })
  it('if BASE_URL is set, returns proper value', () => {
    // @ts-ignore
    process.env.BASE_URL = 'test'
    expect(getBaseUrl()).toEqual('test')
  })
})
