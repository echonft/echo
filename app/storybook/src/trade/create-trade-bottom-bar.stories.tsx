// noinspection JSUnusedGlobalSymbols

import { nftMockPx1, nftMocks, nftMocksCrew, nftMockSpiral1 } from '@echo/model/mocks/nft-mock'
import { CreateTradeBottomBar as Component } from '@echo/ui/components/trade/create-trade-bottom-bar'
import type { Meta, StoryObj } from '@storybook/react'
import { reverse } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Trade/Create Trade Bottom Bar',
  component: Component,
  args: {
    loading: false,
    items: nftMocksCrew,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onBack: () => {},
    children: (
      <button className={'btn-gradient group'}>
        <span className={'btn-label-gradient'}>{'Next'}</span>
      </button>
    )
  },
  argTypes: {
    loading: { control: 'boolean' },
    onBack: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['items', 'onBack', 'counterpartyItems']
    }
  }
}

export default metadata

export const Default: StoryObj<typeof Component> = {}

export const Loading: StoryObj<typeof Component> = {
  args: {
    loading: true,
    children: (
      <button className={'btn-gradient group animate-pulse'} disabled>
        <span className={'btn-label-gradient'}>{'Next'}</span>
      </button>
    )
  }
}

export const NoItems: StoryObj<typeof Component> = {
  args: {
    items: [],
    counterpartyItems: []
  }
}

export const SingleItem: StoryObj<typeof Component> = {
  args: {
    items: [nftMockSpiral1]
  }
}

export const SingleCounterpartyItems: StoryObj<typeof Component> = {
  args: {
    counterpartyItems: [nftMockPx1]
  }
}
export const MultipleCounterpartyItems: StoryObj<typeof Component> = {
  args: {
    counterpartyItems: reverse(nftMocks)
  }
}

export const WithoutBackButton: StoryObj<typeof Component> = {
  args: {
    onBack: undefined
  }
}
