import { mapNft } from '../../src/mappers/map-nft'
import { getNftsResponse } from '../mocks/get-nfts-response'
import { nftFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

describe('mappers - mapNft', () => {
  it('returns mapped nft collection', () => {
    const expected = nftFirestoreData['8hHFadIrrooORfTOLkBg']!
    const result = mapNft(getNftsResponse['0x320e2fa93A4010ba47edcdE762802374bac8d3F7:1376']!)
    expect(omit(['balance', 'description', 'contractAddress'], result)).toEqual(
      omit(['collection', 'owner', 'contract', 'refPath', 'id', 'balance', 'description'], expected)
    )
    expect(result.contractAddress.toLowerCase()).toEqual(expected.collection.contract.address)
  })
})
