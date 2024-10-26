import { erc721NftToItem } from '@echo/model/mappers/nft/erc721-nft-to-item'
import { erc721ItemMock } from '@echo/model/mocks/item-mock'
import { erc721NftMock } from '@echo/model/mocks/nft-mock'
import { describe, expect, test } from '@jest/globals'

describe('mappers - nft - erc721NftToItem', () => {
  test('maps correctly', () => {
    expect(erc721NftToItem(erc721NftMock)).toStrictEqual(erc721ItemMock)
  })
})
