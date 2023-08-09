import { mockGetContractMetadata } from '../../src/mocks/alchemy/get-contract-metadata'
import { mockGetContractMetadataResponse } from '../../src/mocks/alchemy/get-contract-metadata-response'
import { mockFindContractByAddress } from '../../src/mocks/firebase-admin/find-contract-by-address'
import { fetchContractMetadataFromRequest } from '../../src/utils/handler/fetch-contract-metadata-from-request'
import { findContractByAddress } from '@echo/firebase-admin'
import { errorMessage } from '@echo/utils'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/firebase-admin')
jest.mock('@echo/alchemy', () => ({
  getContractMetadata: async (address: string) => Promise.resolve(mockGetContractMetadata(address))
}))

describe('utils - handlers - fetchContractMetadataFromRequest', () => {
  jest.mocked(findContractByAddress).mockImplementation(mockFindContractByAddress)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if contract exists rejects', () => {
    fetchContractMetadataFromRequest({ address: '37dBlwJYahEAKeL0rNP8', chainId: 1 })
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(errorMessage(e)).toBe('Contract already exist')
      })
  })
  it('if contract does not exist and getContractMetadata is error, rejects', () => {
    fetchContractMetadataFromRequest({ address: 'test', chainId: 1 })
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(errorMessage(e)).toBe('Error fetching contract metadata')
      })
  })
  it('if contract does not exist and getContractMetadata throws, rejects', () => {
    fetchContractMetadataFromRequest({ address: 'throw', chainId: 1 })
      .then(() => {
        expect(true).toBeFalsy()
      })
      .catch((e) => {
        expect(errorMessage(e)).toBe('Error fetching contract metadata')
      })
  })
  it('if contract does not exist and getContractMetadata returns, returns result', () => {
    const expected = mockGetContractMetadataResponse['0xe785E82358879F061BC3dcAC6f0444462D4b5330']
    fetchContractMetadataFromRequest({ address: '0xe785E82358879F061BC3dcAC6f0444462D4b5330', chainId: 1 })
      .then((result) => {
        expect(result).toBe(expected)
      })
      .catch(() => {
        expect(true).toBeFalsy()
      })
  })
})
