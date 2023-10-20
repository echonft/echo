import type { Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import { mapOfferToOfferSignature } from '@echo/ui/mappers/map-offer-to-offer-signature'
import type { OfferSignature } from '@echo/ui/types/offer-signature'
import { describe, expect, it } from '@jest/globals'
import { getAddress } from 'viem'

describe('mappers - mapOfferToOfferSignature', () => {
  it('maps correctly single items', () => {
    const offerItem1: OfferItem = {
      nft: {
        collection: {
          contract: {
            address: getAddress('0x320e2fa93A4010ba47edcdE762802374bac8d3F7', 1)
          }
        },
        tokenId: 1376
      }
    } as unknown as OfferItem

    const offerItem2: OfferItem = {
      nft: {
        collection: {
          contract: {
            address: getAddress('0x320e2fa93A4010ba47edcdE762802374bac8d3F7', 1)
          }
        },
        tokenId: 1
      }
    } as unknown as OfferItem
    const offer: Offer = {
      id: 'offer-id',
      expiresAt: 2324074781,
      receiver: {
        wallet: {
          address: getAddress('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E', 1)
        }
      },
      receiverItems: [offerItem1],
      sender: {
        wallet: {
          address: getAddress('0x213bE2f484Ab480db4f18b0Fe4C38e1C25877f09', 1)
        }
      },
      senderItems: [offerItem2]
    } as unknown as Offer

    const expected: OfferSignature = {
      id: 'offer-id',
      expiresAt: BigInt(2324074781),
      creator: getAddress('0x213bE2f484Ab480db4f18b0Fe4C38e1C25877f09', 1),
      counterparty: getAddress('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E', 1),
      creatorIds: [BigInt(1)],
      creatorCollections: [getAddress('0x320e2fa93A4010ba47edcdE762802374bac8d3F7', 1)],
      counterpartyIds: [BigInt(1376)],
      counterpartyCollections: [getAddress('0x320e2fa93A4010ba47edcdE762802374bac8d3F7', 1)]
    }
    expect(mapOfferToOfferSignature(offer)).toStrictEqual(expected)
  })

  it('maps correctly multiple items', () => {
    const offerItem1: OfferItem = {
      nft: {
        collection: {
          contract: {
            address: getAddress('0x320e2fa93A4010ba47edcdE762802374bac8d3F7', 1)
          }
        },
        tokenId: 1376
      }
    } as unknown as OfferItem

    const offerItem2: OfferItem = {
      nft: {
        collection: {
          contract: {
            address: getAddress('0x320e2fa93A4010ba47edcdE762802374bac8d3F7', 1)
          }
        },
        tokenId: 1
      }
    } as unknown as OfferItem

    const offerItem3: OfferItem = {
      nft: {
        collection: {
          contract: {
            address: getAddress('0x213Be2F484ab480dB4F18b0Fe4C38e1c25877f09', 1)
          }
        },
        tokenId: 1
      }
    } as unknown as OfferItem

    const offerItem4: OfferItem = {
      nft: {
        collection: {
          contract: {
            address: getAddress('0x213Be2F484ab480dB4F18b0Fe4C38e1c25877f09', 1)
          }
        },
        tokenId: 2
      }
    } as unknown as OfferItem

    const offer: Offer = {
      id: 'offer-id',
      expiresAt: 2324074781,
      receiver: {
        wallet: {
          address: getAddress('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E', 1)
        }
      },
      receiverItems: [offerItem1, offerItem3],
      sender: {
        wallet: {
          address: getAddress('0x213bE2f484Ab480db4f18b0Fe4C38e1C25877f09', 1)
        }
      },
      senderItems: [offerItem4, offerItem2]
    } as unknown as Offer

    const expected: OfferSignature = {
      id: 'offer-id',
      expiresAt: BigInt(2324074781),
      creator: getAddress('0x213bE2f484Ab480db4f18b0Fe4C38e1C25877f09', 1),
      counterparty: getAddress('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E', 1),
      creatorIds: [BigInt(2), BigInt(1)],
      creatorCollections: [
        getAddress('0x213Be2F484ab480dB4F18b0Fe4C38e1c25877f09', 1),
        getAddress('0x320e2fa93A4010ba47edcdE762802374bac8d3F7', 1)
      ],
      counterpartyIds: [BigInt(1376), BigInt(1)],
      counterpartyCollections: [
        getAddress('0x320e2fa93A4010ba47edcdE762802374bac8d3F7', 1),
        getAddress('0x213Be2F484ab480dB4F18b0Fe4C38e1c25877f09', 1)
      ]
    }
    expect(mapOfferToOfferSignature(offer)).toStrictEqual(expected)
  })
})
