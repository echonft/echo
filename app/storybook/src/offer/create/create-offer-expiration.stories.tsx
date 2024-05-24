// noinspection JSUnusedGlobalSymbols

import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { USER_MOCK_CREW_USERNAME } from '@echo/model-mocks/user/user-mock'
import { CreateOfferExpiration as Component } from '@echo/ui/components/offer/create/create-offer-expiration'
import type { Meta, StoryObj } from '@storybook/react'
import { filter, pathEq, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Create',
  component: Component,
  args: {
    loading: false,
    receiverItems: pipe(getAllNftMocks, filter(pathEq(USER_MOCK_CREW_USERNAME, ['owner', 'username'])))()
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
      exclude: ['receiverItems']
    }
  }
}

export default metadata

export const Expiration: StoryObj<typeof Component> = {}
