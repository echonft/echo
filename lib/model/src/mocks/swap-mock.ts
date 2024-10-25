import { Chain } from '@echo/model/constants/chain'
import { TokenType } from '@echo/model/constants/token-type'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import type { Swap } from '@echo/model/types/swap'

export const swapMock: Swap = {
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
  slug: 'swap-slug',
  transactionId: '0xb384a4949fe643aa638827e381e62513e412af409b0744a37065dd59b0a5309b'
}
