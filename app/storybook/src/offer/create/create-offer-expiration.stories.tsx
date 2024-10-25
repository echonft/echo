// noinspection JSUnusedGlobalSymbols

import { nftMocksCrew, nftMocksJohnny } from '@echo/model/mocks/nft-mock'
import { CreateOfferExpiration as Component } from '@echo/ui/components/offer/create/create-offer-expiration'
import type { Meta, StoryObj } from '@storybook/react'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Create',
  component: Component,
  args: {
    loading: false,
    receiverItems: nftMocksCrew,
    senderItems: nftMocksJohnny
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
      exclude: ['receiverItems', 'senderItems', 'onCancel', 'onComplete', 'loading']
    }
  }
}

export default metadata

export const Expiration: StoryObj<typeof Component> = {}
