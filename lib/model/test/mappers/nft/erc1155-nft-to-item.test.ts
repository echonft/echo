import { erc1155NftToItem } from '@echo/model/mappers/nft/erc1155-nft-to-item'
import { erc1155ItemMock } from '@echo/model/mocks/item-mock'
import { erc1155NftMock } from '@echo/model/mocks/nft-mock'
import { describe, expect, test } from '@jest/globals'

describe('mappers - nft - erc1155NftToItem', () => {
  test('maps correctly', () => {
    expect(erc1155NftToItem(erc1155ItemMock.quantity)(erc1155NftMock)).toStrictEqual(erc1155ItemMock)
  })
})
