// noinspection JSUnusedGlobalSymbols

import { getNftMock } from '@echo/model/mocks/nft/get-nft-mock'
import { NftTradeCard as Component } from '@echo/ui/components/trade/card/nft-trade-card'
import { SwapDirection } from '@echo/ui/constants/swap-direction'
import { type Meta, type StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Trade/Card',
  component: Component,
  args: {
    items: [getNftMock()],
    direction: SwapDirection.Left
  },
  parameters: {
    controls: {
      exclude: 'items'
    }
  }
}

export default metadata

export const Nft: StoryObj<typeof Component> = {}
