// noinspection JSUnusedGlobalSymbols

import { getAllNftMocks } from '@echo/model/mocks/nft/get-all-nft-mocks'
import { getNftMock } from '@echo/model/mocks/nft/get-nft-mock'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { getNftMocksByUsername } from '@echo/model/mocks/nft/get-nft-mocks-by-username'
import { nftMockPxJohnnyId } from '@echo/model/mocks/nft/nft-mock'
import { userMockCrewUsername } from '@echo/model/mocks/user/user-mock'
import type { OwnedNft } from '@echo/model/types/nft'
import { CreateTradeBottomBar as Component } from '@echo/ui/components/trade/create-trade-bottom-bar'
import type { Meta, StoryObj } from '@storybook/react'
import { reverse } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Trade/Create Trade Bottom Bar',
  component: Component,
  args: {
    loading: false,
    items: getNftMocksByUsername(userMockCrewUsername()) as NonEmptyArray<OwnedNft>,
    onBack: () => {},
    onNext: () => {}
  },
  argTypes: {
    loading: { control: 'boolean' }
  },
  parameters: {
    controls: {
      exclude: ['items', 'onBack', 'onNext', 'counterpartyItems']
    }
  }
}

export default metadata

export const CreateTradeBottomBar: StoryObj<typeof Component> = {}

export const Loading: StoryObj<typeof Component> = {
  args: {
    loading: true
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
    items: [getNftMock()]
  }
}

export const SingleCounterpartyItems: StoryObj<typeof Component> = {
  args: {
    counterpartyItems: [getNftMockById(nftMockPxJohnnyId())]
  }
}
export const MultipleCounterpartyItems: StoryObj<typeof Component> = {
  args: {
    counterpartyItems: reverse(getAllNftMocks())
  }
}

export const WithoutBackButton: StoryObj<typeof Component> = {
  args: {
    onBack: undefined
  }
}
