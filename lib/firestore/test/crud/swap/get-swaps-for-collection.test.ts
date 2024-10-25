import { getSwapsForCollection } from '@echo/firestore/crud/swap/get-swaps-for-collection'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import { TokenType } from '@echo/model/constants/token-type'
import {
  collectionMockPxContract,
  collectionMockPxSlug,
  collectionMockSpiralContract,
  collectionMockSpiralSlug
} from '@echo/model/mocks/collection-mock'
import { getUserMockByUsername, userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user-mock'
import type { Swap } from '@echo/model/types/swap'
import { addSwap } from '@echo/test/firestore/crud/swap/add-swap'
import { deleteSwap } from '@echo/test/firestore/crud/swap/delete-swap'
import { nowMsSlug } from '@echo/utils/helpers/now-ms-slug'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, dissoc } from 'ramda'

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

  it('returns the completed offers for which the collection is included in the receiver or sender items', async () => {
    const spiralData: Omit<Swap, 'slug'> & Pick<SwapDocumentData, 'offerId'> = {
      receiver: getUserMockByUsername(userMockJohnnyUsername()),
      receiverItems: [
        {
          token: {
            contract: collectionMockSpiralContract(),
            collection: {
              name: 'Spiral Frequencies',
              slug: collectionMockSpiralSlug(),
              totalSupply: 6315
            },
            name: 'Spiral Frequencies #1',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
            tokenId: 1,
            type: TokenType.Erc721
          }
        }
      ],
      sender: getUserMockByUsername(userMockCrewUsername()),
      senderItems: [
        {
          token: {
            contract: collectionMockSpiralContract(),
            collection: {
              name: 'pxMythics Genesis',
              slug: collectionMockSpiralSlug(),
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
    }
    const pxData: Omit<Swap, 'slug'> & Pick<SwapDocumentData, 'offerId'> = {
      receiver: getUserMockByUsername(userMockJohnnyUsername()),
      receiverItems: [
        {
          token: {
            contract: collectionMockPxContract(),
            collection: {
              name: 'Spiral Frequencies',
              slug: collectionMockPxSlug(),
              totalSupply: 6315
            },
            name: 'Spiral Frequencies #1',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
            tokenId: 1,
            type: TokenType.Erc721
          }
        }
      ],
      sender: getUserMockByUsername(userMockCrewUsername()),
      senderItems: [
        {
          token: {
            contract: collectionMockPxContract(),
            collection: {
              name: 'pxMythics Genesis',
              slug: collectionMockPxSlug(),
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
    }
    const bothData: Omit<Swap, 'slug'> & Pick<SwapDocumentData, 'offerId'> = {
      receiver: getUserMockByUsername(userMockJohnnyUsername()),
      receiverItems: [
        {
          token: {
            contract: collectionMockPxContract(),
            collection: {
              name: 'Spiral Frequencies',
              slug: collectionMockPxSlug(),
              totalSupply: 6315
            },
            name: 'Spiral Frequencies #1',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
            tokenId: 1,
            type: TokenType.Erc721
          }
        }
      ],
      sender: getUserMockByUsername(userMockCrewUsername()),
      senderItems: [
        {
          token: {
            contract: collectionMockSpiralContract(),
            collection: {
              name: 'pxMythics Genesis',
              slug: collectionMockSpiralSlug(),
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
    }

    const bothSwap = assoc('slug', nowMsSlug(), bothData)
    const bothId = await addSwap(bothSwap)
    swapIds = [bothId]
    let documents = await getSwapsForCollection(collectionMockPxSlug())
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(dissoc('offerId', bothSwap))
    documents = await getSwapsForCollection(collectionMockSpiralSlug())
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(dissoc('offerId', bothSwap))
    const spiralSwap = assoc('slug', nowMsSlug(), spiralData)
    const spiralId = await addSwap(spiralSwap)
    swapIds.push(spiralId)
    documents = await getSwapsForCollection(collectionMockPxSlug())
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(dissoc('offerId', bothSwap))
    documents = await getSwapsForCollection(collectionMockSpiralSlug())
    expect(documents.length).toBe(2)
    expect(documents[0]).toStrictEqual(dissoc('offerId', spiralSwap))
    expect(documents[1]).toStrictEqual(dissoc('offerId', bothSwap))
    const pxSwap = assoc('slug', nowMsSlug(), pxData)
    const pxDataId = await addSwap(pxSwap)
    swapIds.push(pxDataId)
    documents = await getSwapsForCollection(collectionMockPxSlug())
    expect(documents.length).toBe(2)
    expect(documents[0]).toStrictEqual(dissoc('offerId', pxSwap))
    expect(documents[1]).toStrictEqual(dissoc('offerId', bothSwap))
    documents = await getSwapsForCollection(collectionMockSpiralSlug())
    expect(documents.length).toBe(2)
    expect(documents[0]).toStrictEqual(dissoc('offerId', spiralSwap))
    expect(documents[1]).toStrictEqual(dissoc('offerId', bothSwap))
    expect(swapIds.length).toBe(3)
  })
})
