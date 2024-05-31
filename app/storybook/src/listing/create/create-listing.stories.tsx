// noinspection JSUnusedGlobalSymbols

import { collectionMockPxId } from '@echo/model-mocks/collection/collection-mock'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { userMockJohnnyUsername } from '@echo/model-mocks/user/user-mock'
import { CreateListing as Component } from '@echo/ui/components/listing/create/create-listing'
import type { Meta, StoryObj } from '@storybook/react'
import { filter, pathEq, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Listing/Create',
  component: Component,
  args: {
    creatorNfts: pipe(getAllNftMocks, filter(pathEq(userMockJohnnyUsername(), ['owner', 'username'])))(),
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
    target: getCollectionMockById(collectionMockPxId())
  }
}

export const FromProfile: StoryObj<typeof Component> = {
  args: {
    items: pipe(
      getAllNftMocks,
      filter(pathEq(userMockJohnnyUsername(), ['owner', 'username'])),
      filter(pathEq(collectionMockPxId(), ['collection', 'id']))
    )(),
    target: undefined
  }
}
