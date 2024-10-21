// noinspection JSUnusedGlobalSymbols

import { getAllNftMocks } from '@echo/model/mocks/nft/get-all-nft-mocks'
import { NftTradeCard as Component } from '@echo/ui/components/trade/card/nft-trade-card'
import { SwapDirection } from '@echo/ui/constants/swap-direction'
import { type Meta, type StoryObj } from '@storybook/react'
import { pipe, take } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Trade/Card',
  component: Component,
  args: {
    count: 2,
    direction: SwapDirection.In
  },
  argTypes: {
    count: { control: { type: 'number', min: 2, max: 6, step: 1 } },
    direction: {
      options: [SwapDirection.In, SwapDirection.Out],
      control: { type: 'select' }
    }
  },
  parameters: {
    controls: {
      exclude: 'items'
    }
  }
}

export default metadata

export const NftStack: StoryObj<typeof Component> = {
  render: ({ count, direction }) => {
    return <Component items={pipe(getAllNftMocks, take(count))()} direction={direction} />
  }
}
