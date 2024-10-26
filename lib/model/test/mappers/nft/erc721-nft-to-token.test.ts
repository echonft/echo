import { erc721NftToToken } from '@echo/model/mappers/nft/erc721-nft-to-token'
import { erc721NftMock } from '@echo/model/mocks/nft-mock'
import { erc721TokenMock } from '@echo/model/mocks/token-mock'
import { describe, expect, test } from '@jest/globals'

describe('mappers - nft - erc721NftToToken', () => {
  test('maps correctly', () => {
    expect(erc721NftToToken(erc721NftMock)).toStrictEqual(erc721TokenMock)
  })
})
