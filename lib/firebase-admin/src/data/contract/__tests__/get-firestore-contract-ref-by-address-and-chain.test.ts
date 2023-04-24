import { contractData } from '../../../utils/test/mocks/contract/contract-data'
import { getFirestoreContractRefByAddressAndChainId } from '../get-firestore-contract-ref-by-address-and-chain-id'
import { describe, expect, it } from '@jest/globals'
import { R } from '@mobily/ts-belt'

describe('data - contract - getFirestoreContractRefByAddressAndChain', () => {
  it('returns proper contract data on existing object', async () => {
    const contractResult = await getFirestoreContractRefByAddressAndChainId(
      '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
      1
    )
    expect(R.isOk(contractResult)).toBeTruthy()
    expect(R.getExn(contractResult).path).toStrictEqual(contractData['37dBlwJYahEAKeL0rNP8']!.refPath)
  })
  it('returns empty if invalid address', async () => {
    let contractResult = await getFirestoreContractRefByAddressAndChainId('', 1)
    expect(R.isError(contractResult)).toBeTruthy()
    contractResult = await getFirestoreContractRefByAddressAndChainId('test', 1)
    expect(R.isError(contractResult)).toBeTruthy()
  })
  it('returns empty if invalid chain id', async () => {
    let contractResult = await getFirestoreContractRefByAddressAndChainId(
      '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
      0
    )
    expect(R.isError(contractResult)).toBeTruthy()
    contractResult = await getFirestoreContractRefByAddressAndChainId('0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', -1)
    expect(R.isError(contractResult)).toBeTruthy()
  })
})
