import { target } from '../../src/types/validators/target'
import { describe, expect, it } from '@jest/globals'

describe('validators - target', () => {
  it('wrong address fails validation', () => {
    expect(() => target.parse({ address: undefined, chainId: 1 })).toThrow()
    expect(() => target.parse({ address: '', chainId: 1 })).toThrow()
    expect(() => target.parse({ address: '0xtest', chainId: 1 })).toThrow()
    expect(() => target.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F8', chainId: 1 })).toThrow()
  })
  it('wrong chain Id fails validation', () => {
    expect(() => target.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: -100 })).toThrow()
    expect(() => target.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 0 })).toThrow()
    expect(() => target.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: undefined })).toThrow()
  })
  it('valid target pass', () => {
    expect(target.parse({ address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84', chainId: 1 })).toStrictEqual({
      address: '0xaF1c962f799954E2a43fFdEA5Acaa942d53E1F84',
      chainId: 1
    })
  })
})
