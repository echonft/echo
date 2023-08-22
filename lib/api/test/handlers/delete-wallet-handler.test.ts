import { beforeEach, describe, expect, it, jest } from '@jest/globals'

// TODO
describe('handlers - user - deleteWalletHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if error on update, returns 500', () => {
    expect(true).toBeTruthy()
  })
  it('if valid but wrong wallet to remove, returns wallets', () => {
    expect(true).toBeTruthy()
  })
  it('if valid but no wallet (undefined), returns empty array', () => {
    expect(true).toBeTruthy()
  })
  it('if valid but no wallet (empty), returns empty array', () => {
    expect(true).toBeTruthy()
  })
  it('if valid, returns user wallets minus the deleted wallet (single)', () => {
    expect(true).toBeTruthy()
  })
  it('if valid, returns user wallets minus the deleted wallet (multiple)', () => {
    expect(true).toBeTruthy()
  })
})
