import { OfferState } from '@echo/model/constants/offer-state'
import { TokenType } from '@echo/model/constants/token-type'
import { nftMockPx3, nftMockSpiral1, nftMockSpiral2 } from '@echo/model/mocks/nft-mock'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import { type BaseOffer, type Offer } from '@echo/model/types/offer'

export const offerMockToJohnnycage: Offer = {
  expiresAt: 2324074781,
  locked: false,
  idContract: '0xc3ed30ca38c1deab7eb40928d96928ab48d678dca39fe437aa5e04ab89b51696',
  receiver: userMockJohnny,
  receiverItems: [
    {
      token: {
        contract: nftMockSpiral1.collection.contract,
        collection: {
          name: nftMockSpiral1.collection.name,
          slug: nftMockSpiral1.collection.slug,
          totalSupply: nftMockSpiral1.collection.totalSupply
        },
        name: nftMockSpiral1.name,
        pictureUrl: nftMockSpiral1.pictureUrl,
        tokenId: nftMockSpiral1.tokenId,
        type: TokenType.Erc721
      }
    }
  ],
  sender: userMockCrew,
  senderItems: [
    {
      token: {
        contract: nftMockPx3.collection.contract,
        collection: {
          name: nftMockPx3.collection.name,
          slug: nftMockPx3.collection.slug,
          totalSupply: nftMockPx3.collection.totalSupply
        },
        name: nftMockPx3.name,
        pictureUrl: nftMockPx3.pictureUrl,
        tokenId: nftMockPx3.tokenId,
        type: TokenType.Erc721
      }
    }
  ],
  slug: 'lycfl6eg7jkud7xj6ipi',
  state: OfferState.Open
}

export const baseOfferMockToJohnnycage: BaseOffer = {
  expiresAt: 2324074781,
  receiver: userMockJohnny,
  receiverItems: [
    {
      token: {
        contract: nftMockSpiral1.collection.contract,
        collection: {
          name: nftMockSpiral1.collection.name,
          slug: nftMockSpiral1.collection.slug,
          totalSupply: nftMockSpiral1.collection.totalSupply
        },
        name: nftMockSpiral1.name,
        pictureUrl: nftMockSpiral1.pictureUrl,
        tokenId: nftMockSpiral1.tokenId,
        type: TokenType.Erc721
      }
    }
  ],
  sender: userMockCrew,
  senderItems: [
    {
      token: {
        contract: nftMockPx3.collection.contract,
        collection: {
          name: nftMockPx3.collection.name,
          slug: nftMockPx3.collection.slug,
          totalSupply: nftMockPx3.collection.totalSupply
        },
        name: nftMockPx3.name,
        pictureUrl: nftMockPx3.pictureUrl,
        tokenId: nftMockPx3.tokenId,
        type: TokenType.Erc721
      }
    }
  ]
}

export const offerMockFromJohnnycage: Offer = {
  expiresAt: 2324074781,
  locked: true,
  idContract: '0x6130b878f32097ce8a831834c44ee5d1c58627cfb00085c27da76c77cecfda0b',
  receiver: userMockCrew,
  receiverItems: [
    {
      token: {
        contract: nftMockPx3.collection.contract,
        collection: {
          name: nftMockPx3.collection.name,
          slug: nftMockPx3.collection.slug,
          totalSupply: nftMockPx3.collection.totalSupply
        },
        name: nftMockPx3.name,
        pictureUrl: nftMockPx3.pictureUrl,
        tokenId: nftMockPx3.tokenId,
        type: TokenType.Erc721
      }
    }
  ],
  sender: userMockJohnny,
  senderItems: [
    {
      token: {
        contract: nftMockSpiral1.collection.contract,
        collection: {
          name: nftMockSpiral1.collection.name,
          slug: nftMockSpiral1.collection.slug,
          totalSupply: nftMockSpiral1.collection.totalSupply
        },
        name: nftMockSpiral1.name,
        pictureUrl: nftMockSpiral1.pictureUrl,
        tokenId: nftMockSpiral1.tokenId,
        type: TokenType.Erc721
      }
    },
    {
      token: {
        contract: nftMockSpiral2.collection.contract,
        collection: {
          name: nftMockSpiral2.collection.name,
          slug: nftMockSpiral2.collection.slug,
          totalSupply: nftMockSpiral2.collection.totalSupply
        },
        name: nftMockSpiral2.name,
        pictureUrl: nftMockSpiral2.pictureUrl,
        tokenId: nftMockSpiral2.tokenId,
        type: TokenType.Erc721
      }
    }
  ],
  slug: 'askfpkohehvh0gd69t1g',
  state: OfferState.Accepted
}

export const baseOfferMockFromJohnnycage: BaseOffer = {
  expiresAt: 2324074781,
  receiver: userMockCrew,
  receiverItems: [
    {
      token: {
        contract: nftMockPx3.collection.contract,
        collection: {
          name: nftMockPx3.collection.name,
          slug: nftMockPx3.collection.slug,
          totalSupply: nftMockPx3.collection.totalSupply
        },
        name: nftMockPx3.name,
        pictureUrl: nftMockPx3.pictureUrl,
        tokenId: nftMockPx3.tokenId,
        type: TokenType.Erc721
      }
    }
  ],
  sender: userMockJohnny,
  senderItems: [
    {
      token: {
        contract: nftMockSpiral1.collection.contract,
        collection: {
          name: nftMockSpiral1.collection.name,
          slug: nftMockSpiral1.collection.slug,
          totalSupply: nftMockSpiral1.collection.totalSupply
        },
        name: nftMockSpiral1.name,
        pictureUrl: nftMockSpiral1.pictureUrl,
        tokenId: nftMockSpiral1.tokenId,
        type: TokenType.Erc721
      }
    },
    {
      token: {
        contract: nftMockSpiral2.collection.contract,
        collection: {
          name: nftMockSpiral2.collection.name,
          slug: nftMockSpiral2.collection.slug,
          totalSupply: nftMockSpiral2.collection.totalSupply
        },
        name: nftMockSpiral2.name,
        pictureUrl: nftMockSpiral2.pictureUrl,
        tokenId: nftMockSpiral2.tokenId,
        type: TokenType.Erc721
      }
    }
  ]
}
