// noinspection JSUnusedGlobalSymbols

import { nftMocksCrew, nftMocksJohnny } from '@echo/model/mocks/nft-mock'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import type { OwnedNft } from '@echo/model/types/nft'
import { authStore } from '@echo/storybook/mocks/stores/auth-store'
import { CreateOfferFlow as Component } from '@echo/ui/components/offer/create/create-offer-flow'
import type { Meta, StoryObj } from '@storybook/react'
import { type NonEmptyArray, take } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Create',
  component: Component,
  args: {
    receiver: userMockCrew,
    receiverNfts: nftMocksCrew,
    receiverNftsSelection: take(1, nftMocksCrew) as NonEmptyArray<OwnedNft>,
    sender: userMockJohnny,
    senderNfts: nftMocksJohnny
  },
  argTypes: {
    onCancel: {
      table: {
        disable: true
      }
    }
  },
  loaders: [authStore.getState().signIn],
  parameters: {
    controls: {
      exclude: ['receiver', 'sender', 'senderNfts', 'receiverNfts', 'receiverNftsSelection']
    }
  }
}

export default metadata

export const Create: StoryObj<typeof Component> = {}
