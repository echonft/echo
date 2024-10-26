import { erc721TokenToNft } from '@echo/model/mappers/token/erc721-token-to-nft'
import { erc721NftMock } from '@echo/model/mocks/nft-mock'
import { erc721TokenMock } from '@echo/model/mocks/token-mock'
import { describe, expect, test } from '@jest/globals'
import { omit } from 'ramda'

describe('mappers - token - erc721TokenToNft', () => {
  test('maps correctly', () => {
    expect(erc721TokenToNft(erc721NftMock.owner)(erc721TokenMock)).toStrictEqual(omit(['attributes'], erc721NftMock))
  })
})
