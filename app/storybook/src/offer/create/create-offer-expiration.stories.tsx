// noinspection JSUnusedGlobalSymbols

import { getNftMocksByUsername } from '@echo/model/mocks/nft/get-nft-mocks-by-username'
import { userMockCrewUsername } from '@echo/model/mocks/user/user-mock'

import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { CreateOfferExpiration as Component } from '@echo/ui/components/offer/create/create-offer-expiration'
import type { Meta, StoryObj } from '@storybook/react'
import type { NonEmptyArray } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Create',
  component: Component,
  args: {
    loading: false,
    receiverItems: getNftMocksByUsername(userMockCrewUsername()) as NonEmptyArray<OwnedNft>
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
