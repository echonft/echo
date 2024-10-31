import { Chain } from '@echo/model/constants/chain'
import { OfferState } from '@echo/model/constants/offer-state'
import { TokenType } from '@echo/model/constants/token-type'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import type { BaseOffer } from '@echo/model/types/base-offer'
import { type Offer } from '@echo/model/types/offer'

export const offerMockToJohnnycage: Offer = {
  expiresAt: 2324074781,
  locked: false,
  idContract: '0xlycfl6eg7jkud7xj6ipi',
  receiver: userMockJohnny,
  receiverItems: [
    {
      token: {
        contract: {
          address: '0x320e2fa93a4010ba47edcde762802374bac8d3f7',
          chain: Chain.Ethereum
        },
        collection: {
          name: 'Spiral Frequencies',
          slug: 'spiral-frequencies',
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
        contract: {
          address: '0x12c63bbd266db84e117356e664f3604055166cec',
          chain: Chain.Ethereum
        },
        collection: {
          name: 'pxMythics Genesis',
          slug: 'pxmythics-genesis',
          totalSupply: 1077
        },
        name: 'Creative Demigod #3',
        pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/d4ccdfe6a54889abc408c34335b6fb55',
        tokenId: 3,
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
        contract: {
          address: '0x320e2fa93a4010ba47edcde762802374bac8d3f7',
          chain: Chain.Ethereum
        },
        collection: {
          name: 'Spiral Frequencies',
          slug: 'spiral-frequencies',
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
        contract: {
          address: '0x12c63bbd266db84e117356e664f3604055166cec',
          chain: Chain.Ethereum
        },
        collection: {
          name: 'pxMythics Genesis',
          slug: 'pxmythics-genesis',
          totalSupply: 1077
        },
        name: 'Creative Demigod #3',
        pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/d4ccdfe6a54889abc408c34335b6fb55',
        tokenId: 3,
        type: TokenType.Erc721
      }
    }
  ]
}

export const offerMockFromJohnnycage: Offer = {
  expiresAt: 2324074781,
  locked: true,
  idContract: '0xaskfpkohehvh0gd69t1g',
  receiver: userMockCrew,
  receiverItems: [
    {
      token: {
        contract: {
          address: '0x12c63bbd266db84e117356e664f3604055166cec',
          chain: Chain.Ethereum
        },
        collection: {
          name: 'pxMythics Genesis',
          slug: 'pxmythics-genesis',
          totalSupply: 1077
        },
        name: 'Creative Demigod #3',
        pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/d4ccdfe6a54889abc408c34335b6fb55',
        tokenId: 3,
        type: TokenType.Erc721
      }
    }
  ],
  sender: userMockJohnny,
  senderItems: [
    {
      token: {
        contract: {
          address: '0x320e2fa93a4010ba47edcde762802374bac8d3f7',
          chain: Chain.Ethereum
        },
        collection: {
          name: 'Spiral Frequencies',
          slug: 'spiral-frequencies',
          totalSupply: 6315
        },
        name: 'Spiral Frequencies #1',
        pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
        tokenId: 1,
        type: TokenType.Erc721
      }
    },
    {
      token: {
        contract: {
          address: '0x320e2fa93a4010ba47edcde762802374bac8d3f7',
          chain: Chain.Ethereum
        },
        collection: {
          name: 'Spiral Frequencies',
          slug: 'spiral-frequencies',
          totalSupply: 6315
        },
        name: 'Spiral Frequencies #2',
        pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/c8ced259cc0a40a5a42d22182e82f9de',
        tokenId: 2,
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
        contract: {
          address: '0x12c63bbd266db84e117356e664f3604055166cec',
          chain: Chain.Ethereum
        },
        collection: {
          name: 'pxMythics Genesis',
          slug: 'pxmythics-genesis',
          totalSupply: 1077
        },
        name: 'Creative Demigod #3',
        pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/d4ccdfe6a54889abc408c34335b6fb55',
        tokenId: 3,
        type: TokenType.Erc721
      }
    }
  ],
  sender: userMockJohnny,
  senderItems: [
    {
      token: {
        contract: {
          address: '0x320e2fa93a4010ba47edcde762802374bac8d3f7',
          chain: Chain.Ethereum
        },
        collection: {
          name: 'Spiral Frequencies',
          slug: 'spiral-frequencies',
          totalSupply: 6315
        },
        name: 'Spiral Frequencies #1',
        pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
        tokenId: 1,
        type: TokenType.Erc721
      }
    },
    {
      token: {
        contract: {
          address: '0x320e2fa93a4010ba47edcde762802374bac8d3f7',
          chain: Chain.Ethereum
        },
        collection: {
          name: 'Spiral Frequencies',
          slug: 'spiral-frequencies',
          totalSupply: 6315
        },
        name: 'Spiral Frequencies #2',
        pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/c8ced259cc0a40a5a42d22182e82f9de',
        tokenId: 2,
        type: TokenType.Erc721
      }
    }
  ]
}
