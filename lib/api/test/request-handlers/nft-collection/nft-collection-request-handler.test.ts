import { ApiError } from '../../../src/helpers/error/api-error'
import { handleGetNftCollection } from '../../../src/request-handlers/nft-collection/handle-get-nft-collection'
import { handleGetNftCollectionNfts } from '../../../src/request-handlers/nft-collection/handle-get-nft-collection-nfts'
import { nftCollectionRequestHandler } from '../../../src/request-handlers/nft-collection/nft-collection-request-handler'
import { mockRequestResponse } from '../../mocks/request-response'
import { GetNftCollectionNftsResponse, GetNftCollectionResponse, NftCollectionRequest } from '@echo/api-public'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { HTTP_METHODS } from 'next/dist/server/web/http'
import { equals, reject } from 'ramda'

jest.mock('../../../src/request-handlers/nft-collection/handle-get-nft-collection')
jest.mock('../../../src/request-handlers/nft-collection/handle-get-nft-collection-nfts')

describe('request-handlers - nft-collection - nftCollectionRequestHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('throws if the method is not GET', async () => {
    const notAllowedMethods = reject(equals('GET'))(HTTP_METHODS)
    for (const method of notAllowedMethods) {
      const { req, res } = mockRequestResponse<
        never,
        NftCollectionRequest,
        GetNftCollectionResponse | GetNftCollectionNftsResponse
      >(method)
      try {
        await nftCollectionRequestHandler(req, res)
        expect(true).toBeFalsy()
      } catch (e) {
        expect((e as ApiError).status).toBe(405)
      }
    }
  })

  it('calls handleGetNftCollection if the slug has only 1 item', async () => {
    const { req, res } = mockRequestResponse<
      never,
      NftCollectionRequest,
      GetNftCollectionResponse | GetNftCollectionNftsResponse
    >('GET', { slug: ['collection-id'] })
    jest.mocked(handleGetNftCollection).mockResolvedValueOnce()
    jest.mocked(handleGetNftCollectionNfts).mockResolvedValueOnce()
    await nftCollectionRequestHandler(req, res)
    expect(handleGetNftCollection).toHaveBeenCalledTimes(1)
    expect(handleGetNftCollectionNfts).toHaveBeenCalledTimes(0)
  })

  it('calls handleGetNftCollectionNfts if the slug has only 2 items and the last one is "nfts"', async () => {
    const { req, res } = mockRequestResponse<
      never,
      NftCollectionRequest,
      GetNftCollectionResponse | GetNftCollectionNftsResponse
    >('GET', { slug: ['collection-id', 'nfts'] })
    jest.mocked(handleGetNftCollection).mockResolvedValueOnce()
    jest.mocked(handleGetNftCollectionNfts).mockResolvedValueOnce()
    await nftCollectionRequestHandler(req, res)
    expect(handleGetNftCollection).toHaveBeenCalledTimes(0)
    expect(handleGetNftCollectionNfts).toHaveBeenCalledTimes(1)
  })
})
