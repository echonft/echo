// noinspection JSUnusedGlobalSymbols

import { COLLECTION_MOCK_PX_ID } from '@echo/model-mocks/collection/collection-mock'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { USER_MOCK_CREW_USERNAME, USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { getUserProfileMockByUsername } from '@echo/model-mocks/user/user-profile-mock'
import { CreateOffer as Component } from '@echo/ui/components/offer/create/create-offer'
import { SEPOLIA_CHAIN_ID } from '@echo/utils/constants/chain-ids'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, both, filter, map, pathEq, pipe, toLower } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Offer/Create',
  component: Component,
  args: {
    loading: false,
    receiver: pipe(
      getUserProfileMockByUsername,
      assoc('wallet', { chainId: SEPOLIA_CHAIN_ID, address: toLower('0xf672715f2bA85794659a7150e8C21F8d157bFe1D') })
    )(USER_MOCK_CREW_USERNAME),
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
