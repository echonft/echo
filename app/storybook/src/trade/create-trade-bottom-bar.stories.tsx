// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from '@storybook/react'
import { CreateTradeBottomBar as Component } from '@echo/ui/components/trade/create-trade-bottom-bar'
import type { OwnedNft } from '@echo/model/types/nft'
import { getNftMocksByUsername } from '@echo/model/mocks/nft/get-nft-mocks-by-username'
import { userMockCrewUsername } from '@echo/model/mocks/user/user-mock'

const metadata: Meta<typeof Component> = {
  title: 'Trade/Create Trade Bottom Bar',
  component: Component,
  args: {
    loading: false,
    items: getNftMocksByUsername(userMockCrewUsername()) as NonEmptyArray<OwnedNft>,
    onUnselect: () => {},
    onBack: () => {},
    onNext: () => {}
  },
  argTypes: {
    loading: { control: 'boolean' },
    onUnselect: { action: 'onUnselect' },
    onBack: { action: 'onBack' },
    onNext: { action: 'onNext' }
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
    items: []
  }
}

export const WithoutBackButton: StoryObj<typeof Component> = {
  args: {
    onBack: undefined
  }
}
