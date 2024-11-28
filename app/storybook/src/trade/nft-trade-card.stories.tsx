// noinspection JSUnusedGlobalSymbols

import { nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import { NftTradeCard as Component } from '@echo/ui/components/trade/card/nft-trade-card'
import { SwapDirection } from '@echo/ui/constants/swap-direction'
import { type Meta, type StoryObj } from '@storybook/react'
import { values } from 'ramda'

// TODO add a prop to select different item lists
const metadata: Meta<typeof Component> = {
  title: 'Trade/Card',
  component: Component,
  args: {
    items: [nftMockSpiral1],
    direction: SwapDirection.In
  },
  argTypes: {
    direction: {
      options: values(SwapDirection),
      control: { type: 'radio' }
    }
  },
  parameters: {
    controls: {
      exclude: ['items']
    }
  }
}

export default metadata

export const Nft: StoryObj<typeof Component> = {}
