// noinspection JSUnusedGlobalSymbols

import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
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
    )('crewnft_'),
    receiverItems: pipe(
      getAllNftMocks,
      filter(both(pathEq('crewnft_', ['owner', 'username']), pathEq('Rc8pLQXxgyQGIRL0fr13', ['collection', 'id'])))
    )(),
    senderNfts: pipe(
      getAllNftMocks,
      filter(pathEq('johnnycagewins', ['owner', 'username'])),
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
