import { mapContractToTargetRequest } from '../map-contract-to-target-request'
import { mockOffer } from '@echo/model'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapContractToTargetRequest', () => {
  const mockContract = mockOffer.senderItems[0]!.contract
  it('proper contract returns TargetRequest', () => {
    const result = mapContractToTargetRequest(mockContract)
    expect(result.address).toEqual(mockContract.address)
    expect(result.chainId).toEqual(mockContract.chainId)
  })
})
