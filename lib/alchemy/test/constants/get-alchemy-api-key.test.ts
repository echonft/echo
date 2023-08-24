/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getAlchemyApiKey } from '../../src/constants/get-alchemy-api-key'
import { describe, expect, it } from '@jest/globals'

describe('constants - getAlchemyApiKey', () => {
  it('if ALCHEMY_API_KEY is set, returns proper value', () => {
    expect(getAlchemyApiKey()).toEqual('test')
  })
})
