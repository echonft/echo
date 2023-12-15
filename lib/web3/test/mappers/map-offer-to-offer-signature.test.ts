import type { Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { mapOfferToOfferSignature } from '@echo/web3/mappers/map-offer-to-offer-signature'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('mappers - mapOfferToOfferSignature', () => {
  it('maps correctly single items', () => {
    const offerItem1: OfferItem = {
      nft: {
        collection: {
          contract: {
            address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'),
            chainId: 1
          }
        },
        tokenId: 1376
      }
    } as unknown as OfferItem

    const offerItem2: OfferItem = {
      nft: {
        collection: {
          contract: {
            address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'),
            chainId: 1
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
          address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
          chainId: 1
        }
      },
      receiverItems: [offerItem1],
      sender: {
        wallet: {
          address: toLower('0x213bE2f484Ab480db4f18b0Fe4C38e1C25877f09'),
          chainId: 1
        }
      },
      senderItems: [offerItem2]
    } as unknown as Offer

    const expected = {
      id: 'offer-id',
      expiresAt: 2324074781,
      creator: formatAddress({
        address: toLower('0x213bE2f484Ab480db4f18b0Fe4C38e1C25877f09')
      }),
      counterparty: formatAddress({
        address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E')
      }),
      creatorIds: [1],
      creatorCollections: [
        formatAddress({
          address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7')
        })
      ],
      counterpartyIds: [1376],
      counterpartyCollections: [
        formatAddress({
          address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7')
        })
      ]
    }
    expect(mapOfferToOfferSignature(offer)).toStrictEqual(expected)
  })

  it('maps correctly multiple items', () => {
    const offerItem1: OfferItem = {
      nft: {
        collection: {
          contract: {
            address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'),
            chainId: 1
          }
        },
        tokenId: 1376
      }
    } as unknown as OfferItem

    const offerItem2: OfferItem = {
      nft: {
        collection: {
          contract: {
            address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7'),
            chainId: 1
          }
        },
        tokenId: 1
      }
    } as unknown as OfferItem

    const offerItem3: OfferItem = {
      nft: {
        collection: {
          contract: {
            address: toLower('0x213Be2F484ab480dB4F18b0Fe4C38e1c25877f09'),
            chainId: 1
          }
        },
        tokenId: 1
      }
    } as unknown as OfferItem

    const offerItem4: OfferItem = {
      nft: {
        collection: {
          contract: {
            address: toLower('0x213Be2F484ab480dB4F18b0Fe4C38e1c25877f09'),
            chainId: 1
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
          address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E'),
          chainId: 1
        }
      },
      receiverItems: [offerItem1, offerItem3],
      sender: {
        wallet: {
          address: toLower('0x213bE2f484Ab480db4f18b0Fe4C38e1C25877f09'),
          chainId: 1
        }
      },
      senderItems: [offerItem4, offerItem2]
    } as unknown as Offer

    const expected = {
      id: 'offer-id',
      expiresAt: 2324074781,
      creator: formatAddress({ address: '0x213bE2f484Ab480db4f18b0Fe4C38e1C25877f09' }),
      counterparty: formatAddress({ address: '0x1E3918dD44F427F056be6C8E132cF1b5F42de59E' }),
      creatorIds: [2, 1],
      creatorCollections: [
        formatAddress({ address: '0x213Be2F484ab480dB4F18b0Fe4C38e1c25877f09' }),
        formatAddress({ address: '0x320e2fa93A4010ba47edcdE762802374bac8d3F7' })
      ],
      counterpartyIds: [1376, 1],
      counterpartyCollections: [
        formatAddress({ address: '0x320e2fa93A4010ba47edcdE762802374bac8d3F7' }),
        formatAddress({ address: '0x213Be2F484ab480dB4F18b0Fe4C38e1c25877f09' })
      ]
    }
    expect(mapOfferToOfferSignature(offer)).toStrictEqual(expected)
  })
})
