import { offerItem } from '../offer-item'
import { describe, expect, it } from '@jest/globals'

describe('validators - offerItem', () => {
  it('wrong address fails validation', () => {
    expect(() => offerItem.parse({ target: { address: undefined, chainId: 1 }, tokenId: BigInt(0) })).toThrow()
    expect(() => offerItem.parse({ target: { address: '', chainId: 1 }, tokenId: BigInt(0) })).toThrow()
    expect(() => offerItem.parse({ target: { address: '0xtest', chainId: 1 }, tokenId: BigInt(0) })).toThrow()
    expect(() =>
      offerItem.parse({
        target: { address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F8', chainId: 1 },
        tokenId: BigInt(0)
      })
    ).toThrow()
  })
  it('wrong chain Id fails validation', () => {
    expect(() =>
      offerItem.parse({
        target: { address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: -100 },
        tokenId: BigInt(0)
      })
    ).toThrow()
    expect(() =>
      offerItem.parse({
        target: { address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 0 },
        tokenId: BigInt(0)
      })
    ).toThrow()
    expect(() =>
      offerItem.parse({
        target: { address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: undefined },
        tokenId: BigInt(0)
      })
    ).toThrow()
  })
  it('wrong token Id fails validation', () => {
    expect(() =>
      offerItem.parse({
        target: { address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 1 },
        tokenId: 0
      })
    ).toThrow()
    expect(() =>
      offerItem.parse({
        target: { address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 1 },
        tokenId: undefined
      })
    ).toThrow()
    expect(() =>
      offerItem.parse({
        target: { address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 1 },
        tokenId: -100
      })
    ).toThrow()
  })
  it('valid offerItem pass', () => {
    expect(
      offerItem.parse({
        target: { address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 1 },
        tokenId: BigInt(0)
      })
    ).toStrictEqual({
      target: { address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 1 },
      tokenId: BigInt(0)
    })
  })
})
