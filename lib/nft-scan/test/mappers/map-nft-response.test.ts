import type { Nft } from '@echo/model/types/nft'
import { mapNftResponse } from '@echo/nft-scan/mappers/map-nft-response'
import { attributesMock } from '@echo/nft-scan-mocks/attributes-mock'
import { nftResponseMock } from '@echo/nft-scan-mocks/nft-response-mock'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapNftResponse', () => {
  const response = nftResponseMock['1']!
  const expectedResult: Omit<Nft, 'collection' | 'owner' | 'updatedAt'> = {
    tokenId: 2944,
    pictureUrl: 'ipfs://bafybeibfviw32fzcimiobx2shiukbwis5cyufmenvddajvzbr3u4uwco3a/2944.png',
    name: 'Blast Penguins #2944',
    attributes: attributesMock['1'],
    animationUrl: undefined,
    metadataUrl: 'https://dweb.link/ipfs/bafybeier5k54xnsw26fhttl673vc57jmbddvkkjn4skiel26t5yawsi3x4/2944.json'
  }
  it('maps correctly with ipfs image uri', () => {
    expect(mapNftResponse(response)).toEqual(expectedResult)
  })

  it('maps correctly with proper image uri', () => {
    const properUriResponse = { ...response, image_uri: 'https://www.bleh.com/1.png' }
    const properUriResult = { ...expectedResult, pictureUrl: 'https://www.bleh.com/1.png' }
    expect(mapNftResponse(properUriResponse)).toEqual(properUriResult)
  })
  it('maps correctly with ipfs token uri', () => {
    const ipfsUriResponse = {
      ...response,
      token_uri: 'bafybeier5k54xnsw26fhttl673vc57jmbddvkkjn4skiel26t5yawsi3x4/2944.json'
    }
    const ipfsUriResult = {
      ...expectedResult,
      metadataUrl: 'ipfs://bafybeier5k54xnsw26fhttl673vc57jmbddvkkjn4skiel26t5yawsi3x4/2944.json'
    }
    expect(mapNftResponse(ipfsUriResponse)).toEqual(ipfsUriResult)
  })

  it('maps correctly with no name', () => {
    const noNameResponse = { ...response, name: null }
    const noNameResult = { ...expectedResult, name: '2944' }
    expect(mapNftResponse(noNameResponse)).toEqual(noNameResult)
  })

  it('maps correctly with no attributes', () => {
    const noAttributesResponse = { ...response, attributes: null }
    const noAttributesResult = { ...expectedResult, attributes: [] }
    expect(mapNftResponse(noAttributesResponse)).toEqual(noAttributesResult)
  })
})
