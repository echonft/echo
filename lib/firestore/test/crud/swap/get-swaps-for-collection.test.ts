import { addSwapArrayIndexers } from '@echo/firestore/array-indexers/swap/add-swap-array-indexers'
import { getSwapsForCollection } from '@echo/firestore/crud/swap/get-swaps-for-collection'
import type { SwapDocument } from '@echo/firestore/types/model/swap-document'
import { TokenType } from '@echo/model/constants/token-type'
import { collectionMockPx, collectionMockSpiral } from '@echo/model/mocks/collection-mock'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import { addSwap } from '@echo/test/firestore/crud/swap/add-swap'
import { deleteSwap } from '@echo/test/firestore/crud/swap/delete-swap'
import { nowMsSlug } from '@echo/utils/helpers/now-ms-slug'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc } from 'ramda'

describe('CRUD - offer - getSwapsForCollection', () => {
  let swapIds: string[]

  beforeEach(() => {
    swapIds = []
  })
  afterEach(async () => {
    for (const swapId of swapIds) {
      await deleteSwap(swapId)
    }
  })

  it('return an empty array if the collection does not exist', async () => {
    await expect(getSwapsForCollection('not-found')).resolves.toEqual([])
  })

  it('returns the swaps for which the collection is included in the receiver or sender items', async () => {
    const spiralData: SwapDocument = addSwapArrayIndexers({
      slug: '',
      receiver: userMockJohnny,
      receiverItems: [
        {
          token: {
            contract: collectionMockSpiral.contract,
            collection: {
              name: 'Spiral Frequencies',
              slug: collectionMockSpiral.slug,
              totalSupply: 6315
            },
            name: 'Spiral Frequencies #1',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
            tokenId: 1,
            type: TokenType.Erc721
          }
        }
      ],
      sender: userMockCrew,
      senderItems: [
        {
          token: {
            contract: collectionMockSpiral.contract,
            collection: {
              name: 'pxMythics Genesis',
              slug: collectionMockSpiral.slug,
              totalSupply: 1077
            },
            name: 'Creative Demigod #3',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/d4ccdfe6a54889abc408c34335b6fb55',
            tokenId: 3,
            type: TokenType.Erc721
          }
        }
      ],
      transactionId: '0xb384a4949fe643aa638827e381e62513e412af409b0744a37065dd59b0a5309b',
      offerId: 'offer-id'
    })
    const pxData: SwapDocument = addSwapArrayIndexers({
      slug: '',
      receiver: userMockJohnny,
      receiverItems: [
        {
          token: {
            contract: collectionMockPx.contract,
            collection: {
              name: 'Spiral Frequencies',
              slug: collectionMockPx.slug,
              totalSupply: 6315
            },
            name: 'Spiral Frequencies #1',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
            tokenId: 1,
            type: TokenType.Erc721
          }
        }
      ],
      sender: userMockCrew,
      senderItems: [
        {
          token: {
            contract: collectionMockPx.contract,
            collection: {
              name: 'pxMythics Genesis',
              slug: collectionMockPx.slug,
              totalSupply: 1077
            },
            name: 'Creative Demigod #3',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/d4ccdfe6a54889abc408c34335b6fb55',
            tokenId: 3,
            type: TokenType.Erc721
          }
        }
      ],
      transactionId: '0xb384a4949fe643aa638827e381e62513e412af409b0744a37065dd59b0a5309b',
      offerId: 'offer-id'
    })
    const bothData: SwapDocument = addSwapArrayIndexers({
      slug: '',
      receiver: userMockJohnny,
      receiverItems: [
        {
          token: {
            contract: collectionMockPx.contract,
            collection: {
              name: 'Spiral Frequencies',
              slug: collectionMockPx.slug,
              totalSupply: 6315
            },
            name: 'Spiral Frequencies #1',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
            tokenId: 1,
            type: TokenType.Erc721
          }
        }
      ],
      sender: userMockCrew,
      senderItems: [
        {
          token: {
            contract: collectionMockSpiral.contract,
            collection: {
              name: 'pxMythics Genesis',
              slug: collectionMockSpiral.slug,
              totalSupply: 1077
            },
            name: 'Creative Demigod #3',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/d4ccdfe6a54889abc408c34335b6fb55',
            tokenId: 3,
            type: TokenType.Erc721
          }
        }
      ],
      transactionId: '0xb384a4949fe643aa638827e381e62513e412af409b0744a37065dd59b0a5309b',
      offerId: 'offer-id'
    })

    const bothSwap = assoc('slug', nowMsSlug(), bothData)
    const bothId = await addSwap(bothSwap)
    swapIds = [bothId]
    let documents = await getSwapsForCollection(collectionMockPx.slug)
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(bothSwap)
    documents = await getSwapsForCollection(collectionMockSpiral.slug)
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(bothSwap)
    const spiralSwap = assoc('slug', nowMsSlug(), spiralData)
    const spiralId = await addSwap(spiralSwap)
    swapIds.push(spiralId)
    documents = await getSwapsForCollection(collectionMockPx.slug)
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(bothSwap)
    documents = await getSwapsForCollection(collectionMockSpiral.slug)
    expect(documents.length).toBe(2)
    expect(documents[0]).toStrictEqual(spiralSwap)
    expect(documents[1]).toStrictEqual(bothSwap)
    const pxSwap = assoc('slug', nowMsSlug(), pxData)
    const pxDataId = await addSwap(pxSwap)
    swapIds.push(pxDataId)
    documents = await getSwapsForCollection(collectionMockPx.slug)
    expect(documents.length).toBe(2)
    expect(documents[0]).toStrictEqual(pxSwap)
    expect(documents[1]).toStrictEqual(bothSwap)
    documents = await getSwapsForCollection(collectionMockSpiral.slug)
    expect(documents.length).toBe(2)
    expect(documents[0]).toStrictEqual(spiralSwap)
    expect(documents[1]).toStrictEqual(bothSwap)
    expect(swapIds.length).toBe(3)
  })
})
