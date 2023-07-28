import { getFirestoreContractRefByAddress } from '../../src/data/contract/get-firestore-contract-ref-by-address'
import { contractFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { R } from '@mobily/ts-belt'

describe('data - contract - getFirestoreContractRefByAddress', () => {
  it('returns proper contract data on existing object', async () => {
    const contractResult = await getFirestoreContractRefByAddress('0x12c63bbD266dB84e117356e664f3604055166CEc', 1)
    expect(R.isOk(contractResult)).toBeTruthy()
    expect(R.getExn(contractResult).path).toStrictEqual(contractFirestoreData['37dBlwJYahEAKeL0rNP8']!.refPath)
  })
  it('returns empty if invalid address', async () => {
    let contractResult = await getFirestoreContractRefByAddress('', 1)
    expect(R.isError(contractResult)).toBeTruthy()
    contractResult = await getFirestoreContractRefByAddress('test', 1)
    expect(R.isError(contractResult)).toBeTruthy()
  })
  it('returns empty if invalid chain id', async () => {
    let contractResult = await getFirestoreContractRefByAddress('0x12c63bbD266dB84e117356e664f3604055166CEc', 0)
    expect(R.isError(contractResult)).toBeTruthy()
    contractResult = await getFirestoreContractRefByAddress('0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', -1)
    expect(R.isError(contractResult)).toBeTruthy()
  })
})
