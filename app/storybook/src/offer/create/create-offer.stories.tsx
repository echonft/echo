// noinspection JSUnusedGlobalSymbols

import { getNftMocksByUsername } from '@echo/model-mocks/nft/get-nft-mocks-by-username'
import {
  getUserMockByUsername,
  USER_MOCK_CREW_USERNAME,
  USER_MOCK_JOHNNY_USERNAME
} from '@echo/model-mocks/user/user-mock'
import { CreateOffer as Component } from '@echo/ui/components/offer/create/create-offer'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Create',
  component: Component,
  args: {
    loading: false,
    receiver: getUserMockByUsername(USER_MOCK_CREW_USERNAME),
    receiverItems: getNftMocksByUsername(USER_MOCK_CREW_USERNAME),
    senderNfts: getNftMocksByUsername(USER_MOCK_JOHNNY_USERNAME)
  },
  argTypes: {
    onCancel: {
      table: {
        disable: true
      }
    },
    onComplete: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    controls: {
      exclude: ['loading', 'receiver', 'receiverItems', 'senderNfts']
    }
  }
}

export default metadata

export const Create: StoryObj<typeof Component> = {}
