import { getSwapsForUser } from '@echo/firestore/crud/swap/get-swaps-for-user'
import type { SwapDocumentData } from '@echo/firestore/types/model/swap-document-data'
import { TokenType } from '@echo/model/constants/token-type'
import {
  collectionMockPxContract,
  collectionMockPxSlug,
  collectionMockSpiralContract,
  collectionMockSpiralSlug
} from '@echo/model/mocks/collection/collection-mock'
import { getUserMockByUsername, userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { Swap } from '@echo/model/types/swap/swap'
import { addSwap } from '@echo/test/firestore/crud/swap/add-swap'
import { deleteSwap } from '@echo/test/firestore/crud/swap/delete-swap'
import { nowMsSlug } from '@echo/utils/helpers/now-ms-slug'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, dissoc } from 'ramda'

describe('CRUD - offer - getSwapsForUser', () => {
  let swapIds: string[]

  beforeEach(() => {
    swapIds = []
  })
  afterEach(async () => {
    for (const swapId of swapIds) {
      await deleteSwap(swapId)
    }
  })

  it('return an empty array if the user does not exist', async () => {
    await expect(getSwapsForUser('not-found')).resolves.toEqual([])
  })

  it('returns the completed offers for which the user is the receiver or the sender', async () => {
    const johnny = getUserMockByUsername(userMockJohnnyUsername())
    const crew = getUserMockByUsername(userMockCrewUsername())
    const johnnyData: Omit<Swap, 'slug'> & Pick<SwapDocumentData, 'offerId'> = {
      receiver: johnny,
      receiverItems: [
        {
          token: {
            contract: collectionMockSpiralContract(),
            collection: {
              name: 'Spiral Frequencies',
              slug: collectionMockSpiralSlug(),
              totalSupply: 6315
            },
            animationUrl: 'https://animation.url/',
            tokenIdLabel: '#0001',
            name: 'Spiral Frequencies #1',
            metadataUrl: 'https://metadata.url/',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
            tokenId: 1,
            type: TokenType.Erc721
          }
        }
      ],
      sender: assoc('username', 'another-user', johnny),
      senderItems: [
        {
          token: {
            contract: collectionMockSpiralContract(),
            collection: {
              name: 'pxMythics Genesis',
              slug: collectionMockSpiralSlug(),
              totalSupply: 1077
            },
            tokenIdLabel: '#0003',
            name: 'Creative Demigod #3',
            animationUrl: 'https://animation.url/',
            metadataUrl: 'https://metadata.url/',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/d4ccdfe6a54889abc408c34335b6fb55',
            tokenId: 3,
            type: TokenType.Erc721
          }
        }
      ],
      transactionId: '0xb384a4949fe643aa638827e381e62513e412af409b0744a37065dd59b0a5309b',
      offerId: 'offer-id'
    }
    const crewData: Omit<Swap, 'slug'> & Pick<SwapDocumentData, 'offerId'> = {
      receiver: assoc('username', 'another-user', crew),
      receiverItems: [
        {
          token: {
            contract: collectionMockPxContract(),
            collection: {
              name: 'Spiral Frequencies',
              slug: collectionMockPxSlug(),
              totalSupply: 6315
            },
            animationUrl: 'https://animation.url/',
            tokenIdLabel: '#0001',
            name: 'Spiral Frequencies #1',
            metadataUrl: 'https://metadata.url/',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
            tokenId: 1,
            type: TokenType.Erc721
          }
        }
      ],
      sender: crew,
      senderItems: [
        {
          token: {
            contract: collectionMockPxContract(),
            collection: {
              name: 'pxMythics Genesis',
              slug: collectionMockPxSlug(),
              totalSupply: 1077
            },
            tokenIdLabel: '#0003',
            name: 'Creative Demigod #3',
            animationUrl: 'https://animation.url/',
            metadataUrl: 'https://metadata.url/',
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
      receiver: johnny,
      receiverItems: [
        {
          token: {
            contract: collectionMockPxContract(),
            collection: {
              name: 'Spiral Frequencies',
              slug: collectionMockPxSlug(),
              totalSupply: 6315
            },
            animationUrl: 'https://animation.url/',
            tokenIdLabel: '#0001',
            name: 'Spiral Frequencies #1',
            metadataUrl: 'https://metadata.url/',
            pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
            tokenId: 1,
            type: TokenType.Erc721
          }
        }
      ],
      sender: crew,
      senderItems: [
        {
          token: {
            contract: collectionMockSpiralContract(),
            collection: {
              name: 'pxMythics Genesis',
              slug: collectionMockSpiralSlug(),
              totalSupply: 1077
            },
            tokenIdLabel: '#0003',
            name: 'Creative Demigod #3',
            animationUrl: 'https://animation.url/',
            metadataUrl: 'https://metadata.url/',
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
    let documents = await getSwapsForUser(johnny.username)
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(dissoc('offerId', bothSwap))
    documents = await getSwapsForUser(crew.username)
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(dissoc('offerId', bothSwap))
    const johnnySwap = assoc('slug', nowMsSlug(), johnnyData)
    const johnnySwapId = await addSwap(johnnySwap)
    swapIds.push(johnnySwapId)
    documents = await getSwapsForUser(johnny.username)
    expect(documents.length).toBe(2)
    expect(documents[0]).toStrictEqual(dissoc('offerId', johnnySwap))
    expect(documents[1]).toStrictEqual(dissoc('offerId', bothSwap))
    documents = await getSwapsForUser(crew.username)
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(dissoc('offerId', bothSwap))
    const crewSwap = assoc('slug', nowMsSlug(), crewData)
    const crewSwapId = await addSwap(crewSwap)
    swapIds.push(crewSwapId)
    documents = await getSwapsForUser(johnny.username)
    expect(documents.length).toBe(2)
    expect(documents[0]).toStrictEqual(dissoc('offerId', johnnySwap))
    expect(documents[1]).toStrictEqual(dissoc('offerId', bothSwap))
    documents = await getSwapsForUser(crew.username)
    expect(documents.length).toBe(2)
    expect(documents[0]).toStrictEqual(dissoc('offerId', crewSwap))
    expect(documents[1]).toStrictEqual(dissoc('offerId', bothSwap))
    expect(swapIds.length).toBe(3)
  })
})
