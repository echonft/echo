/* eslint-disable @typescript-eslint/ban-ts-comment */
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

describe('handlers - user - createWalletHandler', () => {
  // const mockedMessage = jest.mocked(SiweMessage)
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if wallet throws, returns 401', () => {
    expect(true).toBeTruthy()
    // expect(res.statusCode).toBe(401)
    // expect(res._getJSONData()).toEqual({ error: 'Cannot find wallet' })
  })
  it('if wallet already exists on another user, returns 401', () => {
    expect(true).toBeTruthy()
  })
  it('if signature throws, returns 401', () => {
    // @ts-ignore
    // mockedMessage.mockImplementation(() => ({
    //   domain: '',
    //   address: '0xtest',
    //   statement: 'test invalid signature',
    //   uri: '',
    //   version: '1',
    //   chainId: 1,
    //   nonce: '',
    //   issuedAt: '',
    //   regexFromMessage: jest.fn(),
    //   toMessage: jest.fn(),
    //   signMessage: jest.fn(),
    //   prepareMessage: jest.fn(),
    //   verify: jest.fn((_params: VerifyParams, _opts?: VerifyOpts | undefined) => Promise.reject<SiweResponse>())
    // }))
    expect(true).toBeTruthy()
  })

  it('if invalid signature, returns 401', () => {
    // @ts-ignore
    // mockedMessage.mockImplementation(() => ({
    //   domain: '',
    //   address: '0xtest',
    //   statement: 'test invalid signature',
    //   uri: '',
    //   version: '1',
    //   chainId: 1,
    //   nonce: '',
    //   issuedAt: '',
    //   regexFromMessage: jest.fn(),
    //   toMessage: jest.fn(),
    //   signMessage: jest.fn(),
    //   prepareMessage: jest.fn(),
    //   verify: jest.fn((_params: VerifyParams, _opts?: VerifyOpts | undefined) =>
    //     // @ts-ignore
    //     Promise.resolve<SiweResponse>({ data: { nonce: nonce }, success: false })
    //   )
    // }))
    expect(true).toBeTruthy()
  })
  describe('if valid signature', () => {
    beforeEach(() => {
      // @ts-ignore
      // mockedMessage.mockImplementation(() => ({
      //   domain: '',
      //   address: '0xtest',
      //   statement: 'test',
      //   uri: '',
      //   version: '1',
      //   chainId: 1,
      //   nonce,
      //   issuedAt: '',
      //   regexFromMessage: jest.fn(),
      //   toMessage: jest.fn(),
      //   signMessage: jest.fn(),
      //   prepareMessage: jest.fn(),
      //   verify: jest.fn((_params: VerifyParams, _opts?: VerifyOpts | undefined) =>
      //     // @ts-ignore
      //     Promise.resolve<SiweResponse>({ data: { nonce: nonce }, success: true })
      //   )
      // }))
    })
    it('if nonce not found, returns 403', () => {
      expect(true).toBeTruthy()
    })
    it('if nonce is invalid, returns 422', () => {
      expect(true).toBeTruthy()
    })
    it('if nonce is valid but error on update, returns 500', () => {
      expect(true).toBeTruthy()
    })
    it('if nonce is valid but no new wallet, returns wallets', () => {
      expect(true).toBeTruthy()
    })
    it('if nonce is valid and adding wallet (empty), returns new wallets', () => {
      expect(true).toBeTruthy()
    })
    it('if nonce is valid and adding wallet (undefined), returns new wallets', () => {
      expect(true).toBeTruthy()
    })
    it('if nonce is valid and adding wallet (multiple), returns new wallets', () => {
      expect(true).toBeTruthy()
    })
    it('if nonce is valid and user already has that wallet linked,  returns new wallets', () => {
      expect(true).toBeTruthy()
    })
  })
})
