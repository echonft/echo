// noinspection JSUnusedGlobalSymbols

import { TokenType } from '@echo/model/constants/token-type'
import { nftMockPx2 } from '@echo/model/mocks/nft-mock'
import { swapMock } from '@echo/model/mocks/swap-mock'
import type { Erc721Item, Item } from '@echo/model/types/item'
import type { Swap } from '@echo/model/types/swap'
import { SwapCard } from '@echo/ui/components/swap/card/swap-card'
import { type Meta, type StoryObj } from '@storybook/react'
import { append, modify } from 'ramda'
import { type FunctionComponent } from 'react'

type ComponentType = FunctionComponent<{
  stack: boolean
}>

const metadata: Meta<ComponentType> = {
  title: 'Swap/Card',
  args: {
    stack: false
  },
  argTypes: {
    stack: {
      control: 'boolean'
    }
  }
}
export default metadata
export const Default: StoryObj<ComponentType> = {
  render: ({ stack }) => {
    const swap = stack
      ? modify(
          'senderItems',
          append<Item>({
            token: {
              contract: nftMockPx2.collection.contract,
              collection: {
                name: nftMockPx2.collection.name,
                slug: nftMockPx2.collection.slug,
                totalSupply: nftMockPx2.collection.totalSupply
              },
              name: nftMockPx2.name,
              pictureUrl: nftMockPx2.pictureUrl,
              tokenId: nftMockPx2.tokenId,
              type: TokenType.Erc721
            }
          } as Erc721Item),
          swapMock
        )
      : swapMock

    return <SwapCard swap={swap as Swap} />
  }
}
