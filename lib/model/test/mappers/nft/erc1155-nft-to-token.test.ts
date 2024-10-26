import { erc1155NftToToken } from '@echo/model/mappers/nft/erc1155-nft-to-token'
import { erc1155NftMock } from '@echo/model/mocks/nft-mock'
import { erc1155TokenMock } from '@echo/model/mocks/token-mock'
import { describe, expect, test } from '@jest/globals'

describe('mappers - nft - erc1155NftToToken', () => {
  test('maps correctly', () => {
    expect(erc1155NftToToken(erc1155NftMock)).toStrictEqual(erc1155TokenMock)
  })
})
