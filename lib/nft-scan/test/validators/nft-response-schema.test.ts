import { TokenType } from '@echo/model/constants/token-type'
import { attributesMock } from '@echo/nft-scan/mocks/attributes-mock'
import { nftResponseMock } from '@echo/nft-scan/mocks/nft-response-mock'
import type { PartialNft } from '@echo/nft-scan/types/partial-nft'
import { nftResponseSchema } from '@echo/nft-scan/validators/nft-response-schema'
import { Chain } from '@echo/utils/constants/chain'
import { describe, expect, it } from '@jest/globals'
import { pipe, prop, toLower } from 'ramda'

describe('validator - nftResponseSchema', () => {
  const chain = Chain.Blast
  const response = pipe(nftResponseMock, prop('1'))()
  const expectedResult: PartialNft = {
    collection: {
      contract: {
        chain,
        address: toLower('0x71da4d5805c1f2ecce2a41a9f9e026287f2b1f39')
      }
    },
    tokenId: 2944,
    pictureUrl:
      'https://dev.echonft.xyz/api/ipfs/bafybeibfviw32fzcimiobx2shiukbwis5cyufmenvddajvzbr3u4uwco3a%2F2944.png',
    name: 'Blast Penguins #2944',
    attributes: attributesMock()['1'],
    metadataUrl: 'https://dweb.link/ipfs/bafybeier5k54xnsw26fhttl673vc57jmbddvkkjn4skiel26t5yawsi3x4/2944.json',
    type: TokenType.Erc721
  }
  it('maps correctly with ipfs image uri', () => {
    expect(nftResponseSchema(chain).parse(response)).toEqual(expectedResult)
  })

  it('maps correctly with proper image uri', () => {
    const properUriResponse = { ...response, image_uri: 'https://www.bleh.com/1.png' }
    const properUriResult = { ...expectedResult, pictureUrl: 'https://www.bleh.com/1.png' }
    expect(nftResponseSchema(chain).parse(properUriResponse)).toEqual(properUriResult)
  })
  it('maps correctly with ipfs token uri', () => {
    const ipfsUriResponse = {
      ...response,
      token_uri: 'bafybeier5k54xnsw26fhttl673vc57jmbddvkkjn4skiel26t5yawsi3x4/2944.json'
    }
    const ipfsUriResult = {
      ...expectedResult,
      metadataUrl:
        'https://dev.echonft.xyz/api/ipfs/bafybeier5k54xnsw26fhttl673vc57jmbddvkkjn4skiel26t5yawsi3x4%2F2944.json'
    }
    expect(nftResponseSchema(chain).parse(ipfsUriResponse)).toEqual(ipfsUriResult)
  })

  it('maps correctly with no name', () => {
    const noNameResponse = { ...response, name: null }
    const noNameResult = { ...expectedResult, name: '2944' }
    expect(nftResponseSchema(chain).parse(noNameResponse)).toEqual(noNameResult)
  })

  it('maps correctly with no attributes', () => {
    const noAttributesResponse = { ...response, attributes: null }
    const noAttributesResult = { ...expectedResult, attributes: [] }
    expect(nftResponseSchema(chain).parse(noAttributesResponse)).toEqual(noAttributesResult)
  })
})
