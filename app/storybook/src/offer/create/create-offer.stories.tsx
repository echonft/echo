// noinspection JSUnusedGlobalSymbols

import { COLLECTION_MOCK_PX_ID } from '@echo/model-mocks/collection/collection-mock'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import {
  getUserMockByUsername,
  USER_MOCK_CREW_USERNAME,
  USER_MOCK_JOHNNY_USERNAME
} from '@echo/model-mocks/user/user-mock'
import { CreateOffer as Component } from '@echo/ui/components/offer/create/create-offer'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, both, filter, map, pathEq, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Create',
  component: Component,
  args: {
    loading: false,
    receiver: getUserMockByUsername(USER_MOCK_CREW_USERNAME),
    receiverItems: pipe(
      getAllNftMocks,
      filter(
        both(
          pathEq(USER_MOCK_CREW_USERNAME, ['owner', 'username']),
          pathEq(COLLECTION_MOCK_PX_ID, ['collection', 'id'])
        )
      )
    )(),
    senderNfts: pipe(
      getAllNftMocks,
      filter(pathEq(USER_MOCK_JOHNNY_USERNAME, ['owner', 'username'])),
      map(assoc('actionDisabled', true))
    )()
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
