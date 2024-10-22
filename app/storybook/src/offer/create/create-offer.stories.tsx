// noinspection JSUnusedGlobalSymbols

import { getNftMocksByUsername } from '@echo/model/mocks/nft/get-nft-mocks-by-username'
import { getUserMockByUsername, userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { Username } from '@echo/model/types/username'
import { CreateOfferFlow as Component } from '@echo/ui/components/offer/create/create-offer-flow'
import type { Meta, StoryObj } from '@storybook/react'
import { type NonEmptyArray, pipe, take } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Create',
  component: Component,
  args: {
    loading: false,
    receiver: getUserMockByUsername(userMockCrewUsername()),
    receiverNfts: getNftMocksByUsername(userMockCrewUsername()),
    receiverNftsSelection: pipe<[], Username, NonEmptyArray<OwnedNft>, NonEmptyArray<OwnedNft>>(
      userMockCrewUsername,
      getNftMocksByUsername,
      take(1) as unknown as (val: NonEmptyArray<OwnedNft>) => NonEmptyArray<OwnedNft>
    )(),
    sender: getUserMockByUsername(userMockJohnnyUsername()),
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
      exclude: ['loading', 'receiver', 'sender', 'senderNfts', 'receiverNfts', 'receiverNftsSelection']
    }
  }
}

export default metadata

export const Create: StoryObj<typeof Component> = {}
