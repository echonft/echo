import { getAllCollectionMocks } from '@echo/model-mocks/collection/get-all-collection-mocks'
import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { CreateListing as Component } from '@echo/ui/components/listing/create/create-listing'
import type { Meta, StoryObj } from '@storybook/react'
import { assoc, filter, map, pathEq, pipe } from 'ramda'

const metadata: Meta<typeof Component> = {
  title: 'Listing/Create',
  component: Component,
  args: {
    collections: getAllCollectionMocks(),
    creatorNfts: pipe(
      getAllNftMocks,
      filter(pathEq('johnnycagewins', ['owner', 'username'])),
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
    target: getCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
  }
}

export const FromProfile: StoryObj<typeof Component> = {
  args: {
    items: pipe(
      getAllNftMocks,
      filter(pathEq('johnnycagewins', ['owner', 'username'])),
      filter(pathEq('Rc8pLQXxgyQGIRL0fr13', ['collection', 'id']))
    )(),
    target: undefined
  }
}
