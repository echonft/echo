import { erc1155TokenToNft } from '@echo/model/mappers/token/erc1155-token-to-nft'
import { erc1155NftMock } from '@echo/model/mocks/nft-mock'
import { erc1155TokenMock } from '@echo/model/mocks/token-mock'
import { describe, expect, test } from '@jest/globals'
import { omit } from 'ramda'

describe('mappers - token - erc1155TokenToNft', () => {
  test('maps correctly', () => {
    expect(erc1155TokenToNft(erc1155NftMock.owner!)(erc1155TokenMock)).toStrictEqual(
      omit(['attributes'], erc1155NftMock)
    )
  })
})
