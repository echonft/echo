// noinspection JSUnusedGlobalSymbols

import { getNftMocksByUsername } from '@echo/model/mocks/nft/get-nft-mocks-by-username'
import { getUserMockByUsername, userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { CreateOffer as Component } from '@echo/ui/components/offer/create/create-offer'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Create',
  component: Component,
  args: {
    loading: false,
    receiver: getUserMockByUsername(userMockCrewUsername()),
    receiverItems: getNftMocksByUsername(userMockCrewUsername()),
    senderNfts: getNftMocksByUsername(userMockJohnnyUsername())
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
