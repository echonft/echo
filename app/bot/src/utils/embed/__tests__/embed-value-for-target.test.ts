import { embedValueForTarget } from '../embed-value-for-target'
import { Contract } from '@echo/model'
import { describe, expect, it } from '@jest/globals'

describe('utils - embed - embedValueForTarget', () => {
  it('should return expected result with name', () => {
    const target = {
      address: '0x123',
      name: 'Test Token',
      symbol: 'TEST'
    } as unknown as Contract
    const expectedResult = 'Any NFT from Test Token'
    const result = embedValueForTarget(target)
    expect(result).toEqual(expectedResult)
  })

  it('should return expected result with symbol', () => {
    const target = {
      address: '0x123',
      symbol: 'TEST'
    } as unknown as Contract
    const expectedResult = 'Any NFT from TEST'
    const result = embedValueForTarget(target)
    expect(result).toEqual(expectedResult)
  })

  it('should return expected result with address when no symbol or name', () => {
    const target = {
      address: '0x123'
    } as unknown as Contract
    const expectedResult = 'Any NFT from contract 0x123'
    const result = embedValueForTarget(target)
    expect(result).toEqual(expectedResult)
  })

  it('should return expected result with address when no symbol and empty name', () => {
    const target = {
      address: '0x123',
      name: ''
    } as unknown as Contract
    const expectedResult = 'Any NFT from contract 0x123'
    const result = embedValueForTarget(target)
    expect(result).toEqual(expectedResult)
  })

  it('should return expected result with address when no name and empty symbol', () => {
    const target = {
      address: '0x123',
      symbol: ''
    } as unknown as Contract
    const expectedResult = 'Any NFT from contract 0x123'
    const result = embedValueForTarget(target)
    expect(result).toEqual(expectedResult)
  })
})
