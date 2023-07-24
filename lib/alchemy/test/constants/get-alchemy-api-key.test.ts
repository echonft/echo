/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getAlchemyApiKey } from '../../src/constants/get-alchemy-api-key'
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals'

describe('constants - getAlchemyApiKey', () => {
  const env = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
    process.env = { ...env }
  })

  afterEach(() => {
    process.env = env
  })
  it('if ALCHEMY_API_KEY is not set, expect call to throw', () => {
    // @ts-ignore
    process.env.ALCHEMY_API_KEY = undefined
    expect(() => getAlchemyApiKey()).toThrowError(new Error('.env should contain ALCHEMY_API_KEY'))
  })
  it('if ALCHEMY_API_KEY is set, returns proper value', () => {
    // @ts-ignore
    process.env.ALCHEMY_API_KEY = 'test'
    expect(getAlchemyApiKey()).toEqual('test')
  })
})
