// noinspection JSUnusedGlobalSymbols

import { COLLECTION_MOCK_PX_ID } from '@echo/model-mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { CreateListing as Component } from '@echo/ui/components/listing/create/create-listing'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, filter, map, pathEq, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Listing/Create',
  component: Component,
  args: {
    creatorNfts: pipe(
      getAllNftMocks,
      filter(pathEq(USER_MOCK_JOHNNY_USERNAME, ['owner', 'username'])),
      map(assoc('actionDisabled', true))
    )(),
    loading: false
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
      exclude: ['collections', 'creatorNfts', 'items', 'target', 'loading']
    }
  }
}

export default metadata

export const FromCollection: StoryObj<typeof Component> = {
  args: {
    items: undefined,
    target: getCollectionMockById(COLLECTION_MOCK_PX_ID)
  }
}

export const FromProfile: StoryObj<typeof Component> = {
  args: {
    items: pipe(
      getAllNftMocks,
      filter(pathEq(USER_MOCK_JOHNNY_USERNAME, ['owner', 'username'])),
      filter(pathEq(COLLECTION_MOCK_PX_ID, ['collection', 'id']))
    )(),
    target: undefined
  }
}
